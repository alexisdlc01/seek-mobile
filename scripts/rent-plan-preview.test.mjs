// rent-plan.tsx: picking another plan previews its payments from the server (same code that saves the schedule), never from client maths.
// Run: node scripts/rent-plan-preview.test.mjs
import assert from "node:assert";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../app/(app)/rent-plan.tsx", import.meta.url), "utf8");
const api = readFileSync(new URL("../src/api/seek-api/payments.ts", import.meta.url), "utf8");
assert.ok(api.includes("`/payments/plan/${tenancyId}/preview`"), "read-only preview endpoint");
assert.ok(src.includes("draft.frequency !== planQuery.data?.plan.frequency"), "previews only a changed frequency");
assert.ok(src.includes("enabled: previewFrequency !== null"), "no request while nothing changed");
const preview = src.slice(src.indexOf("{previewFrequency ? ("), src.indexOf("Upcoming on your current plan"));
assert.ok(preview.includes("formatPence(item.amount)"), "server amounts via the pounds formatter");
assert.ok(preview.includes("formatDate(item.dueDate)"), "dates with year");
assert.ok(!preview.includes("Pay now"), "nothing payable in a preview");
assert.ok(!/monthlyRent\s*\*/.test(preview), "no client-side schedule maths");
assert.ok(preview.includes("not saved yet"), "says it is a preview");
console.log("ok");
