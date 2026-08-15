#!/usr/bin/env node

const { spawn, spawnSync } = require("node:child_process");
const { existsSync, readdirSync } = require("node:fs");
const { createConnection } = require("node:net");
const { homedir, networkInterfaces } = require("node:os");
const { dirname, join } = require("node:path");

const simulatorName = process.env.IOS_SIMULATOR_NAME || "Seek iPhone 17 Pro";
const bundleId = process.env.IOS_BUNDLE_ID || "com.seek.seekapp.dev";
const backendPort = process.env.SEEK_BACKEND_PORT || "3000";
const expoPort = Number(process.env.EXPO_PORT || 8081);

function getLanAddress() {
  const interfaces = networkInterfaces();
  for (const addresses of Object.values(interfaces)) {
    for (const address of addresses ?? []) {
      if (address.family === "IPv4" && !address.internal) {
        return address.address;
      }
    }
  }

  return "localhost";
}

function getExpoEnv() {
  const nodeBinDirectory = getSupportedNodeBinDirectory();
  return {
    ...process.env,
    PATH: `${nodeBinDirectory}:${process.env.PATH ?? ""}`,
    EXPO_PUBLIC_API_URL:
      process.env.EXPO_PUBLIC_API_URL ||
      `http://${getLanAddress()}:${backendPort}`,
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

function findSimulatorId(name) {
  const result = run("xcrun", ["simctl", "list", "devices", "available"]);
  const line = result.stdout
    .split(/\r?\n/)
    .find((entry) => parseSimulator(entry)?.name === name);

  if (!line) {
    throw new Error(`No available iOS simulator named "${name}" was found.`);
  }

  const match = line.match(/\(([0-9A-F-]{36})\)/);
  if (!match) {
    throw new Error(`Could not parse simulator ID from: ${line}`);
  }

  return match[1];
}

function findBootedSimulator(name) {
  const result = run("xcrun", ["simctl", "list", "devices", "booted"], {
    allowFailure: true,
  });

  if (result.status !== 0) {
    return undefined;
  }

  const line = result.stdout
    .split(/\r?\n/)
    .find((entry) => {
      const simulator = parseSimulator(entry);
      return simulator?.name === name && simulator.state === "Booted";
    });

  if (!line) {
    return undefined;
  }

  const nameMatch = line.match(/^\s*(.*?)\s+\(/);
  const idMatch = line.match(/\(([0-9A-F-]{36})\)/);

  if (!nameMatch || !idMatch) {
    return undefined;
  }

  return {
    name: nameMatch[1],
    id: idMatch[1],
  };
}

function parseSimulator(line) {
  const match = line.match(
    /^\s*(.*?)\s+\(([0-9A-F-]{36})\)\s+\((Booted|Shutdown)\)\s*$/,
  );
  if (!match) return undefined;

  return {
    name: match[1],
    id: match[2],
    state: match[3],
  };
}

function shutdownOtherSimulators(selectedDeviceId) {
  const result = run("xcrun", ["simctl", "list", "devices", "booted"], {
    allowFailure: true,
  });
  if (result.status !== 0) return;

  const otherDevices = result.stdout
    .split(/\r?\n/)
    .map(parseSimulator)
    .filter(
      (simulator) =>
        simulator?.state === "Booted" && simulator.id !== selectedDeviceId,
    );

  for (const simulator of otherDevices) {
    console.log(`Shutting down ${simulator.name} (${simulator.id})`);
    run("xcrun", ["simctl", "shutdown", simulator.id], {
      allowFailure: true,
    });
  }
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
  run("xcrun", ["simctl", "openurl", deviceId, devClientUrl], {
    stdio: "inherit",
    timeout: 30_000,
  });
}

async function main() {
  const bootedSimulator = findBootedSimulator(simulatorName);
  const selectedSimulator = bootedSimulator ?? {
    name: simulatorName,
    id: findSimulatorId(simulatorName),
  };

  console.log(`Using ${selectedSimulator.name} (${selectedSimulator.id})`);
  shutdownOtherSimulators(selectedSimulator.id);
  if (!bootedSimulator) {
    run("xcrun", ["simctl", "boot", selectedSimulator.id], {
      allowFailure: true,
    });
  }
  waitUntilBooted(selectedSimulator.id);

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
    ["expo", "start", "--localhost", "--port", String(expoPort)],
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
