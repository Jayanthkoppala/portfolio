import type { Tweet } from "react-tweet/api";
import tweets from "@/data/tweets.json";

/**
 * THE RECEIPTS — one continuous evidence wall. Two opposite marquee rails
 * carrying four card species: tweets (from the committed snapshot), wins
 * (hackathon medals), rooms (community roles), and facts (registry records,
 * live deployments). Nothing is prose; every claim is a card with a link.
 */
const T = tweets as unknown as Record<string, Tweet>;

type Win = { title: string; prize: string; note: string; href: string };
const WINS: Win[] = [
  {
    title: "TON Bootcamp",
    prize: "2nd · $1,500",
    note: "TonMate — announced it myself, the day it happened.",
    href: "https://x.com/JayBosshq/status/1850824819966669220",
  },
  {
    title: "Uniswap Hook Incubator",
    prize: "prize winner",
    note: "VixDex, a volatility-trading hook. Atrium announced it.",
    href: "https://x.com/JayBosshq/status/1908253253730500716",
  },
  {
    title: "Recall + Gaia",
    prize: "9th · $1,500",
    note: "Trading-agent competition. The entry became the Xtheo job.",
    href: "https://x.com/JayBosshq/status/1953448415242723438",
  },
  {
    title: "Polkadot Hacker House",
    prize: "$300 bounty",
    note: "Jackdot, a Telegram lottery app with provably fair draws.",
    href: "https://x.com/JayBosshq/status/1864403099470975119",
  },
  {
    title: "MSME Idea Hackathon",
    prize: "₹15 lakh grant",
    note: "Souldem — the grant that funded my first registered company.",
    href: "https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4",
  },
];

type Room = { org: string; role: string; note: string };
const ROOMS: Room[] = [
  {
    org: "The Phoenix Guild",
    role: "Technical Director · Chandigarh",
    note: "Ran sessions on team formation and shipping with strangers.",
  },
  {
    org: "IEEE CIS",
    role: "Webmaster → Student Rep",
    note: "Built the summer school's landing page. Kept showing up.",
  },
  {
    org: "Aleo zkMeetup",
    role: "Speaker",
    note: "Explained zero-knowledge proofs when that was still a dare.",
  },
  {
    org: "AthenaFOSS",
    role: "Hacker house",
    note: "Solved the Monad CTF riddle after a full workday.",
  },
  {
    org: "ETHDelhi",
    role: "Hacker house",
    note: "With the rest of the circus.",
  },
];

type Fact = { kicker: string; title: string; note: string; href: string };
const FACTS: Fact[] = [
  {
    kicker: "on the record",
    title: "LEDGESYS Software Pvt Ltd",
    note: "CIN U62091TN2024PTC173053 — my name on the directors line.",
    href: "https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4",
  },
  {
    kicker: "still live",
    title: "vixdex.vercel.app",
    note: "The winning hook, still deployed. Click it.",
    href: "https://vixdex.vercel.app",
  },
  {
    kicker: "still live",
    title: "credibly-teal.vercel.app",
    note: "Built at BASED India. Never taken down.",
    href: "https://credibly-teal.vercel.app",
  },
];

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

/* ── card species ── */

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
      className="glass group flex w-[330px] shrink-0 flex-col !rounded-2xl p-5 transition-colors hover:border-accent/40 sm:w-[360px]"
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
      <p
        className={`mt-3 text-[0.88rem] leading-relaxed text-ink-dim ${
          photos.length ? "line-clamp-3" : "line-clamp-5"
        }`}
      >
        {cleanText(t.text)}
      </p>
      {photos.length > 0 && (
        <div className="mt-auto pt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[0].media_url_https}
            alt=""
            className="h-20 w-full rounded-xl border border-line object-cover"
            loading="lazy"
          />
        </div>
      )}
    </a>
  );
}

function WinCard({ w }: { w: Win }) {
  return (
    <a
      href={w.href}
      target="_blank"
      rel="noreferrer"
      className="group flex w-[270px] shrink-0 flex-col justify-between rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/[0.14] to-accent/[0.04] p-5 transition-all hover:border-accent hover:shadow-[0_0_28px_rgba(16,185,129,0.18)]"
    >
      <div>
        <p className="kicker !text-accent">hackathon win</p>
        <p style={{ fontFamily: "var(--font-anton)" }}
          className="mt-2 text-xl uppercase leading-tight text-ink">
          {w.title}
        </p>
        <p className="serif-accent mt-1 text-lg text-accent">{w.prize}</p>
      </div>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-dim">
        {w.note}
        <span
          aria-hidden
          className="ml-1 inline-block text-ink-faint transition-colors group-hover:text-accent"
        >
          ↗
        </span>
      </p>
    </a>
  );
}

