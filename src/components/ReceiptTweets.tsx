"use client";

import {
  ArrowUpRight,
  MoveRight,
  Pause,
  Play,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useReducedMotion,
  type PanInfo,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Story = {
  index: string;
  sortDate: string;
  label: string;
  date: string;
  title: string;
  result: string;
  description: string;
  sourceHref: string;
  sourceLabel: string;
  mediaSrc: string;
  mediaFit?: "cover" | "contain";
  mediaAlt: string;
  liveHref?: string;
  liveLabel?: string;
};

function recentFirst<T extends { sortDate: string }>(items: T[]) {
  return [...items].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

const STORIES: Story[] = recentFirst<Omit<Story, "index">>([
  {
    sortDate: "2026-07-01",
    label: "Current chapter",
    date: "Jul 2026",
    title: "BOSS! × Sarvam",
    result: "Accepted into the AI Startup Program.",
    description:
      "Accepted into Sarvam's AI Startup Program five days before launch. Their voice stack is exactly what BOSS needed.",
    sourceHref: "https://x.com/JayBosshq/status/2083173402932851055",
    sourceLabel: "Acceptance post",
    mediaSrc: "/images/receipts/receipt-HOjrKksbMAAX9aW.jpg",
    mediaAlt:
      "BOSS acceptance into the Sarvam AI Startup Program, shared by Jay.",
    liveHref: "https://bosshq.in",
    liveLabel: "Visit BOSS!",
  },
  {
    sortDate: "2025-08-07",
    label: "Built → won → hired",
    date: "Aug 2025",
    title: "Recall + Gaia",
    mediaFit: "cover",
    result: "9th · $1,500 → a full-time job",
    description:
      "I built the agent for the competition. Xtheo hired me to keep building it.",
    sourceHref: "https://x.com/JayBosshq/status/1953448415242723438",
    sourceLabel: "Original post",
    mediaSrc:
      "/images/receipts/receipt-GxwK9KaQAEavmf.jpg",
    mediaAlt:
      "Media attached to Jay's Recall and Gaia competition result announcement.",
  },
  {
    sortDate: "2025-04-04",
    label: "Official result",
    date: "Apr 2025",
    title: "VixDex",
    result: "Uniswap Foundation prize winner.",
    description:
      "Two months building a volatility-trading hook. Atrium published the winners; the product is still online.",
    sourceHref: "https://x.com/AtriumAcademy/status/1908207881486475538",
    sourceLabel: "Atrium result",
    mediaSrc: "/images/receipts/receipt-GntQ9HgbYAAfQqf.jpg",
    mediaAlt:
      "Atrium Academy's published Uniswap Foundation prize winners graphic listing VixDex.",
    liveHref: "https://vixdex.vercel.app",
    liveLabel: "Open VixDex",
  },
]).map((story, index) => ({
  ...story,
  index: String(index + 1).padStart(2, "0"),
}));

const LEDGER = recentFirst([
  {
    sortDate: "2024-12-05",
    date: "Dec 2024",
    title: "Polkadot Hacker House",
    result: "$300 product bounty",
    source: "X / original post",
    href: "https://x.com/JayBosshq/status/1864403099470975119",
    mediaSrc: "/images/receipts/receipt-Gdwttja0AITK3P.jpg",
    mediaAlt:
      "Photograph attached to Jay's Polkadot Hacker House bounty post.",
    mediaPosition: null,
  },
  {
    sortDate: "2024-10-28",
    date: "Oct 2024",
    title: "TON Hackathon Bootcamp",
    result: "2nd · $1,500",
    source: "X / original post",
    href: "https://x.com/JayBosshq/status/1850824819966669220",
    mediaSrc: "/images/receipts/receipt-Ga9zVMagAAMf2q.jpg",
    mediaAlt:
      "Photograph attached to Jay's TON Hackathon Bootcamp result post.",
    mediaPosition: null,
  },
  {
    sortDate: "2024-08-29",
    date: "On record",
    title: "LEDGESYS Software Pvt Ltd",
    result: "Incorporated · director record",
    source: "Company registry",
    href: "https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4",
    mediaSrc: "/images/receipts/ledgesys-itnt.jpg",
    mediaAlt:
      "Jayanth Koppala with a Souldem collaborator at the iTNT Hub in Chennai.",
    mediaPosition: "center",
  },
]).map((item, index) => ({
  ...item,
  index: String(index + 4).padStart(2, "0"),
}));

const ROOMS = recentFirst([
  {
    sortDate: "2024-03-08",
    org: "Aleo Chandigarh zkMeetup",
    role: "Event host · Chandigarh",
    source: "Event post · LinkedIn",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7171564639317680128/",
    mediaSrc: "/images/receipts/aleo-chandigarh-host.jpg",
    mediaAlt:
      "Jayanth Koppala at the podium while hosting the Aleo Chandigarh zkMeetup in Chandigarh, with The Phoenix Guild branding on screen.",
    mediaPosition: "center 20%",
  },
  {
    sortDate: "2024-02-10",
    org: "IEEE Chandigarh University",
    role: "Appointed Executive Member",
    source: "Appointment post · LinkedIn",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7162122191340290048/",
    mediaSrc: "/images/receipts/ieee-chandigarh-university.jpg",
    mediaAlt:
      "Jayanth Koppala addressing attendees with a microphone at an IEEE Chandigarh University event.",
    mediaPosition: "center 34%",
  },
  {
    sortDate: "2023-11-25",
    org: "The Phoenix Guild",
    role: "Hosted a founder team-formation session · Chandigarh",
    source: "Session post · LinkedIn",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7134208457670336512/",
    mediaSrc:
      "/images/receipts/receipt-tpg-session.jpg",
    mediaAlt:
      "The Phoenix Guild Chandigarh community session hosted by Jay.",
    mediaPosition: null,
  },
]).map((room, index) => ({
  ...room,
  index: `R${index + 1}`,
}));

function SourceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/link inline-flex min-h-11 items-center gap-2 border-b border-line text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink transition-[border-color,color,transform] duration-200 hover:border-ink hover:text-ink active:scale-[0.96] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        strokeWidth={1.8}
      />
    </a>
  );
}

