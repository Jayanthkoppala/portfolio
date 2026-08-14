import { EmbeddedTweet } from "react-tweet";
import type { Tweet } from "react-tweet/api";
import tweets from "@/data/tweets.json";
import "react-tweet/theme.css";

/**
 * Receipts as the actual tweets — rendered from a build-time snapshot
 * (scripts/fetch-tweets.mjs), so a rate limit or deleted tweet can never
 * blank this section. Featured tweet spans wider per Jay's note.
 */
const ORDER: { id: string; featured?: boolean }[] = [
  { id: "1850824819966669220", featured: true }, // TON 2nd place (has photo)
  { id: "1908253253730500716" }, // Uniswap Foundation prize
  { id: "1953448415242723438" }, // Recall/Gaia $1500 -> job
  { id: "1864403099470975119" }, // Polkadot bounty
];

export default function ReceiptTweets() {
  return (
    <div data-theme="dark" className="tweet-zone grid gap-4 sm:grid-cols-3">
      {ORDER.map(({ id, featured }) => (
        <div
          key={id}
          className={`glass overflow-hidden !rounded-2xl p-2 ${
            featured ? "sm:col-span-2 sm:row-span-2" : ""
          }`}
        >
          <EmbeddedTweet
            tweet={(tweets as Record<string, unknown>)[id] as Tweet}
          />
        </div>
      ))}
      <a
        href="https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4"
        target="_blank"
        rel="noreferrer"
        className="glass group flex flex-col justify-center !rounded-2xl p-6"
      >
        <p className="font-mono text-sm leading-relaxed text-ink">
          ₹15 lakh MSME Idea Hackathon grant
          <br />
          Souldem (LEDGESYS)
        </p>
        <p className="kicker mt-3">
          pre-twitter era — the incorporation record is the receipt
        </p>
        <span className="kicker mt-4 transition-colors group-hover:!text-accent">
          MCA record ↗
        </span>
      </a>
    </div>
  );
}
