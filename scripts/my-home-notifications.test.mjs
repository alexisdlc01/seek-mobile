// Repro for app/(app)/(tabs)/my-home.tsx: notifications must show with no tenancy and with a pending one.
// Run: node scripts/my-home-notifications.test.mjs
import assert from "node:assert";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../app/(app)/(tabs)/my-home.tsx", import.meta.url), "utf8");
const body = (start, end) => src.slice(src.indexOf(start), src.indexOf(end, src.indexOf(start)));
assert.ok(body("if (!tenancy) {", "if (tenancy.status").includes("<NotificationsSection"), "no-tenancy state");
assert.ok(body("function PendingTenancy", "function TenancyInvite").includes("<NotificationsSection"), "pending state");
assert.ok(!src.includes(".slice(0, 4)"), "list must not be truncated");
console.log("ok");
