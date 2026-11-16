// Repro: joining a household must invalidate the shares query (backend creates a share for the new member).
// Run: node scripts/join-shares-invalidate.test.mjs
import assert from "node:assert";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../app/(app)/chat/[id]/join.tsx", import.meta.url), "utf8");
const onSuccess = src.slice(src.indexOf("onSuccess()"), src.indexOf("onError("));
assert.match(onSuccess, /getUsersControllerListSharesQueryKey\(\)/);
console.log("ok");