function RoomCard({ r }: { r: Room }) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col justify-between rounded-2xl border border-dashed border-line bg-bg-raised/40 p-5">
      <div>
        <p className="kicker">the rooms</p>
        <p style={{ fontFamily: "var(--font-anton)" }}
          className="mt-2 text-lg uppercase leading-tight text-ink">
          {r.org}
        </p>
        <p className="serif-accent mt-1 text-[0.95rem] text-ink-dim">
          {r.role}
        </p>
      </div>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-dim">
        {r.note}
      </p>
    </div>
  );
}

function FactCard({ f }: { f: Fact }) {
  return (
    <a
      href={f.href}
      target="_blank"
      rel="noreferrer"
      className="glass group relative flex w-[290px] shrink-0 flex-col justify-between overflow-hidden !rounded-2xl p-5 transition-colors hover:border-accent/40"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -right-1 select-none font-mono text-[84px] leading-none text-ink opacity-[0.05] transition-opacity group-hover:opacity-[0.12]"
      >
        ↗
      </span>
      <div>
        <p className="kicker">{f.kicker}</p>
        <p className="mt-2 break-all font-mono text-[0.95rem] font-semibold text-ink transition-colors group-hover:text-accent">
          {f.title}
        </p>
      </div>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-dim">
        {f.note}
        <span aria-hidden className="ml-1 inline-block text-ink-faint">
          ↗
        </span>
      </p>
    </a>
  );
}

function GhostCard() {
  return (
    <div className="flex w-[240px] shrink-0 flex-col justify-center rounded-2xl border border-dashed border-line/60 p-5">
      <p className="serif-accent text-[1.05rem] leading-snug text-ink-dim">
        + a few smaller wins I never posted about.
      </p>
      <p className="kicker mt-3">no receipt · just memory</p>
    </div>
  );
}

/* ── rails ── */

function Rail({
  children,
  reverse,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="receipt-rail relative">
      <div
        className={`flex w-max items-stretch gap-4 py-2 ${
          reverse ? "rail-track-reverse" : "rail-track"
        }`}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

export default function ReceiptTweets() {
  const ids = Object.keys(T);
  // interleave species so no two of a kind sit together; a win's tweet and
  // its medal card ride opposite rails
  const railA: React.ReactNode[] = [
    <TweetCard key="t0" id={ids[0]} />,
    <WinCard key="w2" w={WINS[2]} />,
    <RoomCard key="r0" r={ROOMS[0]} />,
    <TweetCard key="t3" id={ids[3]} />,
    <FactCard key="f1" f={FACTS[1]} />,
    <TweetCard key="t4" id={ids[4]} />,
    <WinCard key="w4" w={WINS[4]} />,
    <RoomCard key="r3" r={ROOMS[3]} />,
    <TweetCard key="t6" id={ids[6] ?? ids[0]} />,
  ];
  const railB: React.ReactNode[] = [
    <WinCard key="w0" w={WINS[0]} />,
    <TweetCard key="t1" id={ids[1]} />,
    <RoomCard key="r1" r={ROOMS[1]} />,
    <FactCard key="f0" f={FACTS[0]} />,
    <TweetCard key="t2" id={ids[2]} />,
    <WinCard key="w1" w={WINS[1]} />,
    <RoomCard key="r2" r={ROOMS[2]} />,
    <TweetCard key="t5" id={ids[5] ?? ids[1]} />,
    <WinCard key="w3" w={WINS[3]} />,
    <RoomCard key="r4" r={ROOMS[4]} />,
    <FactCard key="f2" f={FACTS[2]} />,
    <GhostCard key="ghost" />,
  ];
  return (
    <div className="receipt-rails -mx-6 mt-2 space-y-1 sm:-mx-10">
      <Rail>{railA}</Rail>
      <Rail reverse>{railB}</Rail>
    </div>
  );
}
