// Mirrors the skip-refresh condition of src/utils/custom-axios.ts: wrong current password 401 must not refresh+replay.
// Run: node scripts/wrong-password-no-refresh.test.mjs
import assert from "node:assert";

const WRONG_PASSWORD_MESSAGE = "Current password is not valid.";
const shouldRefresh = (response) => response?.status === 401 && response?.data?.message !== WRONG_PASSWORD_MESSAGE;

assert.ok(!shouldRefresh({ status: 401, data: { message: WRONG_PASSWORD_MESSAGE } })); // no refresh call
assert.ok(shouldRefresh({ status: 401, data: { message: "Unauthorized" } })); // ordinary 401 still refreshes
assert.ok(shouldRefresh({ status: 401 }));
console.log("ok");
