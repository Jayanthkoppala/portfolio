"use client";

/**
 * Desk board with Jay's content. The watch is the shared registration point:
 * its centre controls the three carved edges and the country selector below.
 */
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  MotionConfig,
  motion,
} from "motion/react";
import {
  ArrowUpRight,
  Check,
  CircleDot,
  Copy,
  ExternalLink,
  MapPin,
  MousePointer2,
  Sparkles,
} from "lucide-react";

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
import { useReducedMotionPreference } from "@/lib/use-reduced-motion";
import type { COBEOptions } from "cobe";

const GLOBE_CFG: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
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
    body: "Agents that finish the work without me in the loop. Chatbots just talk about it.",
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
  const [t, setT] = useState({ ist: "--:--" });
  useEffect(() => {
    const tick = () => {
      const fmt = (tz: string) =>
        new Intl.DateTimeFormat("en-GB", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
      setT({ ist: fmt("Asia/Kolkata") });
    };
    tick();
    const i = setInterval(tick, 30_000);
    return () => clearInterval(i);
  }, []);
  return t;
}

const CARD =
  "desk-surface group/desk relative isolate overflow-hidden rounded-[24px] ring-1 ring-inset transition-[box-shadow] duration-[260ms]";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

type DeskCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  contentClassName?: string;
  revealDelay?: number;
};

function DeskCard({
  children,
  className = "",
  contentClassName = "",
  revealDelay = 0,
  ...props
}: DeskCardProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionPreference();

  const moveLight = (
    clientX: number,
    clientY: number,
    pointerType: string
  ) => {
    if (reduceMotion || pointerType === "touch") return;
    const shell = shellRef.current;
    if (!shell) return;
    const bounds = shell.getBoundingClientRect();
    shell.style.setProperty("--desk-spot-x", `${clientX - bounds.left}px`);
    shell.style.setProperty("--desk-spot-y", `${clientY - bounds.top}px`);
    shell.style.setProperty("--desk-spot-opacity", "1");
  };

  return (
    <div
      ref={shellRef}
      className={`${CARD} ${className}`}
      onPointerMove={(event) =>
        moveLight(event.clientX, event.clientY, event.pointerType)
      }
      onPointerLeave={() =>
        shellRef.current?.style.setProperty("--desk-spot-opacity", "0.72")
      }
      {...props}
    >
      <span aria-hidden className="desk-card-light pointer-events-none absolute inset-0 z-0" />
      <motion.div
        className={`relative z-[1] h-full ${contentClassName}`}
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 14, filter: "blur(5px)" }
        }
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.52, delay: revealDelay, ease: PREMIUM_EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

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

type Zone = "UK" | "India" | "USA";

const ZONES: Array<{ name: Zone; code: string }> = [
  { name: "UK", code: "GB" },
  { name: "India", code: "IN" },
  { name: "USA", code: "US" },
];

