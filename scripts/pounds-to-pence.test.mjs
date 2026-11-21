// "Add a shared expense" amount parsing (parsePoundsToPence in src/utils/seek-format.ts).
// Run: node scripts/pounds-to-pence.test.mjs
import assert from "node:assert";
import { readFileSync } from "node:fs";

// Load the shipped helper with its TypeScript annotations stripped, so the test tracks the real code.
const source = readFileSync(new URL("../src/utils/seek-format.ts", import.meta.url), "utf8");
const fn = source.slice(source.indexOf("export function parsePoundsToPence"), source.indexOf("export function pluralise"))
  .replace("export ", "")
  .replace("(input: string): number | null", "(input)");
const parsePoundsToPence = new Function(`${fn}\nreturn parsePoundsToPence;`)();

assert.strictEqual(parsePoundsToPence("1,200.50"), 120050, "thousands comma");
assert.strictEqual(parsePoundsToPence("1,200"), 120000);
assert.strictEqual(parsePoundsToPence("12,345,678.9"), 1234567890);
assert.strictEqual(parsePoundsToPence("1200.50"), 120050);
assert.strictEqual(parsePoundsToPence("£ 42.38 "), 4238);
assert.strictEqual(parsePoundsToPence("1200,5"), 120050, "decimal comma");
assert.strictEqual(parsePoundsToPence("12,50"), 1250);
assert.strictEqual(parsePoundsToPence("0.29"), 29, "no float drift");
assert.strictEqual(parsePoundsToPence("1.005"), null, "more than 2 decimals");
assert.strictEqual(parsePoundsToPence("1.200,50"), null, "European format is ambiguous");
assert.strictEqual(parsePoundsToPence("1,20,0"), null);
assert.strictEqual(parsePoundsToPence("12,3456"), null);
assert.strictEqual(parsePoundsToPence("abc"), null);
assert.strictEqual(parsePoundsToPence(""), null);
assert.strictEqual(parsePoundsToPence("-5"), null);
console.log("ok");
