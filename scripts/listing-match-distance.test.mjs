// Distance far from the listing (GPS in another city) must not add a travel reason or score change.
// Run: node scripts/listing-match-distance.test.mjs
import assert from "node:assert";
import { matchHome } from "../src/utils/listing-match.ts";

const home = (distanceKm) => ({ rentPerPerson: null, bedrooms: null, billsIncluded: false, availableFrom: null, distanceKm });

assert.match(matchHome(home(1)).why, /walk/, "1 km shows travel time");
assert.match(matchHome(home(10)).why, /cycle/, "10 km still shows travel time");
const far = matchHome(home(700));
assert.doesNotMatch(far.why, /min/, "700 km shows no travel time");
assert.deepStrictEqual(far, matchHome(home(null)), "700 km behaves like unknown distance");
console.log("listing-match distance: ok");
