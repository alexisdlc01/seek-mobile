// Repro for hooks/like.ts: setQueriesData on the ['/listings/filter'] prefix also hits
// infinite map queries ({pages, pageParams}). Run: node scripts/like-cache-guard.test.mjs
import assert from "node:assert";
import { QueryClient } from "@tanstack/query-core";

const qc = new QueryClient();
qc.setQueryData(["/listings/filter", "map", {}, {}], { pages: [[{ _id: "a" }]], pageParams: [1] });
qc.setQueryData(["/listings/filter", { q: 1 }], [{ _id: "a", likedBy: [] }]);

const run = (guard) => qc.setQueriesData({ queryKey: ["/listings/filter"], exact: false }, (curr) => {
  if (guard ? !Array.isArray(curr) : !curr) return curr;
  return curr.map((l) => ({ ...l, likedBy: ["u"] }));
});

assert.throws(() => run(false), /map is not a function/); // old behaviour
run(true); // fixed guard (same condition as hooks/like.ts)
assert.deepStrictEqual(qc.getQueryData(["/listings/filter", { q: 1 }])[0].likedBy, ["u"]);
assert.ok(qc.getQueryData(["/listings/filter", "map", {}, {}]).pages);
console.log("ok");
