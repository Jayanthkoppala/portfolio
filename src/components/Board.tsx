"use client";

/**
 * The parthh.in-style board, rebuilt exactly, with Jay's content.
 * Three spotlight cards up top, an analog watch carved between the rows,
 * globe + founder phone-fan below. The cube is a pre-rendered image
 * (the reference site fakes its 3D too).
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Cube3D = dynamic(() => import("@/components/Cube3D"), {
  ssr: false,
  loading: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/shots/cube.png"
      alt=""
      className="w-full brightness-[1.35]"
    />
  ),
});
import { Globe } from "@/components/ui/globe";
import { Iphone } from "@/components/ui/iphone";
import Watch from "@/components/Watch";
import { identity } from "@/config/portfolio";
import type { COBEOptions } from "cobe";

const GLOBE_CFG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 3.6,
  theta: 0.22,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 5,
  baseColor: [0.55, 0.58, 0.56],
  markerColor: [16 / 255, 185 / 255, 129 / 255],
  glowColor: [0.09, 0.11, 0.1],
  markers: [
    { location: [12.9716, 77.5946], size: 0.09 },
    { location: [51.5074, -0.1278], size: 0.05 },
  ],
  onRender: () => {},
};

const TABS = [
  {
    key: "Agents",
    head: "Systems that act",
    body: "Agents that do the work, not chatbots that describe it — running without me in the loop.",
  },
  {
    key: "Voice",
    head: "Latency, quality, cost",
    body: "You rarely get all three. The real work is deciding which one to give up.",
  },
  {
    key: "Contracts",
    head: "Code that holds money",
    body: "Audited leverage contracts with real user funds behind them. There is no hotfix on-chain.",
  },
  {
    key: "Product",
    head: "End to end, alone if I have to",
    body: "Backend, frontend, the voice on the call, the deploy. One person can carry a whole product.",
  },
];

function useTimes() {
  const [t, setT] = useState({ ist: "--:--", uk: "--:--" });
  useEffect(() => {
    const tick = () => {
      const fmt = (tz: string) =>
        new Intl.DateTimeFormat("en-GB", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
      setT({ ist: fmt("Asia/Kolkata"), uk: fmt("Europe/London") });
    };
    tick();
    const i = setInterval(tick, 30_000);
    return () => clearInterval(i);
  }, []);
  return t;
}

const CARD =
  "relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#101312]/70 transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]";

function SocialIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    X: "M18.9 1.2h3.7l-8.1 9.3L24 23.2h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-9.9L-.1 1.2h7.7l5.3 7 6-7Zm-1.3 19.8h2L6.5 3.3H4.3l13.3 17.7Z",
    GitHub:
      "M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.9-10.9C23.5 5.6 18.4.5 12 .5Z",
    LinkedIn:
      "M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13H3.5V9h3.6v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 1 .8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-1-.8-1.7-1.8-1.7Z",
    Instagram:
      "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2a3.8 3.8 0 0 1-.9 1.4c-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1ZM12 0C8.7 0 8.3 0 7.1.1 5.8.2 5 .4 4.3.6c-.7.3-1.4.7-2 1.3s-1 1.3-1.3 2C.7 4.6.5 5.5.4 6.7.3 8 .3 8.4.3 11.7s0 3.7.1 5c.1 1.2.3 2.1.6 2.8.3.7.7 1.4 1.3 2s1.3 1 2 1.3c.7.3 1.5.5 2.8.6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.2-.1 2.1-.3 2.8-.6.7-.3 1.4-.7 2-1.3s1-1.3 1.3-2c.3-.7.5-1.5.6-2.8.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.2-.3-2.1-.6-2.8a5.5 5.5 0 0 0-1.3-2 5.5 5.5 0 0 0-2-1.3c-.7-.3-1.5-.5-2.8-.6C15.7 0 15.3 0 12 0Zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.8-10.4a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0Z",
  };
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
      <path d={paths[name] || ""} />
    </svg>
  );
}

const SPOT = {
  background:
    "radial-gradient(90% 60% at 30% -5%, rgba(255,255,255,0.09), rgba(255,255,255,0.015) 45%, transparent 70%)",
};

export default function Board() {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const { ist, uk } = useTimes();
  const topRef = useRef<HTMLDivElement>(null);
  const [cy, setCy] = useState<number | null>(null);
  const [zone, setZone] = useState("India");

  // Watch center sits exactly on the boundary between the two rows
  // (top-row height + half the 16px gap). Measured, so the carved cuts
  // stay concentric at every viewport width.
  useLayoutEffect(() => {
    const el = topRef.current;
    if (!el) return;
    const update = () => setCy(el.offsetHeight + 20);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* ── top row ─────────────────────────────────────────── */}
      <div ref={topRef} className="grid gap-4 lg:grid-cols-[365px_1fr_365px] [&>*]:min-w-0">
        {/* identity */}
        <div className={`${CARD} flex flex-col p-7`} style={SPOT}>
          <p className="kicker">
            <span className="serif-accent mr-2 text-base normal-case text-ink">
              JK
            </span>
            full-stack engineer ·{" "}
            <span className="text-accent">building BOSS!</span>
          </p>
          <p className="mt-3 text-3xl font-bold tracking-tight">
            Jayanth <span className="serif-accent font-normal text-ink-dim">Koppala</span>
          </p>
          <p className="kicker mt-2">📍 Bengaluru, IN · {ist}</p>
          <div className="relative my-6 flex flex-1 items-center justify-center">
            <div className="relative h-[230px] w-[230px] cursor-grab active:cursor-grabbing">
              <Cube3D />
            </div>
          </div>
          <div className="border-t border-line pt-4">
            <div className="flex items-center justify-center gap-8 text-ink-dim">
              {identity.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="transition-all duration-200 hover:scale-125 hover:text-accent"
                >
                  <SocialIcon name={s.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* philosophy */}
        <div className={`${CARD} bite-mid p-7 pb-40`} style={SPOT}>
          <div className="flex items-start justify-between gap-4">
            <span className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors hover:border-accent">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-ink-dim" strokeWidth="1.6">
                  <path d="M5 3l14 8-6.5 1.5L9 19 5 3Z" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="kicker">products that act</span>
            </span>
            <p className="kicker">
              philosophy <span className="text-accent">✦</span>
            </p>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-4xl font-bold leading-none tracking-tight sm:text-5xl">
                Products
              </h3>
              <p className="serif-accent mt-1 text-3xl text-ink-dim sm:text-4xl">
                you can trust.
              </p>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-dim">
                I sweat the screening call, the contract audit, the deploy —
                the stuff that has to hold.
              </p>
            </div>
            <div className="sm:text-right">
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {TABS.map((t, i) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(i)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                      i === tab
                        ? "border-accent bg-accent/15 text-accent"
                        : "border-line text-ink-dim hover:border-ink-faint hover:text-ink"
                    }`}
                  >
                    {t.key}
                  </button>
                ))}
              </div>
              <p className="mt-5 text-base font-semibold text-ink">
                {TABS[tab].head}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {TABS[tab].body}
              </p>
            </div>
          </div>
        </div>

        {/* connect */}
        <div className={`${CARD} flex flex-col p-7`} style={SPOT}>
          <div className="flex items-center justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-accent">
              <span className="grid h-4 w-4 place-items-center rounded-full border-2 border-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              </span>
            </span>
            <span className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="kicker">shipping daily</span>
            </span>
          </div>
          <div className="mt-6">
            <p className="text-3xl font-black leading-[1.05] tracking-tight">
              LET&apos;S BUILD
              <br />
              SOMETHING
            </p>
            <p className="serif-accent mt-1 text-2xl text-ink-dim">
              that actually ships.
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(identity.email);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className="group mt-6 text-left"
          >
            <p className="text-xl font-semibold text-ink transition-colors group-hover:text-accent">
              ⬡ {identity.email}
            </p>
            <span className="mt-2 block h-[2px] w-full origin-left scale-x-0 rounded bg-gradient-to-r from-accent to-[#6ee7b7] transition-transform duration-300 group-hover:scale-x-100" />
            <p className="kicker mt-2 tracking-[0.3em]">
              {copied ? "copied ✓" : "tap to copy email"}
            </p>
          </button>
          <a
            href={`mailto:${identity.email}`}
            className="mt-auto block rounded-2xl bg-ink py-4 text-center text-sm font-bold tracking-wide text-bg shadow-[0_8px_30px_rgba(233,238,234,0.15)] transition-transform hover:scale-[1.02]"
          >
            CONNECT NOW&nbsp;&nbsp;↗
          </a>
        </div>
      </div>

      {/* ── the watch: measured center, concentric cuts, no arch ── */}
      {cy !== null && (
        <div
          className="absolute left-1/2 z-20 hidden lg:block"
          style={{ top: cy, transform: "translate(-50%, -50%)" }}
        >
          {/* stroke tracing the carved edge — exactly 12px outside the collar */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[516px] w-[516px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]"
          />
          {/* neck under the disc, opening into the column */}
          <div
            aria-hidden
            className="absolute left-1/2 top-full h-14 w-10 -translate-x-1/2"
            style={{
              background: "var(--bg)",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          />
          {/* collar — stepped rings */}
          <div
            className="group relative rounded-full p-3 transition-transform duration-500 hover:scale-[1.01]"
            style={{ background: "var(--bg)" }}
          >
            <div
              className="rounded-full p-2"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.09), rgba(255,255,255,0.01) 55%)",
              }}
            >
              <div
                className="rounded-full p-4 transition-shadow duration-500 group-hover:shadow-[0_0_60px_rgba(16,185,129,0.12)]"
                style={{
                  background:
                    "radial-gradient(75% 75% at 50% 42%, #131614, #0a0c0b 74%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.9)",
                }}
              >
                <Watch size={330} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── bottom row: two cards, pills live in the carved column ── */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_230px_1fr] lg:gap-0">
        {/* globe card */}
        <div className={`${CARD} bite-corner-r`} style={SPOT}>
          <div className="relative min-h-[400px] overflow-hidden p-7">
            <p className="kicker">available globally</p>
            <p className="mt-2 text-3xl font-bold leading-tight">
              Adaptable across
              <br />
              time zones
            </p>
            <div className="pointer-events-none absolute -bottom-[220px] -left-[100px] h-[520px] w-[520px]">
              <Globe config={GLOBE_CFG} className="!max-w-none" />
            </div>
            <span
              className="absolute z-10 rounded-md border border-line bg-bg/90 px-2.5 py-1 font-mono text-xs text-ink backdrop-blur transition-all duration-500"
              style={
                zone === "India"
                  ? { bottom: "6rem", left: "42%" }
                  : zone === "UK"
                    ? { top: "11rem", left: "10%" }
                    : { top: "15rem", left: "2%" }
              }
            >
              {zone === "India" ? "🇮🇳 India" : zone === "UK" ? "🇬🇧 UK" : "🇺🇸 USA"}
            </span>
          </div>
        </div>

        {/* carved column — pills stack in the void */}
        <div className="relative z-10 flex flex-row items-center justify-center gap-4 lg:flex-col lg:items-center lg:justify-start lg:gap-5 lg:pt-[300px]">
          {[
            { flag: "🇬🇧", name: "UK", time: uk },
            { flag: "🇮🇳", name: "India", time: ist },
            { flag: "🇺🇸", name: "USA", time: "" },
          ].map((z) => (
            <button
              key={z.name}
              onClick={() => setZone(z.name)}
              className={`w-fit min-w-[132px] rounded-full border px-5 py-3 text-center text-sm transition-all duration-300 ${
                zone === z.name
                  ? "scale-105 border-transparent bg-ink font-semibold text-bg shadow-[0_8px_24px_rgba(233,238,234,0.15)]"
                  : "border-line bg-[#0e1210] text-ink-dim hover:border-ink-faint hover:text-ink"
              }`}
            >
              {z.name} {z.flag}
              {z.time && (
                <span className={`ml-1 font-mono text-xs ${zone === z.name ? "text-bg/60" : "text-ink-faint"}`}>
                  {z.time}
                </span>
              )}
            </button>
          ))}
          <div className="mt-6 hidden text-center lg:block">
            <p className="kicker">◎ remote</p>
            <p className="mt-0.5 text-lg font-semibold text-ink">India</p>
          </div>
          <span className="mt-auto mb-1 hidden h-1.5 w-14 rounded-full border border-white/[0.09] bg-[#11140f] lg:block" />
        </div>

        {/* founder + phones card */}
        <div className={`${CARD} bite-corner-l`} style={SPOT}>
          <div className="relative min-h-[400px] overflow-hidden p-7 text-right">
            <p className="text-4xl font-bold tracking-tight">
              Founder of{" "}
              <a
                href="https://bosshq.in"
                target="_blank"
                rel="noreferrer"
                className="serif-accent bg-gradient-to-r from-accent to-[#6ee7b7] bg-clip-text text-transparent transition-opacity hover:opacity-80"
              >
                BOSS!
              </a>
            </p>
            <p className="serif-accent mt-1 text-lg text-ink-faint">
              &lt; round-one hiring, done /&gt;
            </p>
            <div className="pointer-events-none absolute -bottom-24 right-0 flex justify-end gap-3">
              <div className="w-[135px] -rotate-12 opacity-70">
                <Iphone src="/shots/boss-hero.png" className="size-full" />
              </div>
              <div className="z-10 w-[155px]">
                <Iphone src="/shots/boss-hero.png" className="size-full" />
              </div>
              <div className="w-[135px] rotate-12 opacity-70">
                <Iphone src="/shots/boss-hero.png" className="size-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes cube-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </div>
  );
}
