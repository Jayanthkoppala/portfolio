"use client";

/**
 * THE CONSOLE — the career section as a machined instrument.
 * Research-derived materials (Linear / Active Theory / op.al teardowns):
 *  - four-layer carved bezel + gradient hairline border (no flat 1px borders)
 *  - cursor-tracked specular beam masked over the faceplate
 *  - additive (plus-lighter) emerald glow so light EMITS instead of fogging
 *  - animated film grain (steps(1) jitter) + scanlines on the display bay
 *  - companies as wide pressable keycaps: extruded skirt, engraved labels,
 *    LED dot, overshoot spring on release
 */
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { CareerEntry } from "@/types/career";

export default function CareerIndex({ entries }: { entries: CareerEntry[] }) {
  const [active, setActive] = useState(0);
  const plateRef = useRef<HTMLDivElement>(null);
  const e = entries[active];

  const keyRefs = useRef<Array<HTMLButtonElement | null>>([]);

  /** Roving focus: arrows move between chapters, Home/End jump to the ends. */
  const onTablistKeyDown = useCallback(
    (ev: React.KeyboardEvent) => {
      const last = entries.length - 1;
      const next =
        ev.key === "ArrowDown" || ev.key === "ArrowRight"
          ? Math.min(active + 1, last)
          : ev.key === "ArrowUp" || ev.key === "ArrowLeft"
            ? Math.max(active - 1, 0)
            : ev.key === "Home"
              ? 0
              : ev.key === "End"
                ? last
                : null;
      if (next === null) return;
      ev.preventDefault();
      setActive(next);
      keyRefs.current[next]?.focus();
    },
    [active, entries.length],
  );

  const onPointerMove = useCallback((ev: React.PointerEvent) => {
    const el = plateRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${ev.clientX - r.left}px`);
    el.style.setProperty("--my", `${ev.clientY - r.top}px`);
  }, []);

  /** The display bay. Rendered twice (mobile accordion + desktop column), so the
   *  caller supplies a unique id to keep the tab/panel pairing valid. */
  const renderBay = (idSuffix: string) => (
    <div
      id={`career-panel-${e.key}${idSuffix}`}
      role="tabpanel"
      aria-labelledby={`career-key-${e.key}`}
      tabIndex={0}
    >
            <div key={`s-${e.key}`} className="cc-screen aspect-[16/9]">
              {e.shot ? (
                e.shotHref ? (
                  <a href={e.shotHref} target="_blank" rel="noreferrer" className="block h-full">
                    <Image
                      src={e.shot}
                      alt={e.shotAlt ?? `${e.org} product`}
                      fill
                      sizes="(min-width:1024px) 500px, 92vw"
                      className={`${e.shotFit === "contain" ? "object-contain" : "object-cover"} object-top brightness-[.97]`}
                    />
                  </a>
                ) : (
                  <Image
                    src={e.shot}
                    alt={e.shotAlt ?? `${e.org} product`}
                    fill
                    sizes="(min-width:1024px) 500px, 92vw"
                    className={`${e.shotFit === "contain" ? "object-contain" : "object-cover"} object-top brightness-[.97]`}
                  />
                )
              ) : (
                <div className="grid h-full place-items-center">
                  <span
                    style={{ fontFamily: "var(--font-anton)" }}
                    className="cc-engrave text-6xl opacity-40"
                  >
                    {e.label.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="cc-scan" />
              <span key={`sw-${e.key}`} className="cc-sweep" />
            </div>

            <div key={`t-${e.key}`} className="cc-fade pt-4">
              <p className="flex items-center justify-between gap-4 font-mono text-[0.6rem] uppercase tracking-[0.16em]">
                <span className="cc-engrave">
                  <span className="cc-accent">
                    {e.period}
                  </span>{" "}
                  · {e.role}
                </span>
                {e.status ? <span className="cc-engrave opacity-60">{e.status.toLowerCase()}</span> : null}
              </p>
              <div className="cc-text mt-2.5 text-[0.86rem] leading-relaxed">
                <b className="cc-text-strong font-semibold">{e.outcome}</b> {e.body}
              </div>
              {e.links && e.links.length > 0 && (
                <div className="mt-1.5 flex flex-wrap items-center gap-x-6 gap-y-0">
                  {e.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link cc-engrave inline-flex min-h-10 items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 hover:!text-[color:var(--cc-accent)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {l.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        strokeWidth={1.8}
                      />
                    </a>
                  ))}
                </div>
              )}
              {e.stack && (
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Stack">
                  {e.stack.map((s) => (
                    <li
                      key={s}
                      className="cc-engrave cc-chip inline-flex h-[24px] items-center rounded-[6px] px-2 font-mono text-[10px] uppercase tracking-[0.06em]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              {e.scope.length > 0 && (
                <dl className="mt-4 grid grid-cols-1 gap-x-5 gap-y-2 border-t border-black/[0.07] pt-3 sm:grid-cols-2 dark:border-white/[0.05]">
                  {e.scope.map((item) => (
                    <div key={item.label} className="min-w-0">
                      <dt className="cc-engrave font-mono text-[0.55rem] font-semibold uppercase tracking-[0.14em]">
                        {item.label}
                      </dt>
                      <dd className="cc-text mt-0.5 text-[0.78rem] leading-snug">
                        {item.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
    </div>
  );

  return (
    <div className="career-console mt-10">

      <div ref={plateRef} className="cc-plate" onPointerMove={onPointerMove}>
        <div className="cc-beam" />
        <div className="cc-grain" />
        <span className="cc-corner left-3 top-3" />
        <span className="cc-corner right-3 top-3" />
        <span className="cc-corner bottom-3 left-3" />
        <span className="cc-corner bottom-3 right-3" />

        {/* ── engraved header strip ── */}
        <div className="relative z-[4] flex items-baseline justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.05] px-6 py-4 sm:px-8">
          <p className="cc-engrave font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em]">
            Career index <span className="hidden opacity-60 sm:inline">· module 07 · 2022 → now</span>
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em]">
            <span className="cc-counter rounded-[3px] px-1.5 py-0.5 font-bold text-[#0a0c0b]">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="cc-engrave"> / {String(entries.length).padStart(2, "0")}</span>
          </p>
        </div>

        <div className="relative z-[4] grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.02fr_0.98fr] lg:gap-9">
          {/* ── the keybank ── */}
          <div
            className="flex flex-col gap-3"
            role="tablist"
            aria-label="Career chapters"
            aria-orientation="vertical"
            onKeyDown={onTablistKeyDown}
          >
            {entries.map((c, i) => {
              const on = i === active;
              return (
                <div key={c.key}>
                <button
                  ref={(el) => {
                    keyRefs.current[i] = el;
                  }}
                  id={`career-key-${c.key}`}
                  role="tab"
                  aria-selected={on}
                  aria-controls={`career-panel-${c.key}`}
                  tabIndex={on ? 0 : -1}
                  aria-label={`${c.org} — ${c.role}, ${c.periodLabel}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`cc-key ${on ? "on" : ""}`}
                >
                  <span className="cc-cap">
                    <span className="cc-led" />
                    <span className="cc-engrave w-[7.4rem] flex-none whitespace-nowrap font-mono text-[0.55rem] uppercase tracking-[0.04em] opacity-80">
                      {c.period}
                    </span>
                    <span
                      style={{ fontFamily: "var(--font-anton)" }}
                      className={`whitespace-nowrap text-[clamp(1.25rem,2.1vw,1.7rem)] uppercase leading-none transition-colors duration-200 ${
                        on ? "cc-name-on" : "cc-engrave"
                      }`}
                    >
                      {c.label}
                    </span>
                    <span className="cc-engrave ml-auto hidden whitespace-nowrap font-mono text-[0.55rem] uppercase tracking-[0.12em] opacity-70 md:inline">
                      {c.role}
                    </span>
                  </span>
                </button>
                  {on && (
                    <div className="cc-fade pb-2 pt-1 lg:hidden">{renderBay("-m")}</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── the display bay (desktop column) ── */}
          <div className="hidden lg:block">{renderBay("")}</div>
        </div>
      </div>
    </div>
  );
}