function useMediaQuery(queryText: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(queryText);
    const update = () => setMatches(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [queryText]);

  return matches;
}

function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

type AutoLaneState = {
  direction: 1 | -1;
  holdUntil: number;
  initialized: boolean;
  position: number;
};

function stepAutoLane(
  lane: HTMLUListElement | null,
  state: AutoLaneState,
  time: number,
  delta: number,
  speed: number,
  initialHold: number
) {
  if (!lane) return;

  const maxScroll = lane.scrollHeight - lane.clientHeight;
  if (maxScroll <= 1) return;

  if (!state.initialized) {
    lane.scrollTop = 0;
    state.position = 0;
    state.direction = 1;
    state.initialized = true;
    state.holdUntil = time + initialHold;
    return;
  }

  if (time < state.holdUntil) return;

  const distance = (speed * Math.min(delta, 32)) / 1000;
  if (Math.abs(lane.scrollTop - state.position) > 2) {
    state.position = lane.scrollTop;
  }
  const nextScroll = state.position + state.direction * distance;

  if (nextScroll >= maxScroll) {
    state.position = maxScroll;
    lane.scrollTop = maxScroll;
    state.direction = -1;
    state.holdUntil = time + 750;
    return;
  }

  if (nextScroll <= 0) {
    state.position = 0;
    lane.scrollTop = 0;
    state.direction = 1;
    state.holdUntil = time + 750;
    return;
  }

  state.position = nextScroll;
  lane.scrollTop = nextScroll;
}

