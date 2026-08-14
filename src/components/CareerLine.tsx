"use client";

/**
 * The career as an instrument: an emerald conduit in the board's carved-
 * channel grammar, companies as collar-nodes on the line, BOSS pulsing at
 * the head. Click a node — the glass panel below morphs to that chapter.
 * Hackathon wins sit on the line as spark ticks with receipts.
 */
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

export type CareerEntry = {
  key: string;
  label: string;
  period: string;
  periodLabel: string;
  role: string;
  org: string;
  orgHref?: string;
  sub?: string;
  body: React.ReactNode;
  chips?: string[];
  shot?: string;
  flagship?: boolean;
};

export type Spark = {
  at: number; // 0..100 position on the line
  label: string;
  href: string;
};

export default function CareerLine({
  entries,
  sparks,
}: {
  entries: CareerEntry[];
  sparks: Spark[];
}) {
  // entries oldest → newest; default active = newest (flagship end)
  const [active, setActive] = useState(entries.length - 1);
  const e = entries[active];

  return (
    <div className="mt-14">
      {/* ── the line ── */}
      <div className="relative mx-auto hidden h-28 max-w-5xl sm:block">
        {/* conduit groove — board channel grammar */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 h-[14px] -translate-y-1/2"
          style={{
            background: "var(--bg)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        />
        {/* charge: filled up to the active node */}
        <motion.div
          aria-hidden
          className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full"
          style={{
            left: "0%",
            background:
              "linear-gradient(90deg, rgba(16,185,129,0.15), var(--accent))",
            boxShadow: "0 0 12px rgba(16,185,129,0.5)",
          }}
          animate={{
            width: `${(active / (entries.length - 1)) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        />
        {/* spark ticks — hackathon wins on the line */}
        {sparks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="group absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${s.at}%` }}
            aria-label={s.label}
          >
            <span className="block h-2 w-2 rotate-45 border border-accent/60 bg-bg transition-all group-hover:scale-150 group-hover:bg-accent" />
            <span className="kicker pointer-events-none absolute -top-9 left-1/2 w-max -translate-x-1/2 rounded-full border border-line bg-bg/95 px-2.5 py-1 !text-[0.6rem] opacity-0 transition-opacity group-hover:opacity-100">
              {s.label} ↗
            </span>
          </a>
        ))}
        {/* company nodes */}
        {entries.map((n, i) => {
          const on = i === active;
          return (
            <button
              key={n.key}
              onClick={() => setActive(i)}
              className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
              style={{ left: `${(i / (entries.length - 1)) * 100}%` }}
              aria-label={`${n.role} at ${n.org}, ${n.periodLabel}`}
              aria-pressed={on}
            >
              {/* collar */}
              <span
                className={`grid place-items-center rounded-full transition-all duration-300 ${
                  on ? "h-11 w-11" : "h-7 w-7 hover:h-9 hover:w-9"
                }`}
                style={{
                  background:
                    "radial-gradient(70% 70% at 40% 30%, #141715, #0a0c0b 75%)",
                  boxShadow: on
                    ? "0 0 0 1px rgba(16,185,129,0.6), 0 0 24px rgba(16,185,129,0.35)"
                    : "0 0 0 1px rgba(255,255,255,0.12)",
                }}
              >
                <span
                  className={`rounded-full transition-all ${
                    on ? "h-3 w-3" : "h-1.5 w-1.5"
                  }`}
                  style={{
                    background: on ? "var(--accent)" : "var(--ink-faint)",
                  }}
                />
                {n.flagship && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full border border-accent/50" />
                )}
              </span>
              {/* label */}
              <span
                className={`kicker absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap !text-[0.62rem] transition-colors ${
                  on ? "!text-accent" : ""
                }`}
              >
                {n.label}
              </span>
              <span className="kicker absolute bottom-full left-1/2 mb-2.5 hidden -translate-x-1/2 whitespace-nowrap !text-[0.58rem] !tracking-[0.1em] lg:block">
                {n.period}
              </span>
            </button>
          );
        })}
      </div>

      {/* mobile: node pills row */}
      <div className="flex gap-2 overflow-x-auto pb-2 sm:hidden">
        {entries.map((n, i) => (
          <button
            key={n.key}
            onClick={() => setActive(i)}
            className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs transition-colors ${
              i === active
                ? "border-accent bg-accent/15 text-accent"
                : "border-line text-ink-dim"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* ── the chapter panel ── */}
      <div className="relative mt-8 sm:mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={e.key}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
            className="glass mx-auto max-w-5xl !rounded-3xl p-7 sm:p-9"
          >
            <div
              className={`grid gap-8 ${e.shot ? "lg:grid-cols-[1.5fr_1fr]" : ""}`}
            >
              <div className="min-w-0">
                <p className="kicker">{e.period}{e.sub ? ` · ${e.sub}` : ""}</p>
                <h3 className="mt-2 text-2xl font-bold leading-snug text-ink sm:text-3xl">
                  {e.orgHref ? (
                    <a
                      href={e.orgHref}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {e.role}{" "}
                      <span className="serif-accent font-normal text-ink-dim">
                        · {e.org}
                      </span>
                    </a>
                  ) : (
                    <>
                      {e.role}{" "}
                      <span className="serif-accent font-normal text-ink-dim">
                        · {e.org}
                      </span>
                    </>
                  )}
                </h3>
                <div className="mt-4 text-[0.95rem] leading-relaxed text-ink-dim">
                  {e.body}
                </div>
                {e.chips && (
                  <ul
                    className="mt-5 flex flex-wrap gap-2"
                    aria-label="Technologies"
                  >
                    {e.chips.map((c) => (
                      <li
                        key={c}
                        className="rounded-full px-3 py-1 text-xs font-medium text-accent"
                        style={{ background: "var(--accent-soft)" }}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {e.shot && (
                <a
                  href={e.orgHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative hidden self-center overflow-hidden rounded-xl border border-line lg:block"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={e.shot}
                      alt={`${e.org} — screenshot`}
                      fill
                      sizes="360px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
