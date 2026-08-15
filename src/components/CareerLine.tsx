"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export type CareerLink = {
  label: string;
  href: string;
};

export type CareerScope = {
  label: string;
  detail: string;
};

export type CareerEntry = {
  key: string;
  label: string;
  period: string;
  periodLabel: string;
  role: string;
  org: string;
  orgHref?: string;
  status: string;
  outcome: string;
  body: React.ReactNode;
  stack?: string[];
  scope: CareerScope[];
  links?: CareerLink[];
  shot?: string;
  shotAlt?: string;
  shotHref?: string;
  shotCaption?: string;
  shotFit?: "cover" | "contain";
  flagship?: boolean;
};

function clampIndex(index: number, length: number) {
  return Math.max(0, Math.min(index, length - 1));
}

function compactRole(role: string) {
  if (role === "Founding Engineer") return "Founding Eng.";
  if (role === "Chief Technology Officer") return "CTO";
  if (role === "Full Stack Developer") return "Full Stack";
  return role;
}

export default function CareerLine({ entries }: { entries: CareerEntry[] }) {
  const [activeKey, setActiveKey] = useState(entries[0]?.key ?? "");
  const [direction, setDirection] = useState(1);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const active = Math.max(
    0,
    entries.findIndex((item) => item.key === activeKey)
  );
  const entry = entries[active];

  if (!entry) return null;

  const moreRecentEntry = entries[active - 1];
  const earlierEntry = entries[active + 1];

  const selectEntry = (index: number, moveFocus = false) => {
    const nextIndex = clampIndex(index, entries.length);
    if (nextIndex === active) return;

    setDirection(nextIndex > active ? 1 : -1);
    setActiveKey(entries[nextIndex].key);

    if (moveFocus) tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = index === entries.length - 1 ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = index === 0 ? entries.length - 1 : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = entries.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      selectEntry(nextIndex, true);
    }
  };

  const enterTransition = reduceMotion
    ? ({ duration: 0 } as const)
    : ({ type: "spring", duration: 0.32, bounce: 0 } as const);

  const preview = (
    item: CareerEntry | undefined,
    side: "newer" | "earlier"
  ) => {
    if (!item) {
      return <div aria-hidden className="hidden xl:block" />;
    }

    const isNewer = side === "newer";
    return (
      <motion.button
        type="button"
        aria-label={`Show ${item.role} at ${item.org}`}
        onClick={() => selectEntry(active + (isNewer ? -1 : 1))}
        whileHover={reduceMotion ? undefined : { x: isNewer ? 3 : -3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        className="career-side-preview group relative hidden min-h-full overflow-hidden rounded-[1.5rem] px-4 py-5 text-left outline-none transition-[background-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-accent xl:flex xl:flex-col"
      >
        <span className="flex items-center justify-between font-mono text-[0.56rem] uppercase tracking-[0.14em] text-ink-dim">
          {side}
          {isNewer ? (
            <ArrowLeft
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            />
          ) : (
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          )}
        </span>
        <span className="my-auto block">
          <span className="block text-balance text-lg font-semibold leading-tight text-ink">
            {item.label}
          </span>
          <span className="mt-2 block text-pretty text-xs leading-relaxed text-ink-dim">
            {item.role}
          </span>
          <span className="mt-4 block font-mono text-[0.52rem] uppercase leading-relaxed tracking-[0.08em] text-ink-dim">
            {item.period}
          </span>
        </span>
      </motion.button>
    );
  };

  return (
    <div className="career-line mt-3 sm:mt-4">
      <div className="career-index-meta mb-2 hidden items-end justify-between gap-4 sm:flex">
        <div>
          <p className="kicker !text-ink-dim">Career index</p>
          <p className="career-index-copy mt-1 text-sm text-ink-dim">
            Current work first. Pick a chapter.
          </p>
        </div>
        <p className="kicker shrink-0 text-right !text-ink-dim">
          2026 <span aria-hidden>→</span> 2022
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Career chapters, most recent first"
        className="career-tablist grid grid-cols-4 gap-px lg:grid-cols-7"
      >
        {entries.map((item, index) => {
          const selected = index === active;

          return (
            <button
              key={item.key}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`career-tab-${item.key}`}
              role="tab"
              type="button"
              aria-label={`${item.label}: ${item.role} at ${item.org}, ${item.periodLabel}`}
              aria-selected={selected}
              data-selected={selected}
              aria-controls="career-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => selectEntry(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className="career-index-tab group relative min-h-[3.25rem] min-w-0 px-1.5 py-2 text-center outline-none transition-[background-color,color,transform,box-shadow] duration-200 active:scale-[0.96] focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-accent sm:min-h-[4.75rem] sm:px-3 sm:text-left lg:min-h-[5.25rem]"
            >
              <span className="career-index-number-row hidden items-center justify-between gap-2 sm:flex">
                <span
                  className={`font-mono text-[0.58rem] tracking-[0.15em] transition-colors duration-200 ${
                    selected ? "text-accent" : "text-ink-dim"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.flagship ? (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-ink-dim">
                    <span className="relative size-1.5 rounded-full bg-accent">
                      {!reduceMotion ? (
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent" />
                      ) : null}
                    </span>
                    Now
                  </span>
                ) : null}
              </span>
              <span
                className={`career-index-company block text-[0.68rem] font-semibold leading-tight transition-colors duration-200 sm:mt-1 sm:text-[0.85rem] ${
                  selected ? "text-ink" : "text-ink-dim"
                }`}
              >
                {item.label}
              </span>
              <span className="career-index-role mt-1 block text-[0.49rem] font-medium leading-[1.2] text-ink-dim sm:text-[0.59rem]">
                <span className="sm:hidden">{compactRole(item.role)}</span>
                <span className="hidden sm:inline">{item.role}</span>
              </span>
              <span className="career-index-period mt-1 hidden font-mono text-[0.48rem] uppercase tracking-[0.06em] text-ink-dim md:block">
                {item.period}
              </span>
              <motion.span
                aria-hidden
                className="absolute inset-x-2 -bottom-px h-0.5 origin-left bg-accent sm:inset-x-3"
                animate={{ scaleX: selected ? 1 : 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }
                }
              />
            </button>
          );
        })}
      </div>

      <div className="career-stage relative mt-2.5 min-w-0 sm:mt-3">
        <p className="sr-only" aria-live="polite">
          {entry.role} at {entry.org} selected.
        </p>

        <div className="career-stage-grid grid min-w-0 gap-3 xl:grid-cols-[7.25rem_minmax(0,1fr)_7.25rem]">
          {preview(moreRecentEntry, "newer")}

          <div
            id="career-panel"
            role="tabpanel"
            aria-labelledby={`career-tab-${entry.key}`}
            className="min-w-0"
          >
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              <motion.article
                key={entry.key}
                custom={direction}
                initial={
                  reduceMotion ? false : { opacity: 0, x: direction * 10 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        x: direction * -6,
                        transition: { duration: 0.13 },
                      }
                }
                transition={enterTransition}
                className="career-chapter min-w-0 overflow-hidden rounded-[2rem] p-4 sm:p-5 lg:min-h-[clamp(20rem,calc(100svh-28rem),29rem)] lg:p-6 xl:p-7"
              >
                <div className="career-chapter-meta flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <p className="kicker !text-ink-dim">
                    {String(active + 1).padStart(2, "0")} / {entry.period}
                  </p>
                  <span aria-hidden className="h-px w-5 bg-line" />
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-ink-dim">
                    {entry.status}
                  </p>
                </div>

                <div className="career-chapter-heading mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <h3 className="career-chapter-role text-balance text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[0.98] tracking-[-0.04em] text-ink">
                    {entry.role}
                  </h3>
                  <p className="career-chapter-org serif-accent text-[clamp(1.25rem,2.5vw,2rem)] leading-none text-ink-dim">
                    at{" "}
                    {entry.orgHref ? (
                      <a
                        href={entry.orgHref}
                        target="_blank"
                        rel="noreferrer"
                        className="decoration-1 underline-offset-[0.12em] transition-[color,text-decoration-color] duration-200 hover:text-accent hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {entry.org}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      entry.org
                    )}
                  </p>
                </div>

                <div className="career-chapter-main mt-3 grid min-w-0 gap-3 md:grid-cols-[minmax(0,1.08fr)_minmax(15rem,0.92fr)] md:items-stretch lg:gap-5">
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.22, delay: 0.035 }
                    }
                    className="career-chapter-copy order-2 min-w-0 md:order-1 md:flex md:flex-col"
                  >
                    <p className="career-chapter-outcome text-balance text-[0.96rem] font-semibold leading-snug text-ink sm:text-lg">
                      {entry.outcome}
                    </p>

                    <div className="career-chapter-body mt-2 max-w-[64ch] text-pretty text-[0.8rem] leading-[1.55] text-ink-dim sm:text-[0.88rem] lg:text-[0.84rem]">
                      {entry.body}
                    </div>

                    {entry.links?.length ? (
                      <nav
                        aria-label={`${entry.org} chapter links`}
                        className="career-chapter-links mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-0 md:mt-auto"
                      >
                        {entry.links.map((link) => (
                          <a
                            key={`${entry.key}-${link.label}`}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="career-chapter-link group inline-flex min-h-11 items-center gap-1 text-[0.72rem] font-semibold text-ink underline decoration-line underline-offset-4 outline-none transition-[color,text-decoration-color,transform] duration-200 hover:text-accent hover:decoration-accent active:scale-[0.96] focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-accent sm:text-xs"
                          >
                            {link.label}
                            <ArrowUpRight
                              aria-hidden
                              className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              strokeWidth={1.8}
                            />
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ))}
                      </nav>
                    ) : null}
                  </motion.div>

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.22, delay: 0.07 }
                    }
                    className="career-chapter-visual order-1 min-h-[5.5rem] overflow-hidden rounded-[1rem] sm:min-h-[6.75rem] md:order-2 md:min-h-[10.5rem]"
                  >
                    {entry.shot ? (
                      <a
                        href={entry.shotHref ?? entry.links?.[0]?.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative block h-full min-h-[5.5rem] overflow-hidden rounded-[1rem] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:min-h-[6.75rem] md:min-h-[10.5rem]"
                      >
                        <Image
                          src={entry.shot}
                          alt={entry.shotAlt ?? ""}
                          width={1600}
                          height={1000}
                          sizes="(max-width: 767px) 100vw, 460px"
                          className={`h-full w-full ${
                            entry.shotFit === "contain"
                              ? "object-contain"
                              : "object-cover object-top"
                          } outline outline-1 -outline-offset-1 outline-black/10 transition-transform duration-300 group-hover:scale-[1.015] dark:outline-white/10`}
                        />
                        {entry.shotCaption ? (
                          <span className="career-chapter-caption absolute inset-x-2 bottom-2 flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-[0.62rem] leading-snug text-ink-dim">
                            <span>{entry.shotCaption}</span>
                            <ArrowUpRight aria-hidden className="size-3 shrink-0" />
                          </span>
                        ) : null}
                        <span className="sr-only">Open related page in a new tab</span>
                      </a>
                    ) : (
                      <div className="career-artifact relative flex h-full min-h-[5.5rem] flex-col justify-between overflow-hidden p-3 sm:min-h-[6.75rem] md:min-h-[10.5rem] md:p-4">
                        <span
                          aria-hidden
                          className="absolute -bottom-7 right-1 font-display text-[7rem] leading-none text-ink/[0.035] md:text-[9rem]"
                        >
                          {String(active + 1).padStart(2, "0")}
                        </span>
                        <div className="relative flex items-center justify-between gap-4">
                          <p className="kicker !text-ink-dim">Build path</p>
                          <span className="size-2 rounded-full bg-accent" />
                        </div>
                        <div className="relative">
                          <p className="text-balance text-xl font-bold tracking-[-0.035em] text-ink sm:text-2xl">
                            {entry.label}
                          </p>
                          <p className="mt-1 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-ink-dim">
                            {entry.scope.map((item) => item.label).join(" · ")}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                <dl className="career-chapter-scope mt-3 grid grid-cols-2 border-t border-line pt-2.5 sm:gap-x-4 md:grid-cols-4 lg:mt-4">
                  {entry.scope.map((item, index) => (
                    <motion.div
                      key={`${entry.key}-${item.label}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.2,
                              delay: 0.08 + index * 0.035,
                              ease: [0.2, 0.8, 0.2, 1],
                            }
                      }
                      className="min-w-0 border-line py-1.5 odd:pr-3 even:border-l even:pl-3 md:border-l md:px-3 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
                    >
                      <dt className="font-mono text-[0.52rem] font-semibold uppercase tracking-[0.11em] text-ink sm:text-[0.55rem]">
                        {item.label}
                      </dt>
                      <dd className="career-scope-detail mt-0.5 hidden text-pretty text-[0.62rem] leading-[1.35] text-ink-dim sm:block">
                        {item.detail}
                      </dd>
                    </motion.div>
                  ))}
                </dl>

                {entry.stack?.length ? (
                  <p className="career-chapter-stack mt-2 hidden border-t border-line pt-2 font-mono text-[0.53rem] uppercase leading-relaxed tracking-[0.08em] text-ink-dim md:block">
                    <span className="text-ink">Built with</span>
                    <span aria-hidden> — </span>
                    {entry.stack.join(" · ")}
                  </p>
                ) : null}
              </motion.article>
            </AnimatePresence>
          </div>

          {preview(earlierEntry, "earlier")}
        </div>
      </div>
    </div>
  );
}
