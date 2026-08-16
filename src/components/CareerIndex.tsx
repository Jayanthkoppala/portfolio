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

const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.55'/></svg>";

export default function CareerIndex({ entries }: { entries: CareerEntry[] }) {
  const [active, setActive] = useState(0);
  const plateRef = useRef<HTMLDivElement>(null);
  const e = entries[active];

  const onPointerMove = useCallback((ev: React.PointerEvent) => {
    const el = plateRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${ev.clientX - r.left}px`);
    el.style.setProperty("--my", `${ev.clientY - r.top}px`);
  }, []);

  const bay = (
    <div>
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
            </div>
    </div>
  );

  return (
    <div className="career-console mt-10">
      <style>{`
        .career-console {
          /* light: machined aluminum */
          --cc-plate-hi: #f1f2ef; --cc-plate-lo: #e2e4df;
          --cc-edge-hi: rgba(255,255,255,.9); --cc-edge-lo: rgba(255,255,255,.3);
          --cc-ring: rgba(0,0,0,.16); --cc-chamfer: rgba(255,255,255,.85);
          --cc-innerline: rgba(255,255,255,.5);
          --cc-cap-hi: #fbfcfa; --cc-cap-lo: #e8eae5;
          --cc-skirt: #b6bbb3; --cc-cap-shadow: rgba(0,0,0,.22);
          --cc-caplip: rgba(0,0,0,.12); --cc-captop: rgba(255,255,255,.9);
          --cc-engrave-ink: #4c564f;
          --cc-engrave-hi: rgba(255,255,255,.85); --cc-engrave-sh: rgba(0,0,0,.12);
          --cc-text: #55605a; --cc-text-strong: #171b19;
          --cc-led-off: #c9cec8; --cc-led-off-inset: rgba(0,0,0,.25);
          --cc-accent: #087f5b;
          --cc-screw-hi: #dcdfd9; --cc-screw-lo: #a9aea7;
          --cc-beam: rgba(255,255,255,.55);
          --cc-chip-hi: rgba(0,0,0,.07); --cc-chip-lo: rgba(0,0,0,.03);
          --cc-grain-opacity: .35;
        }
        .dark .career-console {
          /* dark: gunmetal */
          --cc-plate-hi: #0e1110; --cc-plate-lo: #0b0d0c;
          --cc-edge-hi: rgba(255,255,255,.10); --cc-edge-lo: rgba(255,255,255,.035);
          --cc-ring: rgba(0,0,0,.56); --cc-chamfer: rgba(255,255,255,.055);
          --cc-innerline: rgba(255,255,255,.03);
          --cc-cap-hi: #191d1b; --cc-cap-lo: #10130f;
          --cc-skirt: #050706; --cc-cap-shadow: rgba(0,0,0,.5);
          --cc-caplip: rgba(0,0,0,.5); --cc-captop: rgba(255,255,255,.07);
          --cc-engrave-ink: #93a49b;
          --cc-engrave-hi: rgba(255,255,255,.045); --cc-engrave-sh: rgba(0,0,0,.85);
          --cc-text: #9ab0a6; --cc-text-strong: #eef2ef;
          --cc-led-off: #1c211f; --cc-led-off-inset: rgba(0,0,0,.8);
          --cc-accent: #10b981;
          --cc-screw-hi: #232826; --cc-screw-lo: #0a0c0b;
          --cc-beam: rgba(255,255,255,.065);
          --cc-chip-hi: rgba(0,0,0,.5); --cc-chip-lo: rgba(0,0,0,.25);
          --cc-grain-opacity: .5;
        }
        .cc-plate {
          position: relative;
          border-radius: 2rem;
          border: 1px solid transparent;
          background:
            linear-gradient(180deg, var(--cc-plate-hi), var(--cc-plate-lo) 70%) padding-box,
            linear-gradient(135deg, var(--cc-edge-hi), var(--cc-edge-lo) 45%, transparent 80%) border-box;
          box-shadow:
            inset 0 0 0 1px var(--cc-innerline),
            inset 0 1px 0 var(--cc-chamfer),
            0 0 0 1px var(--cc-ring),
            0 4px 4px rgba(0,0,0,.1),
            0 32px 64px -32px rgba(0,0,0,.35);
          overflow: hidden;
        }
        .cc-grain {
          position: absolute; inset: 0; pointer-events: none; z-index: 3;
          background-image: url("${GRAIN}");
          background-size: 60px;
          opacity: var(--cc-grain-opacity); mix-blend-mode: overlay;
          animation: cc-noise .4s steps(1) infinite;
        }
        @media (min-width: 768px)  { .cc-grain { background-size: 80px; } }
        @media (min-width: 1200px) { .cc-grain { background-size: 100px; } }
        @keyframes cc-noise {
          0% { background-position: 0 0 } 25% { background-position: -18px 12px }
          50% { background-position: 11px -9px } 75% { background-position: -6px -14px }
        }
        .cc-beam {
          position: absolute; inset: 0; pointer-events: none; z-index: 2;
          background: var(--cc-beam);
          -webkit-mask-image: radial-gradient(280px 280px at var(--mx, 30%) var(--my, 20%), #000 0%, rgba(0,0,0,.55) 30%, rgba(0,0,0,.18) 50%, transparent 70%);
          mask-image: radial-gradient(280px 280px at var(--mx, 30%) var(--my, 20%), #000 0%, rgba(0,0,0,.55) 30%, rgba(0,0,0,.18) 50%, transparent 70%);
          mix-blend-mode: overlay;
        }
        .cc-corner {
          position: absolute; width: 9px; height: 9px; border-radius: 50%; z-index: 4;
          background: radial-gradient(circle at 35% 30%, var(--cc-screw-hi), var(--cc-screw-lo) 75%);
          box-shadow: inset 0 1px 1px rgba(255,255,255,.25), inset 0 -1px 1px rgba(0,0,0,.4), 0 1px 0 rgba(255,255,255,.1);
        }
        .cc-corner::after {
          content: ""; position: absolute; left: 1.5px; right: 1.5px; top: 50%; height: 1px;
          background: rgba(0,0,0,.45); transform: rotate(38deg);
        }
        .cc-engrave {
          color: var(--cc-engrave-ink);
          text-shadow: 0 1px 0 var(--cc-engrave-hi), 0 -1px 0 var(--cc-engrave-sh);
        }
        .cc-key {
          position: relative; width: 100%; text-align: left; cursor: pointer;
          appearance: none; border: 0; background: none; padding: 0 0 5px 0;
          outline: none;
        }
        .cc-cap {
          position: relative; display: flex; align-items: baseline; gap: 1rem;
          border-radius: 14px; padding: .8rem 1rem .85rem;
          background:
            linear-gradient(180deg, var(--cc-cap-hi), var(--cc-cap-lo) 85%) padding-box,
            linear-gradient(135deg, var(--cc-edge-hi), var(--cc-edge-lo) 55%, transparent) border-box;
          border: 1px solid transparent;
          box-shadow:
            inset 0 1px 0 var(--cc-captop),
            inset 0 -2px 3px var(--cc-caplip),
            0 5px 0 var(--cc-skirt),
            0 9px 16px var(--cc-cap-shadow);
          transform: translateY(0);
          transition: transform .18s cubic-bezier(.4,2.08,.55,.44), box-shadow .18s cubic-bezier(.4,2.08,.55,.44);
        }
        .cc-key:hover .cc-cap { transform: translateY(-1px); box-shadow: inset 0 1px 0 var(--cc-captop), inset 0 -2px 3px var(--cc-caplip), 0 6px 0 var(--cc-skirt), 0 11px 18px var(--cc-cap-shadow); }
        .cc-key.on .cc-cap, .cc-key:active .cc-cap {
          transform: translateY(4px);
          box-shadow: inset 0 1px 0 var(--cc-captop), inset 0 2px 4px var(--cc-caplip), 0 1px 0 var(--cc-skirt), 0 3px 8px var(--cc-cap-shadow);
        }
        .cc-key:focus-visible .cc-cap { outline: 2px solid var(--cc-accent); outline-offset: 3px; }
        .cc-led {
          width: 6px; height: 6px; border-radius: 50%; flex: none; align-self: center;
          background: var(--cc-led-off); box-shadow: inset 0 1px 1px var(--cc-led-off-inset);
          transition: background .2s, box-shadow .2s;
        }
        .cc-key.on .cc-led {
          background: var(--cc-accent);
          box-shadow: 0 0 6px rgba(16,185,129,.85), 0 0 12px rgba(16,185,129,.3);
        }
        .cc-name-on { color: var(--cc-accent); }
        .cc-text { color: var(--cc-text); }
        .cc-text-strong { color: var(--cc-text-strong); }
        .cc-accent { color: var(--cc-accent); }
        .cc-chip {
          background: linear-gradient(180deg, var(--cc-chip-hi), var(--cc-chip-lo));
          box-shadow: inset 0 1px 3px rgba(0,0,0,.25), inset 0 -1px 0 rgba(255,255,255,.1);
        }
        .cc-counter { background: var(--cc-accent); }
        .cc-screen {
          position: relative; border-radius: 14px; overflow: hidden;
          background: #050706;
          box-shadow:
            inset 0 2px 10px rgba(0,0,0,.85),
            inset 0 0 0 1px rgba(255,255,255,.045),
            0 1px 0 rgba(255,255,255,.15);
        }
        .cc-scan {
          position: absolute; inset: 0; pointer-events: none; z-index: 2;
          background: repeating-linear-gradient(rgba(0,0,0,.22) 0 1px, transparent 1px 3px);
          opacity: .5;
        }
        .cc-sweep {
          position: absolute; inset: 0; pointer-events: none; z-index: 3;
          background: linear-gradient(115deg, transparent 25%, rgba(255,255,255,.16) 44%, rgba(255,255,255,.03) 52%, transparent 70%);
          background-size: 240% 100%;
          background-position: 120% 0;
          animation: cc-sweep .8s cubic-bezier(.4,0,.2,1) both;
          mix-blend-mode: plus-lighter;
        }
        @keyframes cc-sweep { from { background-position: 120% 0 } to { background-position: -60% 0 } }
        @keyframes cc-fade { from { opacity: 0; transform: translateY(6px) } }
        .cc-fade { animation: cc-fade .28s ease; }
        @media (prefers-reduced-motion: reduce) {
          .cc-grain { animation: none; }
          .cc-sweep { animation: none; opacity: 0; }
          .cc-cap, .cc-key:hover .cc-cap { transition: none; }
          .cc-fade { animation: none; }
        }
      `}</style>

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
          <div className="flex flex-col gap-3" role="tablist" aria-label="Career chapters">
            {entries.map((c, i) => {
              const on = i === active;
              return (
                <div key={c.key}>
                <button
                  role="tab"
                  aria-selected={on}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
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
                    <div className="cc-fade pb-2 pt-1 lg:hidden">{bay}</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── the display bay (desktop column) ── */}
          <div className="hidden lg:block">{bay}</div>
        </div>
      </div>
    </div>
  );
}