function ReceiptCardFace({
  story,
  active = false,
}: {
  story: Story;
  active?: boolean;
}) {
  return (
    <>
      <span className="relative min-h-0 flex-1 overflow-hidden rounded-[1.15rem] bg-[var(--surface-inset)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={story.mediaSrc}
          alt={active ? story.mediaAlt : ""}
          draggable="false"
          className={`h-full w-full select-none object-center outline -outline-offset-1 outline-black/10 transition-transform duration-500 ease-out motion-reduce:transition-none dark:outline-white/10 ${
            story.mediaFit === "cover" ? "object-cover" : "object-contain"
          } ${active ? "group-hover/card:scale-[1.012] motion-reduce:transform-none" : ""}`}
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-line bg-[var(--bg-card)] px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-ink-dim shadow-sm">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {active ? "browse receipt" : "up next"}
        </span>
      </span>
      <span className="grid min-h-[5.5rem] grid-cols-[auto_minmax(0,1fr)] items-center gap-4 px-3 sm:min-h-[6rem] sm:px-4">
        <span className="font-mono text-[0.68rem] tabular-nums text-accent">
          {story.index}
        </span>
        <span className="min-w-0">
          <span
            className="block truncate text-2xl uppercase leading-none text-ink sm:text-[2rem]"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            {story.title}
          </span>
          <span className="mt-1 block truncate text-xs text-ink-dim sm:text-sm">
            {story.result}
          </span>
        </span>
      </span>
    </>
  );
}

const RECEIPT_DWELL_MS = 6000;

