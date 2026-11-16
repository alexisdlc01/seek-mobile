// Repro: send() in apply.tsx must invalidate the shares query (backend creates a share on send).
// Run: node scripts/apply-shares-invalidate.test.mjs
import assert from "node:assert";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../app/(app)/apply.tsx", import.meta.url), "utf8");
const send = src.slice(src.indexOf("const send = async"));
const afterSend = send.slice(send.indexOf("sendApplication({"), send.indexOf("scheduleViewing"));
assert.match(afterSend, /getUsersControllerListSharesQueryKey\(\)/);
console.log("ok");
