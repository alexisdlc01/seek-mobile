// Repro for app/(app)/contract.tsx: GET /contracts/tenancy/:id populates signatures.user, so a tenant
// who signed must be found by id (badge "Waiting for housemates", no "Sign contract" button).
// Run: node scripts/contract-signed-by.test.mjs
import assert from "node:assert";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
// Pull the real idOf body and the real signedBy expression so the test tracks the shipped code.
const idOfSource = read("src/utils/tenancy-view.ts").match(/export function idOf[\s\S]*?\n}\n/)[0]
  .replace("export ", "").replace(/: unknown\)/, ")").replace(/\): string \| undefined/, ")")
  .replace(/ as \{ _id\?: unknown \}/, "");
const signedByExpr = read("app/(app)/contract.tsx").match(/const signedBy = (new Set\([^;]+\));/)[1];
const signedBy = new Function("contract", `${idOfSource}\nreturn ${signedByExpr};`);

const contract = { signatures: [{ user: { _id: "tenantA", name: "A", profilePicUrl: null }, signedAt: "2026-11-16" }] };
assert.ok(signedBy(contract).has("tenantA"), "populated signer must count as signed");
assert.ok(!signedBy(contract).has("tenantB"));
assert.ok(signedBy({ signatures: [{ user: "tenantA" }] }).has("tenantA"), "bare id still works");
console.log("ok");