function InteractiveProofDeck({ reduceMotion }: { reduceMotion: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [deckPaused, setDeckPaused] = useState(false);
  const draggedRef = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const activeStory = STORIES[activeIndex];

  const goTo = (index: number, nextDirection?: number) => {
    const normalized = (index + STORIES.length) % STORIES.length;
    if (normalized === activeIndex) return;
    setDirection(nextDirection ?? (normalized > activeIndex ? 1 : -1));
    setActiveIndex(normalized);
  };

  const cycle = (step: number) => goTo(activeIndex + step, step);

  /** Auto-advance: hands the reader the next receipt without asking.
   *  Restarts on any manual move; holds while hovered, focused or dragging. */
  useEffect(() => {
    if (reduceMotion || deckPaused) return;
    const id = window.setTimeout(() => {
      setDirection(1);
      setActiveIndex((i) => (i + 1) % STORIES.length);
    }, RECEIPT_DWELL_MS);
    return () => window.clearTimeout(id);
  }, [activeIndex, deckPaused, reduceMotion]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const width = stageRef.current?.clientWidth ?? 512;
    const threshold = Math.min(92, width * 0.18);
    const hasIntent =
      Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > 650;

    if (hasIntent) {
      const movement = info.offset.x || info.velocity.x;
      cycle(movement < 0 ? 1 : -1);
    }
    window.setTimeout(() => {
      draggedRef.current = false;
    }, 0);
  };

  return (
    <motion.section
      aria-label="Interactive featured receipts"
      initial={reduceMotion ? false : { opacity: 0, y: 16, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0 : 0.58, ease: EASE }}
    >
      <div className="mb-5 flex items-center justify-between gap-4 border-y border-line py-3 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink-dim">
        <span>Drag the receipts</span>
        <span className="inline-flex items-center gap-2">
          {finePointer ? "Click a card or the dots" : "Swipe or tap"}
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { x: 0 }}
            whileInView={reduceMotion ? undefined : { x: [0, 5, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            →
          </motion.span>
        </span>
      </div>

      <div className="grid min-w-0 gap-9 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:items-center lg:gap-11">
        <div
          ref={stageRef}
          onPointerEnter={() => setDeckPaused(true)}
          onPointerLeave={() => setDeckPaused(false)}
          onFocusCapture={() => setDeckPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setDeckPaused(false);
            }
          }}
          className="relative mx-auto w-full max-w-[34rem] pb-8"
        >
          <span
            aria-hidden="true"
            className="block aspect-square w-[calc(100%_-_2rem)] sm:w-[calc(100%_-_2.5rem)]"
          />
          {[2, 1].map((depth) => {
            const story = STORIES[(activeIndex + depth) % STORIES.length];
            const x = depth === 1 ? 14 : -8;
            const y = depth === 1 ? 16 : 32;
            const rotation = depth === 1 ? 2.4 : -2.1;

            return (
              <motion.div
                key={`${story.index}-${depth}`}
                aria-hidden="true"
                initial={false}
                animate={{
                  x,
                  y,
                  rotate: rotation,
                  scale: depth === 1 ? 0.955 : 0.91,
                  opacity: depth === 1 ? 0.84 : 0.64,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 320, damping: 28, mass: 0.72 }
                }
                style={{ zIndex: 3 - depth, transformOrigin: "88% 88%" }}
                className="pointer-events-none absolute left-0 top-0 flex aspect-square w-[calc(100%_-_2rem)] flex-col rounded-[1.65rem] bg-[var(--bg-card)] p-2 text-left shadow-[var(--desk-shadow)] sm:w-[calc(100%_-_2.5rem)]"
              >
                <ReceiptCardFace story={story} />
              </motion.div>
            );
          })}

          <motion.button
            type="button"
            aria-label={`${activeStory.index}. ${activeStory.title}. ${activeStory.result} Show the next receipt.`}
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            dragSnapToOrigin
            onDragStart={() => {
              draggedRef.current = true;
            }}
            onDragEnd={handleDragEnd}
            onClick={() => {
              if (draggedRef.current) return;
              cycle(1);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                cycle(1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                cycle(-1);
              }
              if (event.key === "Home") {
                event.preventDefault();
                goTo(0, -1);
              }
              if (event.key === "End") {
                event.preventDefault();
                goTo(STORIES.length - 1, 1);
              }
            }}
            initial={false}
            animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
            whileHover={
              finePointer && !reduceMotion ? { y: -2, rotate: 0.35 } : undefined
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 28, mass: 0.72 }
            }
            style={{ zIndex: 3, touchAction: "pan-y", transformOrigin: "88% 88%" }}
            className={`group/card absolute left-0 top-0 flex aspect-square w-[calc(100%_-_2rem)] flex-col rounded-[1.65rem] bg-[var(--bg-card)] p-2 text-left shadow-[var(--desk-shadow)] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg sm:w-[calc(100%_-_2.5rem)] ${
              finePointer && !reduceMotion
                ? "cursor-grab active:cursor-grabbing"
                : "cursor-pointer"
            }`}
          >
            <motion.span
              key={activeStory.index}
              initial={reduceMotion ? false : { opacity: 0.35, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: EASE }}
              className="flex h-full min-h-0 w-full flex-col"
            >
              <ReceiptCardFace story={activeStory} active />
            </motion.span>
          </motion.button>
        </div>

        <div className="flex min-w-0 flex-col border-y border-line py-6 sm:min-h-[29rem] sm:py-8 lg:min-h-[34rem]">
          <div className="flex items-center justify-between gap-5">
            <div aria-label="Choose a featured receipt" className="flex gap-2">
              {STORIES.map((story, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={story.index}
                    type="button"
                    aria-label={`Show ${story.title}`}
                    aria-pressed={selected}
                    onClick={() => goTo(index)}
                    className={`relative grid size-11 place-items-center rounded-full font-mono text-[0.65rem] tabular-nums transition-[color,transform] duration-200 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      selected ? "text-bg" : "text-ink-dim hover:text-ink"
                    }`}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="active-receipt-selector"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", duration: 0.35, bounce: 0 }
                        }
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full ring-1 ring-inset ring-line"
                      />
                    )}
                    <span className="relative">{story.index}</span>
                  </button>
                );
              })}
            </div>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.13em] text-ink-dim">
              {activeStory.date}
            </span>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Receipt {activeIndex + 1} of {STORIES.length}: {activeStory.title}.{" "}
            {activeStory.result}
          </p>

          <div className="relative mt-8 flex-1">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={activeStory.index}
                custom={direction}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: direction > 0 ? 12 : -12, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  reduceMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        y: direction > 0 ? -8 : 8,
                        filter: "blur(4px)",
                        transition: { duration: 0.16, ease: "easeIn" },
                      }
                }
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: EASE }}
              >
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-dim">
                  <span className="mr-2 text-accent">{activeStory.index}</span>
                  {activeStory.label}
                </p>
                <h3
                  className="mt-7 text-balance text-[3.25rem] uppercase leading-[0.88] tracking-[0.01em] text-ink sm:text-6xl lg:text-[4.1rem]"
                  style={{ fontFamily: "var(--font-anton)" }}
                >
                  {activeStory.title}
                </h3>
                <p className="serif-accent mt-4 max-w-md text-balance text-[1.65rem] leading-[1.05] text-ink sm:text-[2rem]">
                  {activeStory.result}
                </p>
                <p className="mt-5 max-w-md text-pretty text-[0.95rem] leading-relaxed text-ink-dim sm:text-base">
                  {activeStory.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                  <SourceLink href={activeStory.sourceHref}>
                    {activeStory.sourceLabel}
                  </SourceLink>
                  {activeStory.liveHref && activeStory.liveLabel ? (
                    <SourceLink href={activeStory.liveHref}>
                      {activeStory.liveLabel}
                    </SourceLink>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.section>
  );
}

type EvidenceCardProps = {
  index: string;
  eyebrow: string;
  title: string;
  detail: string;
  source: string;
  href: string;
  mediaSrc: string;
  mediaAlt: string;
  mediaPosition?: string | null;
  rotation: number;
  reduceMotion: boolean;
};

function EvidenceCard({
  index,
  eyebrow,
  title,
  detail,
  source,
  href,
  mediaSrc,
  mediaAlt,
  mediaPosition,
  rotation,
  reduceMotion,
}: EvidenceCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={reduceMotion ? undefined : { y: -3, rotate: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2, ease: EASE }}
      style={{ rotate: reduceMotion ? 0 : rotation }}
      data-reel-card
      className="group/reel flex h-[27rem] w-full flex-col overflow-hidden rounded-[1.4rem] bg-[var(--bg-card)] p-2 text-left shadow-[var(--desk-shadow)] ring-1 ring-inset ring-line outline-none sm:h-[28rem] lg:h-[27rem] xl:h-[28rem] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
    >
      <span className="relative block h-[13rem] shrink-0 overflow-hidden rounded-[1rem] bg-[var(--surface-inset)] sm:h-[14.5rem] lg:h-[13.5rem] xl:h-[15rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaSrc}
          alt={mediaAlt}
          draggable="false"
          loading="lazy"
          style={{ objectPosition: mediaPosition ?? "center" }}
          className="h-full w-full select-none object-cover outline -outline-offset-1 outline-black/10 transition-transform duration-500 ease-out group-hover/reel:scale-[1.012] motion-reduce:transform-none motion-reduce:transition-none dark:outline-white/10"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-line bg-[var(--bg-card)] px-3 py-2 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink-dim shadow-sm">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          linked
        </span>
      </span>

      <span className="flex min-h-0 flex-1 flex-col px-3 pb-3 pt-4 sm:px-4">
        <span className="flex items-center justify-between gap-4 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-ink-dim">
          <span>
            <span className="mr-2 text-accent">{index}</span>
            {eyebrow}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 transition-transform duration-200 group-hover/reel:translate-x-0.5 group-hover/reel:-translate-y-0.5 group-hover/reel:text-ink"
            strokeWidth={1.7}
          />
        </span>
        <span
          className="mt-4 block text-[1.65rem] uppercase leading-[0.95] text-ink sm:text-[1.85rem] xl:text-[2rem]"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          {title}
        </span>
        <span className="mt-2 line-clamp-2 text-sm leading-snug text-ink-dim">
          {detail}
        </span>
        <span className="mt-auto pt-4 font-mono text-[0.56rem] uppercase tracking-[0.13em] text-ink-dim">
          {source}
        </span>
      </span>
    </motion.a>
  );
}

