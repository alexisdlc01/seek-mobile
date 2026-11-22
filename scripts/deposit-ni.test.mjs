// Northern Ireland: deposit cap = one month's rent, protection due 28 days after receipt (backend compliance.ts).
// Run: node scripts/deposit-ni.test.mjs
import assert from "node:assert";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/utils/tenancy-view.ts", import.meta.url), "utf8");
import { stripTypeScriptTypes } from "node:module";
const grab = (re) => stripTypeScriptTypes(src.match(re)[0]).replace(/export /, "");
const code = [
  grab(/export const depositProtectionDays[^\n]*/),
  grab(/export function depositCapCheck[\s\S]*?\n}\n/),
  grab(/export function depositDeadline[\s\S]*?\n}\n/),
].join("\n");
const { depositCapCheck, depositDeadline } = new Function(`${code}\nreturn { depositCapCheck, depositDeadline };`)();

const t = { monthlyRent: 100000, depositAmount: 110000, depositReceivedAt: "2026-01-01T00:00:00.000Z" };
assert.equal(depositCapCheck(t, "NORTHERN_IRELAND").cap, 100000);
assert.ok(depositCapCheck(t, "NORTHERN_IRELAND").overCap, "1.1 months is over the NI cap");
assert.ok(!depositCapCheck(t, "ENGLAND").overCap, "still under five weeks in England");
assert.equal(depositDeadline(t, "NORTHERN_IRELAND").toISOString(), "2026-01-29T00:00:00.000Z");
assert.equal(depositDeadline(t, "ENGLAND").toISOString(), "2026-01-31T00:00:00.000Z");
console.log("ok");