function FlagIcon({ zone }: { zone: Zone }) {
  if (zone === "India") {
    return (
      <svg viewBox="0 0 24 16" aria-hidden className="h-3 w-[18px] overflow-hidden rounded-[2px] ring-1 ring-black/20">
        <path fill="#FF9933" d="M0 0h24v5.33H0z" />
        <path fill="#fff" d="M0 5.33h24v5.34H0z" />
        <path fill="#138808" d="M0 10.67h24V16H0z" />
        <circle cx="12" cy="8" r="1.45" fill="none" stroke="#1a4f9c" strokeWidth=".55" />
      </svg>
    );
  }

  if (zone === "UK") {
    return (
      <svg viewBox="0 0 24 16" aria-hidden className="h-3 w-[18px] overflow-hidden rounded-[2px] ring-1 ring-black/20">
        <path fill="#17365d" d="M0 0h24v16H0z" />
        <path stroke="#fff" strokeWidth="3.2" d="m0 0 24 16M24 0 0 16" />
        <path stroke="#cf2035" strokeWidth="1.35" d="m0 0 24 16M24 0 0 16" />
        <path fill="#fff" d="M0 5.5h24v5H0zM9.5 0h5v16h-5z" />
        <path fill="#cf2035" d="M0 6.5h24v3H0zM10.5 0h3v16h-3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" aria-hidden className="h-3 w-[18px] overflow-hidden rounded-[2px] ring-1 ring-black/20">
      <path fill="#fff" d="M0 0h24v16H0z" />
      {Array.from({ length: 7 }).map((_, index) => (
        <path key={index} fill="#c7353f" d={`M0 ${index * 2.46}h24v1.23H0z`} />
      ))}
      <path fill="#23447a" d="M0 0h10.5v8.6H0z" />
      <g fill="#fff">
        <circle cx="2" cy="2" r=".45" />
        <circle cx="5.2" cy="2" r=".45" />
        <circle cx="8.4" cy="2" r=".45" />
        <circle cx="3.6" cy="4.4" r=".45" />
        <circle cx="6.8" cy="4.4" r=".45" />
        <circle cx="2" cy="6.8" r=".45" />
        <circle cx="5.2" cy="6.8" r=".45" />
        <circle cx="8.4" cy="6.8" r=".45" />
      </g>
    </svg>
  );
}

function ZoneControls({
  zone,
  onSelect,
  mode,
}: {
  zone: Zone;
  onSelect: (zone: Zone) => void;
  mode: "inline" | "carved";
}) {
  return (
    <div
      role="group"
      aria-label="Preferred collaboration timezone"
      className={
        mode === "carved"
          ? "flex flex-col items-center gap-2.5"
          : "flex flex-col items-stretch gap-2"
      }
    >
      {ZONES.map((item) => {
        const active = item.name === zone;
        return (
          <button
            key={item.name}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(item.name)}
            className={`relative isolate flex h-11 min-w-24 items-center justify-center gap-2 overflow-hidden rounded-full px-4 text-sm transition-[color,transform] duration-[180ms] active:scale-[0.96] ${FOCUS_RING} ${
              active ? "font-semibold text-bg" : "text-ink-dim hover:text-ink"
            }`}
          >
            {active ? (
              <motion.span
                layoutId={`zone-active-${mode}`}
                className="absolute inset-0 -z-10 rounded-full bg-ink shadow-[0_9px_26px_rgba(233,238,234,0.15)]"
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              />
            ) : (
              <span className="absolute inset-0 -z-10 rounded-full bg-[var(--surface-control)] ring-1 ring-inset ring-ink/[0.09] transition-[background-color,box-shadow] duration-[180ms] hover:bg-ink/[0.065] hover:ring-ink/[0.16]" />
            )}
            <span>{item.name}</span>
            <FlagIcon zone={item.name} />
          </button>
        );
      })}
    </div>
  );
}

