"use client";

import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Globe } from "@/components/ui/globe";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/ui/terminal";
import Watch from "@/components/Watch";
import { ClockWidget } from "@/components/widgets";
import { identity } from "@/config/portfolio";
import type { COBEOptions } from "cobe";

const EMERALD_GLOBE: COBEOptions = {
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
    { location: [12.9716, 77.5946], size: 0.1 }, // Bengaluru
    { location: [28.6139, 77.209], size: 0.04 },
    { location: [13.0827, 80.2707], size: 0.04 },
  ],
  onRender: () => {},
};

/** Shared glass wrapper with the Magic UI mouse-spotlight. */
export function Tile({
  children,
  className = "",
  span = "",
}: {
  children: React.ReactNode;
  className?: string;
  span?: string;
}) {
  return (
    <MagicCard
      className={`glass !rounded-3xl ${span}`}
      gradientColor="rgba(16,185,129,0.10)"
      gradientFrom="#10b981"
      gradientTo="#0a0c0b"
      gradientOpacity={0.5}
    >
      <div className={`h-full p-6 ${className}`}>{children}</div>
    </MagicCard>
  );
}

export function IdentityTile() {
  return (
    <Tile className="flex flex-col justify-between">
      <div>
        <p className="text-3xl font-bold tracking-tight">
          Jayanth <span className="serif-accent text-ink-dim">Koppala</span>
        </p>
        <ClockWidget />
      </div>
      <div className="mt-6 flex items-center gap-5 border-t border-line pt-4">
        {identity.socials.map((s) => (
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
    </Tile>
  );
}

export function ConnectTile() {
  const [copied, setCopied] = useState(false);
  return (
    <Tile className="flex flex-wrap items-center justify-between gap-4 !py-5">
      <div className="flex items-center gap-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <p className="text-xl font-bold leading-tight tracking-tight">
          LET&apos;S BUILD SOMETHING{" "}
          <span className="serif-accent font-normal text-ink-dim">
            that actually ships.
          </span>
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => {
            navigator.clipboard.writeText(identity.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }}
          className="rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-accent"
        >
          {copied ? "copied ✓" : `${identity.email} — tap to copy`}
        </button>
        <a
          href={`mailto:${identity.email}`}
          className="rounded-full bg-ink px-5 py-2 text-sm font-bold text-bg transition-transform hover:scale-[1.03]"
        >
          CONNECT NOW ↗
        </a>
      </div>
    </Tile>
  );
}

export function GlobeTile() {
  return (
    <Tile className="relative flex min-h-[300px] flex-col overflow-hidden">
      <p className="kicker">works across time zones</p>
      <p className="mt-2 text-xl font-bold">
        IST native.{" "}
        <span className="serif-accent text-ink-dim">Awake anyway.</span>
      </p>
      <div className="relative mt-2 flex-1">
        <Globe config={EMERALD_GLOBE} className="!max-w-[420px] top-2" />
      </div>
      <div className="pointer-events-none absolute bottom-4 left-6 flex gap-2">
        <span className="glass rounded-full px-3 py-1 text-xs text-ink-dim">🇮🇳 Bengaluru</span>
        <span className="glass rounded-full px-3 py-1 text-xs text-ink-dim">UTC +5:30</span>
      </div>
    </Tile>
  );
}

export function WatchTile() {
  return (
    <Tile className="flex flex-col items-center justify-center gap-3">
      <Watch size={210} />
      <p className="kicker">the only watch I check</p>
    </Tile>
  );
}

export function TerminalTile() {
  return (
    <Tile className="!p-3">
      <Terminal className="h-full max-h-none min-h-[280px] border-0 bg-[#0b120e]">
        <TypingAnimation className="text-accent">$ whoami</TypingAnimation>
        <AnimatedSpan className="text-ink-dim">
          jayanth — building since 16
        </AnimatedSpan>
        <TypingAnimation className="text-accent">$ ls ~/shipped</TypingAnimation>
        <AnimatedSpan className="text-ink-dim">
          boss nohunt vixdex hashpit credibly jackdot
        </AnimatedSpan>
        <TypingAnimation className="text-accent">$ uptime</TypingAnimation>
        <AnimatedSpan className="text-ink-dim">
          awake since the last deadline
        </AnimatedSpan>
        <TypingAnimation className="text-accent">$ _</TypingAnimation>
      </Terminal>
    </Tile>
  );
}
