// Right to Rent share code entry on the Passport tab (src/utils/share-code.ts).
// Run: node scripts/share-code.test.mjs
import assert from "node:assert";
import { readFileSync } from "node:fs";

// Load the shipped helpers with their TypeScript annotations stripped, so the test tracks the real code.
const source = readFileSync(new URL("../src/utils/share-code.ts", import.meta.url), "utf8")
  .replace(/export /g, "")
  .replace(/\((\w+): string\): string \| null/g, "($1)")
  .replace(/\((\w+): string\): string/g, "($1)");
const { normaliseShareCode, formatShareCode, isoDay, shareCodeExpiry } = new Function(
  `${source}\nreturn { normaliseShareCode, formatShareCode, isoDay, shareCodeExpiry };`,
)();

assert.strictEqual(normaliseShareCode("r7k 4p2 9qx"), "R7K4P29QX");
assert.strictEqual(normaliseShareCode(" R7K-4P2-9QX "), "R7K4P29QX");
assert.strictEqual(normaliseShareCode("R7K4P29Q"), null, "8 characters is too short");
assert.strictEqual(normaliseShareCode("R7K4P29QXA"), null, "10 characters is too long");
assert.strictEqual(normaliseShareCode("R7K4P2*QX"), null, "only letters and digits");
assert.strictEqual(normaliseShareCode(""), null);
assert.strictEqual(formatShareCode("R7K4P29QX"), "R7K 4P2 9QX");
assert.strictEqual(isoDay("2031-04-30"), "2031-04-30T00:00:00.000Z");
assert.strictEqual(isoDay("2031-02-30"), null, "not a real day");
assert.strictEqual(isoDay("30/04/2031"), null);
// Expiry from GOV.UK: today up to 90 days ahead, in the phone's local calendar.
const day = (offset) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
assert.strictEqual(shareCodeExpiry(day(0)), `${day(0)}T00:00:00.000Z`, "today is allowed");
assert.strictEqual(shareCodeExpiry(day(10)), `${day(10)}T00:00:00.000Z`);
assert.strictEqual(shareCodeExpiry(day(90)), `${day(90)}T00:00:00.000Z`, "90 days ahead is allowed");
assert.strictEqual(shareCodeExpiry(day(91)), null, "more than 90 days ahead");
assert.strictEqual(shareCodeExpiry(day(-1)), null, "already expired");
assert.strictEqual(shareCodeExpiry(""), null);
assert.strictEqual(shareCodeExpiry("2031-02-30"), null);
console.log("ok");
