import { EmbeddedTweet } from "react-tweet";
import type { Tweet } from "react-tweet/api";
import tweets from "@/data/tweets.json";
import "react-tweet/theme.css";

/**
 * Receipts as the actual tweets, from the committed build-time snapshot.
 * Masonry via CSS columns so mixed heights pack naturally. The two tweets
 * whose media is video/GIF (403s from snapshot embeds) render as text-first
 * quote cards linking out, instead of broken players.
 */
const PHOTO_TWEETS = ["1850824819966669220", "1908253253730500716"];
const TEXT_TWEETS = ["1953448415242723438", "1864403099470975119"];

const T = tweets as unknown as Record<string, Tweet>;

function QuoteCard({ id }: { id: string }) {
  const t = T[id];
  const text = (t as { text?: string }).text ?? "";
  return (
    <a
      href={`https://x.com/JayBosshq/status/${id}`}
      target="_blank"
      rel="noreferrer"
      className="glass group mb-4 block break-inside-avoid !rounded-2xl p-6"
    >
      <p className="kicker !text-accent">@JayBosshq</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">{text}</p>
      <span className="kicker mt-4 inline-block transition-colors group-hover:!text-accent">
        view on X ↗
      </span>
    </a>
  );
}

export default function ReceiptTweets() {
  return (
    <div data-theme="dark" className="tweet-zone">
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {PHOTO_TWEETS.map((id) => (
          <div
            key={id}
            className="glass mb-4 break-inside-avoid overflow-hidden !rounded-2xl p-2"
          >
            <EmbeddedTweet tweet={T[id]} />
          </div>
        ))}
        {TEXT_TWEETS.map((id) => (
          <QuoteCard key={id} id={id} />
        ))}
        <a
          href="https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4"
          target="_blank"
          rel="noreferrer"
          className="glass group mb-4 block break-inside-avoid !rounded-2xl p-6"
        >
          <p className="font-mono text-sm leading-relaxed text-ink">
            ₹15 lakh MSME Idea Hackathon grant
            <br />
            Souldem (LEDGESYS)
          </p>
          <p className="kicker mt-3">
            pre-twitter era — the incorporation record is the receipt
          </p>
          <span className="kicker mt-3 inline-block transition-colors group-hover:!text-accent">
            MCA record ↗
          </span>
        </a>
      </div>
    </div>
  );
}
