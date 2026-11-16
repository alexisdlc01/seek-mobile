// Deposit question chips (app/(app)/deposit.tsx) must reach their topic in depositAnswer (SeekBackend/src/ai/ai.service.ts).
// The question strings and regexes below are COPIES: update them with the originals.
// Run: node scripts/deposit-questions.test.mjs
import assert from "node:assert";

// depositAnswer topic regexes, in routing order (first match wins).
const topics = [
  ["penalty", /\b(overdue|not protected|unprotected|never protected|too long|penalt\w*|protected(?: \w+){0,4} late|late protection|(?:hasn['’]?t|haven['’]?t|didn['’]?t|wasn['’]?t|isn['’]?t|aren['’]?t|has not|have not|did not|was not|is not|are not) (?:been |yet )?protect\w*|(?:refus|fail)\w* to protect\w*|never (?:put|placed)(?: \w+){0,4} (?:in a )?scheme|(?:isn['’]?t|not) in a scheme)\b/],
  ["dispute", /\b(dispute|disagree\w*|complain\w*|adjudicat\w*|arbitrat\w*|unfair|refus\w*)\b/],
  ["deductions", /\b(deduct\w*|keep|withhold\w*|take|clean\w*|damage\w*|repair\w*|wear|tear|stain\w*|broken)\b/],
  ["certificate", /\b(certificate|prescribed|proof|reference|paperwork)\b/],
  ["protected", /\b(protect\w*|scheme|dps|tds|mydeposits|where)\b/],
  ["return", /\b(return\w*|back|refund\w*|get my|when|how long|end of|move out|leave)\b/],
  ["cap", /\b(cap|much|maximum|limit|weeks|months)\b/],
];

// Chip question -> intended topic.
const chips = {
  "Which scheme is my deposit in?": "protected",
  "What if my deposit was not protected?": "penalty",
  "What can my landlord deduct?": "deductions",
  "When do I get my deposit back?": "return",
  "What if we disagree about the deposit?": "dispute",
  "Where is my deposit certificate?": "certificate",
  "What is the maximum deposit?": "cap",
};

for (const [question, topic] of Object.entries(chips)) {
  const routed = topics.find(([, re]) => re.test(question.toLowerCase()))?.[0];
  assert.strictEqual(routed, topic, `"${question}" routes to ${routed}, expected ${topic}`);
}
assert.strictEqual(new Set(Object.values(chips)).size, topics.length, "one chip per topic");
console.log("deposit-questions: ok");
