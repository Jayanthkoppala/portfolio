// Build-time tweet snapshot: fetch once, commit the JSON.
// A deleted tweet or a rate limit can then never blank the receipts section.
import { getTweet } from "react-tweet/api";
import { writeFile } from "node:fs/promises";

const IDS = [
  "1850824819966669220", // TON 2nd place
  "1908253253730500716", // Uniswap Foundation prize
  "1953448415242723438", // Recall/Gaia $1500 -> job
  "1864403099470975119", // Polkadot bounty
];

const out = {};
for (const id of IDS) {
  const t = await getTweet(id);
  if (!t) throw new Error(`tweet ${id} not found`);
  out[id] = t;
  console.log("fetched", id, "-", (t.text || "").slice(0, 50));
}
await writeFile("src/data/tweets.json", JSON.stringify(out, null, 1));
console.log("wrote src/data/tweets.json");
