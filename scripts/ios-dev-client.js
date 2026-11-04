#!/usr/bin/env node

const { spawn, spawnSync } = require("node:child_process");
const { existsSync, readdirSync } = require("node:fs");
const { createConnection } = require("node:net");
const { homedir } = require("node:os");
const { dirname, join } = require("node:path");

const simulatorName = process.env.IOS_SIMULATOR_NAME;
const bundleId = process.env.IOS_BUNDLE_ID || "com.seek.seekapp.dev";
const expoPort = Number(process.env.EXPO_PORT || 8081);

function getExpoEnv() {
  const nodeBinDirectory = getSupportedNodeBinDirectory();
  return {
    ...process.env,
    PATH: `${nodeBinDirectory}:${process.env.PATH ?? ""}`,
  };
}

function getSupportedNodeBinDirectory() {
  const currentMajor = Number(process.versions.node.split(".")[0]);
  if (currentMajor >= 20) return dirname(process.execPath);

  const versionsDirectory = join(homedir(), ".nvm", "versions", "node");
  if (existsSync(versionsDirectory)) {
    const supportedVersions = readdirSync(versionsDirectory)
      .filter((version) => /^v20\./.test(version))
      .sort((left, right) =>
        right.localeCompare(left, undefined, { numeric: true }),
      );

    for (const version of supportedVersions) {
      const nodePath = join(versionsDirectory, version, "bin", "node");
      if (existsSync(nodePath)) {
        console.log(`Using Node ${version} for Expo.`);
        return dirname(nodePath);
      }
    }
  }

  throw new Error(
    `Expo requires Node 20 or newer; the active runtime is ${process.version}.`,
  );
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: options.stdio || "pipe",
    encoding: "utf8",
    env: options.env || process.env,
    timeout: options.timeout,
  });

  if (options.allowFailure) {
    return result;
  }

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join("\n");
    throw new Error(`${command} ${args.join(" ")} failed\n${output}`);
  }

  return result;
}

function selectSimulator(name) {
  const result = run("xcrun", ["simctl", "list", "devices", "available", "--json"]);
  const devicesByRuntime = JSON.parse(result.stdout).devices;
  const simulators = Object.entries(devicesByRuntime)
    .filter(([runtime]) => runtime.startsWith("com.apple.CoreSimulator.SimRuntime.iOS-"))
    .flatMap(([, devices]) => devices)
    .filter((device) => device.isAvailable);
  const selected = name
    ? simulators.find((device) => device.name === name)
    : simulators.find((device) => device.state === "Booted") ?? simulators[0];

  if (!selected) {
    throw new Error(name
      ? `No available iOS simulator named "${name}" was found.`
      : "No available iOS simulator was found. Install one in Xcode first.");
  }
  return { name: selected.name, id: selected.udid, state: selected.state };
}

function appIsInstalled(deviceId) {
  const result = run(
    "xcrun",
    ["simctl", "get_app_container", deviceId, bundleId],
    { allowFailure: true },
  );
  return result.status === 0;
}

function waitUntilBooted(deviceId) {
  run("xcrun", ["simctl", "bootstatus", deviceId, "-b"], {
    stdio: "inherit",
    // A newly-created simulator can take a few minutes to finish installing iOS.
    // Expo must not send its development-client URL until SpringBoard is ready.
    timeout: 15 * 60 * 1000,
  });
}

function waitForPort(port, child, timeoutMs = 120_000) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    let timer;

    const stopWaiting = () => {
      clearTimeout(timer);
      child.off("exit", handleExit);
    };
    const handleExit = (code) => {
      stopWaiting();
      reject(new Error(`Expo exited before Metro was ready (code ${code}).`));
    };
    const attempt = () => {
      if (Date.now() - startedAt >= timeoutMs) {
        stopWaiting();
        reject(new Error(`Metro did not start on port ${port} in time.`));
        return;
      }

      const socket = createConnection({ host: "127.0.0.1", port });
      socket.once("connect", () => {
        socket.destroy();
        stopWaiting();
        resolve();
      });
      socket.once("error", () => {
        socket.destroy();
        timer = setTimeout(attempt, 250);
      });
    };

    child.once("exit", handleExit);
    attempt();
  });
}

function openDevClient(deviceId) {
  const metroUrl = `http://127.0.0.1:${expoPort}`;
  const devClientUrl =
    `exp+seek-app://expo-development-client/?url=${encodeURIComponent(metroUrl)}`;
  run("xcrun", ["simctl", "launch", deviceId, bundleId], {
    stdio: "inherit",
    timeout: 60_000,
  });
  run("xcrun", ["simctl", "openurl", deviceId, devClientUrl], {
    stdio: "inherit",
    timeout: 30_000,
  });
}

async function main() {
  const selectedSimulator = selectSimulator(simulatorName);

  console.log(`Using ${selectedSimulator.name} (${selectedSimulator.id})`);
  if (selectedSimulator.state !== "Booted") {
    run("xcrun", ["simctl", "boot", selectedSimulator.id], {
      allowFailure: true,
    });
  }
  waitUntilBooted(selectedSimulator.id);
  run("open", [
    "-a",
    "Simulator",
    "--args",
    "-CurrentDeviceUDID",
    selectedSimulator.id,
  ]);

  if (!appIsInstalled(selectedSimulator.id)) {
    console.log(`${bundleId} is not installed. Building and installing it now.`);
    run(
      "npx",
      ["expo", "run:ios", "--device", selectedSimulator.id, "--no-bundler"],
      {
        stdio: "inherit",
        env: getExpoEnv(),
      },
    );
  }

  console.log(`${bundleId} is installed. Starting Metro on port ${expoPort}.`);
  const expo = spawn(
    "npx",
    ["expo", "start", "--dev-client", "--localhost", "--port", String(expoPort)],
    {
      stdio: "inherit",
      env: getExpoEnv(),
    },
  );

  const stopExpo = () => expo.kill("SIGINT");
  process.once("SIGINT", stopExpo);
  process.once("SIGTERM", stopExpo);

  await waitForPort(expoPort, expo);
  console.log(`Opening Seek only on ${selectedSimulator.name}.`);
  openDevClient(selectedSimulator.id);

  const exitCode = await new Promise((resolve) => {
    expo.once("exit", (code) => resolve(code ?? 0));
  });
  process.exitCode = exitCode;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
