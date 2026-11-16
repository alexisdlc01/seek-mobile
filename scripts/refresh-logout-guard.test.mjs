// Repro for src/utils/custom-axios.ts: a transient refresh failure (network, 5xx, 429) must not log out.
// Run: node scripts/refresh-logout-guard.test.mjs
import assert from "node:assert";

const shouldLogout = (guard, err) =>
  !guard || [401, 403].includes(err.response?.status); // fixed condition mirrors custom-axios.ts

for (const err of [{}, { response: { status: 500 } }, { response: { status: 429 } }]) {
  assert.ok(shouldLogout(false, err)); // old behaviour: logged out
  assert.ok(!shouldLogout(true, err));
}
for (const status of [401, 403]) assert.ok(shouldLogout(true, { response: { status } }));
console.log("ok");
