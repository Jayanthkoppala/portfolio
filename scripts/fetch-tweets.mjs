// Build-time tweet snapshot: fetch once, commit the JSON.
// A deleted tweet or a rate limit can then never blank the receipts section.
import { getTweet } from "react-tweet/api";
import { writeFile } from "node:fs/promises";

const IDS = [
  "1850824819966669220", // TON 2nd place
  "1908253253730500716", // Uniswap Foundation prize
  "1953448415242723438", // Recall/Gaia $1500 -> job
  "1864403099470975119", // Polkadot bounty
  "1905868856201195986", // VixDex build thread
  "2002170394623807826", // Xtheo perps-agent demo
  "2083173402932851055", // Sarvam AI Startup Program acceptance
  // hackathons
  "1934463615865913713", // 36hrs straight — Polkadot AssetHub hackathon
  "1931013386017669614", // Swappybox MVP on Polkadot Asset Hub
  "1845222837881274582", // BASED India, 3:30am meets
  "1828116865325113792", // ETHGlobal Online, team formed
  "1905704747207933993", // UHI submission day
  // community / rooms
  "1970798990666158517", // reporting from AthenaFOSS
  "1968547768495923492", // AthenaFOSS CTF riddle solved (Monad flag)
  "1971584564632985757", // ETHdelhi!!
  "1972275285719667061", // ETHDelhi comes to an end
  "1786409857534321109", // Solana Ecosystem Call w/ TPG Chandigarh
  "1865449308432085205", // CoinDotFi Hacker House
  "1867694649999339867", // 8-day hacker house, shipped real products
  "1865033235169788325", // featured in PolkadotNow pulse
  // build
  "1881562399700140185", // accepted into Uniswap Hook Incubator
  "1896560934773989605", // first public VixDex description
  "1722599731699098086", // 2023 — earliest build-in-public post
  // launch
  "2082880953366827258", // launching BOSS talent side
  "2083223827719610772", // Talk to Boss — never feel ghosted
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