function DualEvidenceReel({ reduceMotion }: { reduceMotion: boolean }) {
  const reelRef = useRef<HTMLElement>(null);
  const roomsRef = useRef<HTMLUListElement>(null);
  const ledgerRef = useRef<HTMLUListElement>(null);
  const roomsMotionRef = useRef<AutoLaneState>({
    direction: 1,
    holdUntil: 0,
    initialized: false,
    position: 0,
  });
  const ledgerMotionRef = useRef<AutoLaneState>({
    direction: 1,
    holdUntil: 0,
    initialized: false,
    position: 0,
  });
  const [manualPaused, setManualPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const desktopMotion = useMediaQuery(
    "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
  );
  const inView = useInView(reelRef, { amount: 0.12 });
  const motionEnabled = desktopMotion && !reduceMotion && inView;
  const paused = manualPaused || interactionPaused;

  useEffect(() => {
    roomsMotionRef.current = {
      direction: 1,
      holdUntil: 0,
      initialized: false,
      position: 0,
    };
    ledgerMotionRef.current = {
      direction: 1,
      holdUntil: 0,
      initialized: false,
      position: 0,
    };
  }, [motionEnabled]);

  useAnimationFrame((time, delta) => {
    if (!motionEnabled || paused || document.hidden) return;

    stepAutoLane(
      roomsRef.current,
      roomsMotionRef.current,
      time,
      delta,
      28,
      250
    );
    stepAutoLane(
      ledgerRef.current,
      ledgerMotionRef.current,
      time,
      delta,
      34,
      180
    );
  });

  return (
    <motion.section
      ref={reelRef}
      aria-label="More public records and community rooms"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}
      onFocusCapture={(event) => {
        if ((event.target as HTMLElement).closest("[data-reel-card]")) {
          setInteractionPaused(true);
        }
      }}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget as HTMLElement | null;
        if (!nextTarget?.closest("[data-reel-card]")) {
          setInteractionPaused(false);
        }
      }}
      onTouchStart={() => setInteractionPaused(true)}
      onTouchEnd={() => setInteractionPaused(false)}
      onTouchCancel={() => setInteractionPaused(false)}
      data-reel-paused={paused ? "true" : "false"}
      className="rounded-[1.75rem] border border-line bg-[var(--surface-inset)] p-3 sm:p-5 lg:p-6"
    >
      <div className="mb-4 hidden min-h-11 items-center justify-end lg:flex">
        {desktopMotion && !reduceMotion ? (
          <button
            type="button"
            aria-pressed={manualPaused}
            onClick={() => setManualPaused((value) => !value)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-ink-dim ring-1 ring-inset ring-line transition-[background-color,color,transform] duration-200 hover:bg-[var(--surface-hover)] hover:text-ink active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {manualPaused ? (
              <Play aria-hidden="true" className="size-3.5" fill="currentColor" />
            ) : (
              <Pause aria-hidden="true" className="size-3.5" fill="currentColor" />
            )}
            {manualPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
          </button>
        ) : null}
      </div>

      <div className="grid min-w-0 gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-0 lg:divide-x lg:divide-line">
        <section aria-labelledby="rooms-title" className="min-w-0 lg:pr-6 xl:pr-8">
          <div className="mb-5 flex min-h-[4.75rem] items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <p className="kicker !text-ink-dim">The rooms</p>
              <h3
                id="rooms-title"
                className="mt-2 text-3xl uppercase leading-none text-ink sm:text-4xl"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                I helped hold them.
              </h3>
            </div>
            <motion.span
              aria-hidden="true"
              className="hidden font-mono text-sm text-ink-dim lg:block"
              animate={
                motionEnabled && !paused ? { y: [-2, 2, -2] } : { y: 0 }
              }
              transition={{
                duration: 1.4,
                repeat: motionEnabled && !paused ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              ↕
            </motion.span>
          </div>

          <div
            className="-mx-3 overflow-hidden px-3 lg:mx-0 lg:overflow-visible lg:px-0"
            style={
              { "--reel-duration": "46s" } as React.CSSProperties
            }
          >
          <ul
            ref={roomsRef}
            className="reel-track flex w-max gap-4 px-1 pb-3 lg:block lg:h-[36rem] lg:w-auto lg:space-y-5 lg:overflow-x-hidden lg:overflow-y-auto lg:overscroll-contain lg:pb-0 xl:h-[40rem]"
          >
            {[...ROOMS, ...ROOMS].map((room, index) => (
              <li
                key={`${room.index}-${index}`}
                aria-hidden={index >= ROOMS.length ? true : undefined}
                className="w-[78vw] max-w-[23rem] shrink-0 sm:w-[21rem] lg:w-auto lg:max-w-none"
              >
                <EvidenceCard
                  index={room.index}
                  eyebrow="Community room"
                  title={room.org}
                  detail={room.role}
                  source={room.source}
                  href={room.href}
                  mediaSrc={room.mediaSrc}
                  mediaAlt={room.mediaAlt}
                  mediaPosition={room.mediaPosition}
                  rotation={index % 2 === 0 ? -0.38 : 0.32}
                  reduceMotion={reduceMotion}
                />
              </li>
            ))}
          </ul>
          </div>
        </section>

        <section
          aria-labelledby="proof-ledger-title"
          className="min-w-0 lg:pl-6 xl:pl-8"
        >
          <div className="mb-5 flex min-h-[4.75rem] items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <p className="kicker !text-ink-dim">The proof ledger</p>
              <h3
                id="proof-ledger-title"
                className="mt-2 text-3xl uppercase leading-none text-ink sm:text-4xl"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                More on record.
              </h3>
            </div>
            <motion.span
              aria-hidden="true"
              className="hidden font-mono text-sm text-ink-dim lg:block"
              animate={
                motionEnabled && !paused ? { y: [2, -2, 2] } : { y: 0 }
              }
              transition={{
                duration: 1.25,
                repeat: motionEnabled && !paused ? Infinity : 0,
                ease: "easeInOut",
              }}
            >
              ↕
            </motion.span>
          </div>

          <div
            className="-mx-3 overflow-hidden px-3 lg:mx-0 lg:overflow-visible lg:px-0"
            style={
              {
                "--reel-duration": "38s",
                "--reel-direction": "reverse",
              } as React.CSSProperties
            }
          >
          <ul
            ref={ledgerRef}
            className="reel-track flex w-max gap-4 px-1 pb-3 lg:block lg:h-[36rem] lg:w-auto lg:space-y-5 lg:overflow-x-hidden lg:overflow-y-auto lg:overscroll-contain lg:pb-0 xl:h-[40rem]"
          >
            {[...LEDGER, ...LEDGER].map((item, index) => (
              <li
                key={`${item.index}-${index}`}
                aria-hidden={index >= LEDGER.length ? true : undefined}
                className="w-[78vw] max-w-[23rem] shrink-0 sm:w-[21rem] lg:w-auto lg:max-w-none"
              >
                <EvidenceCard
                  index={item.index}
                  eyebrow={item.date}
                  title={item.title}
                  detail={item.result}
                  source={item.source}
                  href={item.href}
                  mediaSrc={item.mediaSrc}
                  mediaAlt={item.mediaAlt}
                  mediaPosition={item.mediaPosition}
                  rotation={index % 2 === 0 ? 0.34 : -0.3}
                  reduceMotion={reduceMotion}
                />
              </li>
            ))}
          </ul>
          </div>
        </section>
      </div>
    </motion.section>
  );
}

export default function ReceiptTweets() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="min-w-0 space-y-14 sm:space-y-18">
      <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(14rem,0.56fr)_minmax(0,1.7fr)] xl:items-start xl:gap-16">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
          className="xl:sticky xl:top-28 xl:h-fit"
        >
          <div>
            <p className="kicker flex items-center gap-2 !text-ink-dim">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent"
              />
              05 / source-linked
            </p>
            <h2 id="receipts-title" className="mt-6 leading-none">
              <span
                className="block text-6xl uppercase tracking-[0.01em] text-ink sm:text-7xl xl:text-[5rem]"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                The
              </span>
              <span className="serif-accent -mt-2 block text-5xl text-accent sm:-mt-3 sm:text-6xl xl:text-[4.25rem]">
                receipts.
              </span>
            </h2>
          </div>

        </motion.header>

        <InteractiveProofDeck reduceMotion={reduceMotion} />
      </div>

      <DualEvidenceReel reduceMotion={reduceMotion} />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: reduceMotion ? 0 : 0.5 }}
        className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="serif-accent text-xl text-ink-dim">
          The full trail stays public.
        </p>
        <a
          href="https://x.com/JayBosshq"
          target="_blank"
          rel="noreferrer"
          className="group/trail inline-flex min-h-11 items-center gap-3 self-start text-sm font-semibold text-ink transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:self-auto"
        >
          Open the uncut archive
          <MoveRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover/trail:translate-x-1"
            strokeWidth={1.7}
          />
        </a>
      </motion.div>
    </div>
  );
}
