import { Suspense } from "react";
import { TweetCard, TweetSkeleton } from "@/components/ui/tweet-card";

/** The receipts, as the actual tweets — fetched at build time. */
const TWEET_IDS = [
  "1850824819966669220", // TON 2nd place
  "1908253253730500716", // Uniswap Foundation prize
  "1953448415242723438", // Recall/Gaia $1500 → job
  "1864403099470975119", // Polkadot bounty
];

export default function ReceiptTweets() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {TWEET_IDS.map((id) => (
        <div key={id} className="glass overflow-hidden !rounded-2xl p-1 [&_a]:!text-inherit">
          <Suspense fallback={<TweetSkeleton />}>
            <TweetCard id={id} className="!border-0 !bg-transparent" />
          </Suspense>
        </div>
      ))}
      <a
        href="https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4"
        target="_blank"
        rel="noreferrer"
        className="glass group flex items-center justify-between !rounded-2xl p-5 sm:col-span-2"
      >
        <div>
          <p className="font-mono text-sm text-ink">
            ₹15 lakh MSME Idea Hackathon grant · Souldem (LEDGESYS)
          </p>
          <p className="kicker mt-1">
            pre-twitter era — the incorporation record is the receipt
          </p>
        </div>
        <span className="kicker whitespace-nowrap transition-colors group-hover:!text-accent">
          MCA record ↗
        </span>
      </a>
    </div>
  );
}
