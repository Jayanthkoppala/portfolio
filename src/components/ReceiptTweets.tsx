import type { Tweet } from "react-tweet/api";
import tweets from "@/data/tweets.json";
import ProofLink from "@/components/ProofLink";
import { BlurFade } from "@/components/ui/blur-fade";

/**
 * Receipts as two infinite marquee rails of tweet cards, built from the
 * committed build-time snapshot (a deleted tweet or rate limit can never
 * blank this section). Rails scroll opposite directions, pause on hover.
 * Below the rails: the hackathons + communities records, receipts inline.
 */
const T = tweets as unknown as Record<string, Tweet>;
const IDS = Object.keys(T);

const LINKS = {
  ton: "https://x.com/JayBosshq/status/1850824819966669220",
  atrium: "https://x.com/JayBosshq/status/1908253253730500716",
  thread: "https://x.com/JayBosshq/status/1905868856201195986",
  recall: "https://x.com/JayBosshq/status/1953448415242723438",
  polkadot: "https://x.com/JayBosshq/status/1864403099470975119",
  mca: "https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4",
  vixdex: "https://vixdex.vercel.app",
  credibly: "https://credibly-teal.vercel.app",
};

function cleanText(t: string) {
  return t
    .replace(/https:\/\/t\.co\/\S+/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

function TweetCard({ id }: { id: string }) {
  const t = T[id];
  const photos = (
    (t as { mediaDetails?: { type: string; media_url_https: string }[] })
      .mediaDetails ?? []
  ).filter((m) => m.type === "photo");
  return (
    <a
      href={`https://x.com/JayBosshq/status/${id}`}
      target="_blank"
      rel="noreferrer"
      className="glass group flex w-[340px] shrink-0 flex-col !rounded-2xl p-5 transition-colors hover:border-accent/40 sm:w-[380px]"
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.user.profile_image_url_https}
          alt=""
          className="h-9 w-9 rounded-full border border-line"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {t.user.name}
          </p>
          <p className="kicker !normal-case !tracking-normal">
            @{t.user.screen_name} · {fmtDate(t.created_at)}
          </p>
        </div>
        <span
          aria-hidden
          className="ml-auto text-sm text-ink-faint transition-colors group-hover:text-accent"
        >
          ↗
        </span>
      </div>
      <p className="mt-3 line-clamp-4 text-[0.88rem] leading-relaxed text-ink-dim">
        {cleanText(t.text)}
      </p>
      {photos.length > 0 && (
        <div className="mt-auto pt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[0].media_url_https}
            alt=""
            className="h-28 w-full rounded-xl border border-line object-cover"
            loading="lazy"
          />
        </div>
      )}
    </a>
  );
}

function Rail({ ids, reverse }: { ids: string[]; reverse?: boolean }) {
  return (
    <div className="receipt-rail group/rail relative">
      <div
        className={`flex w-max gap-4 py-2 ${
          reverse ? "rail-track-reverse" : "rail-track"
        }`}
      >
        {[...ids, ...ids].map((id, i) => (
          <TweetCard key={`${id}-${i}`} id={id} />
        ))}
      </div>
    </div>
  );
}

export default function ReceiptTweets() {
  const mid = Math.ceil(IDS.length / 2);
  const rowA = IDS.slice(0, mid);
  const rowB = IDS.slice(mid);
  return (
    <div>
      {/* ── the rails ── */}
      <div className="receipt-rails -mx-6 mt-2 space-y-1 sm:-mx-10">
        <Rail ids={rowA} />
        <Rail ids={rowB.length ? rowB : rowA} reverse />
      </div>

      {/* ── hackathons ── */}
      <BlurFade delay={0.1} inView>
        <div className="mt-16 border-t border-line pt-10">
          <p className="kicker mb-4">hackathons — the record</p>
          <p className="max-w-3xl text-[0.95rem] leading-relaxed text-ink-dim">
            I&apos;ve been entering hackathons since college, and the wins
            carry receipts. Second place at the TON Bootcamp with TonMate —{" "}
            <ProofLink href={LINKS.ton}>$1,500, my own announcement</ProofLink>
            . A prize at the Uniswap Hook Incubator for VixDex, a
            volatility-trading hook —{" "}
            <ProofLink href={LINKS.atrium}>
              Atrium&apos;s announcement
            </ProofLink>
            , <ProofLink href={LINKS.thread}>the build thread</ProofLink>, and
            it&apos;s <ProofLink href={LINKS.vixdex}>still live</ProofLink>. A
            trading-agent competition with Recall + Gaia —{" "}
            <ProofLink href={LINKS.recall}>
              9th place, $1,500, and it turned into the Xtheo job
            </ProofLink>
            . A{" "}
            <ProofLink href={LINKS.polkadot}>
              $300 bounty at the Polkadot Hacker House
            </ProofLink>{" "}
            for Jackdot, a Telegram lottery app. The ₹15 lakh MSME grant for
            Souldem — <ProofLink href={LINKS.mca}>company on record</ProofLink>
            . And <ProofLink href={LINKS.credibly}>Credibly</ProofLink>, built
            at BASED India, still deployed. Plus a few smaller ones I never
            posted about.
          </p>
        </div>
      </BlurFade>

      {/* ── communities ── */}
      <BlurFade delay={0.15} inView>
        <div className="mt-10">
          <p className="kicker mb-4">communities — the rooms</p>
          <p className="max-w-3xl text-[0.95rem] leading-relaxed text-ink-dim">
            Before the companies, there were the rooms. Technical Director of
            The Phoenix Guild&apos;s Chandigarh chapter, running sessions on
            team formation and shipping with people I&apos;d just met.
            Webmaster for IEEE CIS at Chandigarh University, then Student
            Representative — I built the summer school&apos;s landing page and
            learned that community work is mostly showing up. Spoke at the
            Aleo zkMeetup in Chandigarh on zero-knowledge proofs, back when
            explaining ZK to a room was still a dare. Since then it&apos;s
            been hacker houses: AthenaFOSS, where I stayed up solving the
            Monad CTF riddle after a full workday, and ETHDelhi with the rest
            of the circus. No badges for any of this. Just the habit of being
            in rooms where things get built.
          </p>
        </div>
      </BlurFade>
    </div>
  );
}
