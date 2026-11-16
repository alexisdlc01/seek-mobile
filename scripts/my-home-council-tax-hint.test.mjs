// my-home.tsx: the council tax banner reuses bills.tsx's exemption/council-tax-bill condition and never claims Seek files anything.
// Run: node scripts/my-home-council-tax-hint.test.mjs
import assert from "node:assert";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../app/(app)/(tabs)/my-home.tsx", import.meta.url), "utf8");
assert.ok(src.includes("You likely owe no council tax"), "banner copy");
assert.ok(src.includes('bill.category === "COUNCIL_TAX");'), "any COUNCIL_TAX bill, not only included-in-rent");
assert.ok(!src.includes('"COUNCIL_TAX" && bill.includedInRent'), "no included-only check");
assert.ok(src.includes('doc.type === "COUNCIL_TAX_EXEMPTION"'), "hidden once certificate uploaded");
assert.ok(src.includes("!hasCouncilTaxBill && !exemptionOnFile"), "hidden when any council tax bill exists (included or due)");
assert.ok(src.includes('router.push("/(app)/bills")'), "links to Bills where the upload lives");
assert.ok(!/Seek (can|will) (request|file)/.test(src), "no claim Seek files with council");
console.log("ok");