export default function Board() {
  const [tab, setTab] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const { ist } = useTimes();
  const topRef = useRef<HTMLDivElement>(null);
  const [cy, setCy] = useState<number | null>(null);
  const [zone, setZone] = useState<Zone>("India");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotionPreference();

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  const selectTabFromKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? TABS.length - 1
          : (index + (event.key === 'ArrowRight' ? 1 : -1) + TABS.length) %
            TABS.length;
    setTab(next);
    requestAnimationFrame(() => tabRefs.current[next]?.focus());
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState("idle"), 1800);
  };

  // The reference centre sits 25px below the top cards and 7px above the
  // lower cards. Measuring the row keeps that registration exact.
  useLayoutEffect(() => {
    const el = topRef.current;
    if (!el) return;
    const update = () => setCy(el.offsetHeight + 25);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        {/* ── top row ─────────────────────────────────────────── */}
        <div
          ref={topRef}
          className="grid gap-4 md:grid-cols-2 md:gap-6 xl:h-[455px] xl:grid-cols-[300px_minmax(0,1fr)_300px] xl:gap-8 [&>*]:min-w-0"
        >
          <DeskCard
            className="order-1 md:order-1 xl:order-none"
            contentClassName="flex flex-col p-6 sm:p-8"
            revealDelay={0.02}
          >
            <p className="kicker text-pretty">
              <span className="serif-accent mr-2 text-base normal-case text-ink">
                JK
              </span>
              full-stack engineer ·{" "}
              <span className="text-accent">building BOSS!</span>
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-balance">
              Jayanth{" "}
              <span className="serif-accent font-normal text-ink-dim">
                Koppala
              </span>
            </h3>
            <p className="kicker mt-2 flex items-center gap-1.5">
              <MapPin size={12} strokeWidth={1.7} aria-hidden />
              Bengaluru, IN · <span className="tabular-nums">{ist}</span>
            </p>
            <div className="relative my-4 flex flex-1 -translate-y-1 items-center justify-center">
              <div
                role="img"
                aria-label="Obsidian cube visualization."
                className="group/cube relative h-[168px] w-[168px] cursor-grab active:cursor-grabbing sm:h-[176px] sm:w-[176px]"
              >
                <span
                  aria-hidden
                  className="absolute inset-[18%] rounded-full bg-accent/[0.07] blur-3xl transition-opacity duration-300 group-hover/cube:opacity-100"
                />
                <Cube3D />
                <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--surface-tooltip)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-faint opacity-0 ring-1 ring-ink/[0.08] backdrop-blur transition-[opacity,transform] duration-[180ms] group-hover/cube:-translate-y-0.5 group-hover/cube:opacity-100">
                  drag to rotate
                </span>
              </div>
            </div>
            <div className="border-t border-ink/[0.07] pt-2.5">
              <div className="flex items-center justify-center text-ink-dim">
                {identity.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} profile`}
                    className={`group/social relative grid h-11 w-11 place-items-center rounded-full transition-[background-color,color,transform] duration-[180ms] hover:-translate-y-px hover:bg-ink/[0.045] hover:text-accent active:scale-[0.96] ${FOCUS_RING}`}
                  >
                    <SocialIcon name={social.label} />
                    <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 translate-y-1 rounded-md bg-[var(--surface-tooltip)] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink opacity-0 ring-1 ring-ink/[0.08] transition-[opacity,transform] duration-[180ms] group-hover/social:translate-y-0 group-hover/social:opacity-100 group-focus-visible/social:translate-y-0 group-focus-visible/social:opacity-100">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </DeskCard>

          <DeskCard
            className="bite-mid order-2 md:order-3 md:col-span-2 xl:order-none xl:col-span-1"
            contentClassName="p-6 sm:p-8 xl:pb-28"
            revealDelay={0.08}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/[0.025] text-ink-dim ring-1 ring-inset ring-ink/[0.09]">
                  <MousePointer2 size={16} strokeWidth={1.55} aria-hidden />
                </span>
                <span className="kicker whitespace-nowrap">products that act</span>
              </span>
              <p className="kicker hidden items-center gap-1.5 whitespace-nowrap sm:flex">
                philosophy
                <Sparkles size={12} strokeWidth={1.6} className="text-accent" aria-hidden />
              </p>
            </div>
            <div className="mt-6 grid gap-7 sm:grid-cols-[minmax(0,0.88fr)_minmax(260px,1.12fr)] sm:gap-8">
              <div>
                <h3 className="text-4xl font-bold leading-none tracking-tight text-balance">
                  Products
                </h3>
                <p className="serif-accent mt-1 text-3xl text-ink-dim">
                  that hold up.
                </p>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-dim text-pretty">
                  I sweat the screening call, the contract audit, the deploy.
                  The parts that have to hold when it matters.
                </p>
              </div>
              <div className="sm:-mt-2 sm:text-right">
                <div
                  role="tablist"
                  aria-label="Product philosophy"
                  className="flex gap-1 overflow-x-auto pb-1 sm:justify-end [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {TABS.map((item, index) => {
                    const active = index === tab;
                    return (
                      <button
                        ref={(element) => {
                          tabRefs.current[index] = element;
                        }}
                        key={item.key}
                        id={`desk-tab-${index}`}
                        role="tab"
                        type="button"
                        tabIndex={active ? 0 : -1}
                        aria-selected={active}
                        aria-controls="desk-tab-panel"
                        onClick={() => setTab(index)}
                        onKeyDown={(event) =>
                          selectTabFromKeyboard(event, index)
                        }
                        className={`relative isolate h-10 shrink-0 overflow-hidden rounded-full px-3.5 text-xs transition-[color,transform] duration-[180ms] active:scale-[0.96] ${FOCUS_RING} ${
                          active ? "text-accent" : "text-ink-dim hover:text-ink"
                        }`}
                      >
                        {active ? (
                          <motion.span
                            layoutId="desk-philosophy-active"
                            className="absolute inset-0 -z-10 rounded-full bg-accent/[0.11] ring-1 ring-inset ring-accent/45"
                            transition={{
                              type: "spring",
                              duration: 0.3,
                              bounce: 0,
                            }}
                          />
                        ) : (
                          <span className="absolute inset-0 -z-10 rounded-full ring-1 ring-inset ring-ink/[0.09] transition-[background-color,box-shadow] duration-[180ms] hover:bg-ink/[0.035] hover:ring-ink/[0.15]" />
                        )}
                        {item.key}
                      </button>
                    );
                  })}
                </div>
                <div className="min-h-[108px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={TABS[tab].key}
                      id="desk-tab-panel"
                      role="tabpanel"
                      aria-labelledby={`desk-tab-${tab}`}
                      initial={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: 7, filter: "blur(4px)" }
                      }
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: -4, filter: "blur(4px)" }
                      }
                      transition={{ duration: reduceMotion ? 0 : 0.24, ease: PREMIUM_EASE }}
                    >
                      <p className="mt-4 text-base font-semibold text-ink text-balance">
                        {TABS[tab].head}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-dim text-pretty">
                        {TABS[tab].body}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </DeskCard>

          <DeskCard
            className="order-3 md:order-2 xl:order-none"
            contentClassName="flex flex-col p-6 sm:p-8"
            revealDelay={0.14}
          >
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/[0.025] text-ink ring-1 ring-inset ring-ink/[0.09]">
                <CircleDot size={17} strokeWidth={1.55} aria-hidden />
              </span>
              <span className="flex h-9 items-center gap-2 rounded-full bg-[var(--surface-inset)] px-3 ring-1 ring-inset ring-ink/[0.09]">
                <span className="desk-status-halo relative flex h-2 w-2 rounded-full bg-accent" />
                <span className="kicker">shipping daily</span>
              </span>
            </div>
            <div className="mt-10">
              <h3 className="text-3xl font-black leading-[1.05] tracking-tight text-balance">
                LET&apos;S BUILD
                <br />
                SOMETHING
              </h3>
              <p className="serif-accent mt-1 text-2xl text-ink-dim">
                that actually ships.
              </p>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className={`group/copy mt-2 min-h-20 border-t border-ink/[0.07] pt-5 text-left transition-transform duration-[180ms] active:scale-[0.96] ${FOCUS_RING}`}
            >
              <span className="flex items-center gap-2.5">
                <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/[0.03] text-ink-dim ring-1 ring-inset ring-ink/[0.09] transition-[background-color,color] duration-[180ms] group-hover/copy:bg-accent/[0.1] group-hover/copy:text-accent">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copyState}
                      className="absolute grid place-items-center"
                      initial={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
                      }
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                      transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    >
                      {copyState === "copied" ? (
                        <Check size={15} strokeWidth={1.8} aria-hidden />
                      ) : (
                        <Copy size={15} strokeWidth={1.65} aria-hidden />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink transition-colors duration-[180ms] group-hover/copy:text-accent">
                  {identity.email}
                </span>
              </span>
              <span className="mt-2.5 block h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent via-[#6ee7b7] to-transparent transition-transform duration-300 group-hover/copy:scale-x-100" />
              <span
                aria-live="polite"
                className="kicker mt-2 block tracking-[0.24em]"
              >
                {copyState === "copied"
                  ? "email copied"
                  : copyState === "error"
                    ? "copy unavailable"
                    : "tap to copy email"}
              </span>
            </button>
            <a
              href={`mailto:${identity.email}`}
              className={`group/connect mt-auto flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-sm font-bold tracking-wide text-bg shadow-[0_10px_34px_rgba(18,20,19,0.16)] transition-[background-color,box-shadow,transform] duration-[180ms] hover:bg-ink/90 hover:shadow-[0_12px_38px_rgba(18,20,19,0.22)] active:scale-[0.96] dark:shadow-[0_10px_34px_rgba(233,238,234,0.13)] dark:hover:shadow-[0_12px_38px_rgba(233,238,234,0.2)] ${FOCUS_RING}`}
            >
              CONNECT NOW
              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                aria-hidden
                className="transition-transform duration-[180ms] group-hover/connect:translate-x-0.5 group-hover/connect:-translate-y-0.5"
              />
            </a>
          </DeskCard>
        </div>

        {/* ── the watch: measured center, concentric cuts, no arch ── */}
        {cy !== null && (
          <div
            className="absolute left-1/2 z-20 hidden xl:block"
            style={{ top: cy, transform: "translate(-50%, -50%)" }}
          >
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, scale: 0.955, rotate: -1.5 }
              }
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.72, delay: 0.18, ease: PREMIUM_EASE }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[374px] w-[374px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-ink/[0.08]"
              />
              <div className="relative rounded-full bg-bg p-1">
                <div className="rounded-full bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(255,255,255,0.01)_55%)] p-px">
                  <div
                    className="relative overflow-hidden rounded-full p-px"
                    style={{
                      background:
                        "radial-gradient(75% 75% at 50% 42%, #131614, #0a0c0b 74%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.9)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-10 rounded-full bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.045)_48%,transparent_61%)]"
                    />
                    <Watch size={300} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── bottom row: equal cards, with controls in the carved void ── */}
        <div className="relative mt-4 grid gap-4 md:grid-cols-2 md:gap-6 xl:mt-8 xl:h-[475px] xl:gap-8">
          <DeskCard
            className="bite-corner-r"
            contentClassName="relative min-h-[430px] overflow-hidden p-6 sm:p-8 xl:h-[475px] xl:min-h-0"
            revealDelay={0.2}
          >
            <p className="kicker">available globally</p>
            <h3 className="mt-2 text-2xl font-bold leading-tight text-balance">
              IST on paper,
              <br />
              awake on yours
            </h3>
            <div className="absolute -bottom-[160px] -left-[142px] z-0 h-[480px] w-[480px] sm:-bottom-[88px] sm:-left-[124px]">
              <Globe config={GLOBE_CFG} className="!max-w-none" />
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={zone}
                className="absolute z-10 flex items-center gap-1.5 rounded-md bg-bg/88 px-2.5 py-1.5 font-mono text-[11px] text-ink ring-1 ring-inset ring-ink/[0.1] backdrop-blur-md"
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 5, filter: "blur(3px)" }
                }
                animate={
                  zone === "India"
                    ? { opacity: 1, left: "42%", top: "72%", y: 0, filter: "blur(0px)" }
                    : zone === "UK"
                      ? { opacity: 1, left: "10%", top: "42%", y: 0, filter: "blur(0px)" }
                      : { opacity: 1, left: "2%", top: "57%", y: 0, filter: "blur(0px)" }
                }
                exit={{ opacity: 0, y: -4, filter: "blur(3px)" }}
                transition={{ duration: reduceMotion ? 0 : 0.36, ease: PREMIUM_EASE }}
              >
                <FlagIcon zone={zone} />
                {zone}
              </motion.span>
            </AnimatePresence>
            <div className="absolute bottom-5 right-5 z-20 xl:hidden">
              <ZoneControls zone={zone} onSelect={setZone} mode="inline" />
            </div>
          </DeskCard>

          <div className="absolute left-[calc(50%_-_88px)] top-[192px] z-30 hidden -translate-x-1/2 xl:block">
            <ZoneControls zone={zone} onSelect={setZone} mode="carved" />
            <div className="mt-[70px] text-center">
              <p className="kicker flex items-center justify-center gap-1.5">
                <MapPin size={12} strokeWidth={1.7} aria-hidden />
                remote
              </p>
              <p className="mt-0.5 text-lg font-semibold text-ink">India</p>
            </div>
          </div>

          <DeskCard
            className="group/founder bite-corner-l"
            contentClassName="relative min-h-[430px] overflow-hidden p-6 text-right sm:p-8 xl:h-[475px] xl:min-h-0"
            revealDelay={0.26}
          >
            <h3 className="text-3xl font-bold tracking-tight text-balance">
              Founder of{" "}
              <a
                href="https://bosshq.in"
                target="_blank"
                rel="noreferrer"
                className={`group/boss relative inline-flex min-h-11 items-center gap-1 ${FOCUS_RING}`}
              >
                <span className="serif-accent bg-gradient-to-r from-accent to-[#6ee7b7] bg-clip-text text-transparent">
                  BOSS!
                </span>
                <ExternalLink
                  size={14}
                  strokeWidth={1.7}
                  aria-hidden
                  className="text-accent opacity-0 transition-[opacity,transform] duration-[180ms] group-hover/boss:-translate-y-0.5 group-hover/boss:translate-x-0.5 group-hover/boss:opacity-100 group-focus-visible/boss:opacity-100"
                />
                <span className="absolute -bottom-1 left-0 h-px w-[calc(100%-18px)] origin-left scale-x-0 bg-gradient-to-r from-accent to-[#6ee7b7] transition-transform duration-200 group-hover/boss:scale-x-100 group-focus-visible/boss:scale-x-100" />
              </a>
            </h3>
            <p className="serif-accent mt-1 text-lg text-ink-faint">
              &lt; round-one hiring, done /&gt;
            </p>
            <div className="pointer-events-none absolute -bottom-7 -right-3 flex justify-end gap-2.5 sm:right-0 xl:right-4">
              <div className="w-[96px] -rotate-12 opacity-70 drop-shadow-[0_24px_30px_rgba(0,0,0,0.36)] transition-[transform,opacity] duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover/founder:-translate-y-1 group-hover/founder:-rotate-[14deg] group-hover/founder:opacity-85 sm:w-[108px] xl:w-[155px]">
                <Iphone src="/shots/boss-hero.png" className="size-full" />
              </div>
              <div className="z-10 w-[112px] drop-shadow-[0_28px_36px_rgba(0,0,0,0.45)] transition-transform duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover/founder:-translate-y-2 sm:w-[126px] xl:w-[180px]">
                <Iphone src="/shots/boss-hero.png" className="size-full" />
              </div>
              <div className="w-[96px] rotate-12 opacity-70 drop-shadow-[0_24px_30px_rgba(0,0,0,0.36)] transition-[transform,opacity] duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover/founder:-translate-y-1 group-hover/founder:rotate-[14deg] group-hover/founder:opacity-85 sm:w-[108px] xl:w-[155px]">
                <Iphone src="/shots/boss-hero.png" className="size-full" />
              </div>
            </div>
          </DeskCard>
        </div>
      </div>
    </MotionConfig>
  );
}
