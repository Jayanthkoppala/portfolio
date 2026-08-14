"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { projects } from "@/config/portfolio";

/**
 * Sticky stacking project cards with scale+dim on burial, so each layer
 * visibly stacks instead of vanishing. BOSS is excluded — it owns the
 * flagship section; receipts chips travel on the cards that earned them.
 */
const STACK = projects.filter((p) => p.name !== "BOSS!");

const CHIPS: Record<string, { label: string; href: string }> = {
  VixDex: {
    label: "uniswap foundation prize ↗",
    href: "https://x.com/JayBosshq/status/1908253253730500716",
  },
  Jackdot: {
    label: "polkadot bounty ↗",
    href: "https://x.com/JayBosshq/status/1864403099470975119",
  },
};

function Card({
  p,
  i,
  total,
  progress,
}: {
  p: (typeof STACK)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - i) * 0.04;
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const chip = CHIPS[p.name];

  return (
    <div className="sticky" style={{ top: `calc(9vh + ${i * 28}px)` }}>
      <motion.a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        style={{ scale }}
        className="glass group relative block origin-top !rounded-3xl p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3
            className="text-4xl uppercase tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            {p.name}
          </h3>
          <p className="kicker whitespace-nowrap">
            {p.year}
            {p.live && <span className="ml-2 text-good">● live</span>}
          </p>
        </div>
        <p className="serif-accent mt-3 text-2xl text-ink">{p.problem}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
          {p.shipped}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-xs text-ink-faint transition-colors group-hover:text-accent">
            {p.href.replace("https://", "")} ↗
          </span>
          {chip && (
            <span
              className="kicker rounded-full border border-line px-3 py-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(chip.href, "_blank");
              }}
            >
              {chip.label}
            </span>
          )}
        </div>
      </motion.a>
    </div>
  );
}

export default function ProjectStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="space-y-8">
      {STACK.map((p, i) => (
        <Card
          key={p.name}
          p={p}
          i={i}
          total={STACK.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}
