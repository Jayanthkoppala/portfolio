"use client";

/**
 * The parthh.in-style board, rebuilt exactly, with Jay's content.
 * Three spotlight cards up top, an analog watch carved between the rows,
 * globe + founder phone-fan below. The cube is a pre-rendered image
 * (the reference site fakes its 3D too).
 */
import { useEffect, useState } from "react";
import Image from "next/image";
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
  baseColor: [0.12, 0.17, 0.15],
  markerColor: [16 / 255, 185 / 255, 129 / 255],
  glowColor: [0.05, 0.14, 0.11],
  markers: [
    { location: [12.9716, 77.5946], size: 0.1 },
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
  "relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#101312]/70";
const SPOT = {
  background:
    "radial-gradient(90% 60% at 30% -5%, rgba(255,255,255,0.09), rgba(255,255,255,0.015) 45%, transparent 70%)",
};

export default function Board() {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const { ist, uk } = useTimes();

  return (
    <div className="relative">
      {/* ── top row ─────────────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-[340px_1fr_390px] [&>*]:min-w-0">
        {/* identity */}
        <div className={`${CARD} flex flex-col p-7`} style={SPOT}>
          <p className="kicker">
            <span className="serif-accent mr-2 text-base normal-case text-ink">
              JK
            </span>
            full-stack engineer ·{" "}
            <span className="text-accent">building BOSS!</span>
          </p>
          <p className="mt-4 text-4xl font-bold tracking-tight">
            Jayanth <span className="serif-accent font-normal text-ink-dim">Koppala</span>
          </p>
          <p className="kicker mt-2">📍 Bengaluru, IN · {ist}</p>
          <div className="relative my-6 flex flex-1 items-center justify-center">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 60% at 45% 35%, rgba(255,255,255,0.10), transparent 70%)",
              }}
            />
            <Image
              src="/shots/cube.png"
              alt=""
              width={340}
              height={340}
              className="relative w-[85%] max-w-[280px] animate-[cube-float_7s_ease-in-out_infinite]"
            />
          </div>
          <div className="border-t border-line pt-4">
            <div className="flex items-center justify-center gap-7">
              {identity.socials.slice(0, 3).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="kicker transition-colors hover:!text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* philosophy */}
        <div className={`${CARD} p-8 pb-44`} style={SPOT}>
          <div className="flex items-start justify-between gap-4">
            <p className="kicker rounded-full border border-line px-3 py-1.5">
              ⌁ products that act
            </p>
            <p className="kicker">
              philosophy <span className="text-accent">+</span>
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
        <div className={`${CARD} flex flex-col p-8`} style={SPOT}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="kicker">shipping daily</span>
            </span>
            <span className="kicker rounded-xl border border-line px-2.5 py-1.5">⌘</span>
          </div>
          <div className="mt-8">
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
            className="mt-10 text-left"
          >
            <p className="text-xl font-semibold text-ink transition-colors hover:text-accent">
              ⬡ {identity.email}
            </p>
            <p className="kicker mt-3 tracking-[0.3em]">
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

      {/* ── the watch, carved between rows ──────────────────── */}
      <div className="relative z-20 mx-auto -my-[150px] hidden w-fit lg:block">
        <div
          className="rounded-full p-6"
          style={{
            background: "var(--bg)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.8)",
          }}
        >
          <Watch size={300} />
        </div>
      </div>

      {/* ── bottom row ──────────────────────────────────────── */}
      <div className={`${CARD} mt-4 lg:min-h-[420px]`} style={SPOT}>
        <div className="grid gap-8 p-8 lg:grid-cols-2">
          <div className="relative min-h-[300px]">
            <p className="kicker">available globally</p>
            <p className="mt-3 text-3xl font-bold leading-tight">
              Adaptable across
              <br />
              time zones
            </p>
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-[380px] w-[380px] opacity-90">
              <Globe config={GLOBE_CFG} className="!max-w-none" />
            </div>
            <div className="absolute bottom-2 left-40 z-10 flex flex-col gap-2">
              <span className="w-fit rounded-full border border-line bg-bg/80 px-4 py-1.5 text-sm text-ink backdrop-blur">
                UK 🇬🇧 <span className="text-ink-faint">{uk}</span>
              </span>
              <span className="w-fit rounded-full border border-line bg-bg/80 px-4 py-1.5 text-sm text-ink backdrop-blur">
                India 🇮🇳 <span className="text-ink-faint">{ist}</span>
              </span>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-visible text-right">
            <p className="text-4xl font-bold tracking-tight">
              Founder of{" "}
              <a
                href="https://bosshq.in"
                target="_blank"
                rel="noreferrer"
                className="serif-accent bg-gradient-to-r from-accent to-[#6ee7b7] bg-clip-text text-transparent"
              >
                BOSS!
              </a>
            </p>
            <p className="serif-accent mt-2 text-lg text-ink-faint">
              &lt; round-one hiring, done /&gt;
            </p>
            <div className="pointer-events-none absolute -bottom-40 right-0 flex justify-end gap-4">
              <div className="w-[150px] -rotate-12 opacity-70">
                <Iphone src="/shots/boss-hero.png" className="size-full" />
              </div>
              <div className="z-10 w-[170px]">
                <Iphone src="/shots/boss-hero.png" className="size-full" />
              </div>
              <div className="w-[150px] rotate-12 opacity-70">
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
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-14px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
}
