"use client";

import NumberFlow from "@number-flow/react";
import {
  ArrowUpRight,
  CalendarDays,
  Flame,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
} from "motion/react";
import {
  cloneElement,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";

import contributions from "@/data/contributions.json";
import { useReducedMotionPreference } from "@/lib/use-reduced-motion";

const GITHUB_HANDLE = "Jayanthkoppala";
const GITHUB_PROFILE = `https://github.com/${GITHUB_HANDLE}`;
const CONTRIBUTIONS_API =
  `https://github-contributions-api.jogruber.de/v4/${GITHUB_HANDLE}?y=last`;

const PALETTE = [
  "var(--activity-empty)",
  "var(--activity-level-1)",
  "var(--activity-level-2)",
  "var(--activity-level-3)",
  "var(--activity-level-4)",
] as const;

const longDate = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const shortDate = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

type ContributionSet = {
  data: Activity[];
  source: "live" | "snapshot";
  total: number;
};

type GraphTooltip = {
  activity: Activity;
  x: number;
  y: number;
};

function GitHubMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${className} fill-current`}
    >
      <path d="M12 .7A11.3 11.3 0 0 0 8.4 22.8c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.6 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C16.3 4.7 17.3 5 17.3 5c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.3-2.8 5.3-5.5 5.6.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}

function asDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function dateLabel(date: string, compact = false) {
  return (compact ? shortDate : longDate).format(asDate(date));
}

function activityLabel(activity: Activity) {
  const count = `${activity.count} contribution${activity.count === 1 ? "" : "s"}`;
  return `${count} on ${dateLabel(activity.date)}`;
}

function fallbackData(): Activity[] {
  const nonZeroCounts = contributions.days
    .map((day) => day.count)
    .filter(Boolean)
    .sort((a, b) => a - b);

  const threshold = (percentile: number) =>
    nonZeroCounts[
      Math.min(
        nonZeroCounts.length - 1,
        Math.floor((nonZeroCounts.length - 1) * percentile)
      )
    ] ?? 1;

  const steps = [threshold(0.25), threshold(0.5), threshold(0.75)];

  return contributions.days.map((day) => ({
    ...day,
    level:
      day.count === 0
        ? 0
        : day.count <= steps[0]
          ? 1
          : day.count <= steps[1]
            ? 2
            : day.count <= steps[2]
              ? 3
              : 4,
  }));
}

function parseLiveData(value: unknown): ContributionSet | null {
  if (!value || typeof value !== "object") return null;

  const response = value as {
    contributions?: unknown;
    total?: unknown;
  };
  if (!Array.isArray(response.contributions)) return null;

  const data: Activity[] = [];
  for (const item of response.contributions) {
    if (!item || typeof item !== "object") return null;
    const day = item as Record<string, unknown>;

    if (
      typeof day.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
      typeof day.count !== "number" ||
      !Number.isInteger(day.count) ||
      day.count < 0 ||
      typeof day.level !== "number" ||
      !Number.isInteger(day.level) ||
      day.level < 0 ||
      day.level > 4
    ) {
      return null;
    }

    data.push({ date: day.date, count: day.count, level: day.level });
  }

  if (data.length < 350) return null;
  data.sort((a, b) => a.date.localeCompare(b.date));

  const calculatedTotal = data.reduce((sum, day) => sum + day.count, 0);
  const totals =
    response.total && typeof response.total === "object"
      ? (response.total as Record<string, unknown>)
      : null;
  const liveTotal = totals?.lastYear;
  const total =
    typeof liveTotal === "number" && Number.isFinite(liveTotal)
      ? liveTotal
      : calculatedTotal;

  return { data, source: "live", total };
}

function calculateStats(data: Activity[]) {
  let longestStreak = 0;
  let currentStreak = 0;
  let peak = data[0] ?? { date: "", count: 0, level: 0 };

  for (const day of data) {
    currentStreak = day.count > 0 ? currentStreak + 1 : 0;
    longestStreak = Math.max(longestStreak, currentStreak);
    if (day.count > peak.count) peak = day;
  }

  return {
    activeDays: data.filter((day) => day.count > 0).length,
    longestStreak,
    peak,
  };
}

function moveCalendarFocus(
  event: KeyboardEvent<SVGRectElement>,
  activity: Activity,
  data: Activity[]
) {
  const offset =
    event.key === "ArrowLeft"
      ? -7
      : event.key === "ArrowRight"
        ? 7
        : event.key === "ArrowUp"
          ? -1
          : event.key === "ArrowDown"
            ? 1
            : 0;

  if (!offset) return;
  event.preventDefault();

  const currentIndex = data.findIndex((day) => day.date === activity.date);
  const next = data[Math.max(0, Math.min(data.length - 1, currentIndex + offset))];
  const svg = event.currentTarget.ownerSVGElement;
  const nextBlock = svg?.querySelector<SVGRectElement>(
    `[data-date="${next.date}"]`
  );

  event.currentTarget.setAttribute("tabindex", "-1");
  nextBlock?.setAttribute("tabindex", "0");
  nextBlock?.focus();
}

function Insight({
  detail,
  icon,
  label,
  reducedMotion,
  value,
}: {
  detail: string;
  icon: ReactNode;
  label: string;
  reducedMotion: boolean;
  value: number;
}) {
  return (
    <motion.div
      whileHover={reducedMotion ? undefined : { y: -1 }}
      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      className="group/stat min-w-0 px-2.5 py-3 transition-[background-color] duration-200 hover:bg-ink/[0.03] sm:px-4 sm:py-3.5 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-ink/[0.065]"
    >
      <dt className="flex items-center justify-between gap-1.5 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-dim sm:tracking-[0.15em]">
        <span>{label}</span>
        <span className="hidden text-ink-faint transition-[color,transform] duration-200 group-hover/stat:scale-105 group-hover/stat:text-accent sm:block">
          {icon}
        </span>
      </dt>
      <dd className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums sm:text-[26px]">
        {reducedMotion ? value.toLocaleString("en-US") : <NumberFlow value={value} />}
      </dd>
      <dd className="mt-1.5 hidden text-[10px] leading-4 text-ink-dim sm:block">
        {detail}
      </dd>
    </motion.div>
  );
}

export default function ActivityGrid({ intro }: { intro: ReactNode }) {
  const reducedMotion = useReducedMotionPreference();
  const graphRef = useRef<HTMLDivElement>(null);
  const graphScrollRef = useRef<HTMLDivElement>(null);
  const [graphTooltip, setGraphTooltip] = useState<GraphTooltip | null>(null);
  const [activity, setActivity] = useState<ContributionSet>(() => ({
    data: fallbackData(),
    source: "snapshot",
    total: contributions.total,
  }));

  useEffect(() => {
    const controller = new AbortController();

    fetch(CONTRIBUTIONS_API, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((value: unknown) => {
        const next = parseLiveData(value);
        if (next) setActivity(next);
      })
      .catch(() => {
        // The committed snapshot is the intentional offline fallback.
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const scroller = graphScrollRef.current;
    if (!scroller) return;

    const compact = window.matchMedia("(max-width: 1023px)");
    let firstFrame = 0;
    let secondFrame = 0;

    const scrollToLatest = () => {
      if (!compact.matches || scroller.scrollWidth <= scroller.clientWidth) {
        return;
      }

      scroller.scrollLeft = scroller.scrollWidth - scroller.clientWidth;
    };

    const scheduleScroll = () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(scrollToLatest);
      });
    };

    const resizeObserver = new ResizeObserver(scheduleScroll);
    resizeObserver.observe(scroller);
    if (scroller.firstElementChild instanceof HTMLElement) {
      resizeObserver.observe(scroller.firstElementChild);
    }
    compact.addEventListener("change", scheduleScroll);
    scheduleScroll();

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      resizeObserver.disconnect();
      compact.removeEventListener("change", scheduleScroll);
    };
  }, []);

  useEffect(() => {
    if (!graphTooltip) return;

    const dismissTooltip = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("rect[data-date]")) return;
      setGraphTooltip(null);
    };

    document.addEventListener("pointerdown", dismissTooltip);
    return () => document.removeEventListener("pointerdown", dismissTooltip);
  }, [graphTooltip]);

  const stats = useMemo(() => calculateStats(activity.data), [activity.data]);
  const lastDay = activity.data.at(-1);
  const lastActiveDay =
    [...activity.data].reverse().find((day) => day.count > 0) ?? lastDay;

  const showGraphTooltip = (
    event:
      | ReactPointerEvent<SVGRectElement>
      | FocusEvent<SVGRectElement>,
    day: Activity
  ) => {
    const graph = graphRef.current;
    if (!graph) return;

    const cell = event.currentTarget.getBoundingClientRect();
    const bounds = graph.getBoundingClientRect();
    const naturalX = cell.left - bounds.left + cell.width / 2;

    setGraphTooltip({
      activity: day,
      x: Math.max(88, Math.min(bounds.width - 88, naturalX)),
      y: Math.max(44, cell.top - bounds.top - 7),
    });
  };

  const reveal = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
        staggerChildren: reducedMotion ? 0 : 0.065,
      },
    },
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.16, once: true }}
        variants={reveal}
        className="stack-workbench group/activity relative isolate overflow-hidden rounded-[32px] p-4 transition-[box-shadow] duration-[260ms] sm:p-6 lg:p-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-ink/[0.12] to-transparent"
        />

        <div className="grid items-start gap-16 sm:gap-8 lg:gap-7 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-9">
          <div className="min-w-0">
            {intro}
          </div>

          <div className="flex min-w-0 flex-col justify-center xl:min-h-[540px] xl:self-end xl:py-10">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2.5 text-ink-dim">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-ink/[0.08] bg-ink/[0.03] text-ink shadow-[inset_0_1px_0_var(--surface-highlight)]">
                    <GitHubMark className="h-[15px] w-[15px]" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.19em]">
                    GitHub proof
                  </span>
                </div>
                <h3
                  id="github-activity-title"
                  className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 tracking-[-0.045em]"
                >
                  <span className="text-[clamp(2.65rem,6vw,4.5rem)] font-semibold leading-none text-ink tabular-nums">
                    {reducedMotion ? (
                      activity.total.toLocaleString("en-US")
                    ) : (
                      <NumberFlow value={activity.total} />
                    )}
                  </span>
                  <span className="text-base font-medium tracking-[-0.025em] text-ink-dim sm:text-lg">
                    contributions
                  </span>
                </h3>
                <p className="mt-2 text-xs font-medium text-ink-dim sm:text-sm">
                  Past 12 months · public and private work
                </p>
                <span className="sr-only" aria-live="polite">
                  {activity.source === "live"
                    ? "Live GitHub activity loaded"
                    : ""}
                </span>
              </div>

              <motion.a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noreferrer"
                whileHover={reducedMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                className="group/link inline-flex min-h-11 w-fit items-center gap-2.5 rounded-full border border-ink/[0.09] bg-ink/[0.035] py-2 pl-3 pr-2.5 text-xs font-medium text-ink-dim shadow-[inset_0_1px_0_var(--surface-highlight),0_10px_24px_rgba(0,0,0,0.12)] transition-[border-color,background-color,color,box-shadow] duration-200 hover:border-accent/[0.3] hover:bg-ink/[0.065] hover:text-ink hover:shadow-[inset_0_1px_0_var(--surface-highlight),0_12px_30px_rgba(0,0,0,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span>@{GITHUB_HANDLE}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={14}
                  className="text-ink-faint transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent"
                />
              </motion.a>
            </header>

            <dl
              aria-label="Contribution insights"
              className="mt-6 grid grid-cols-3 overflow-hidden rounded-[18px] bg-ink/[0.018] ring-1 ring-inset ring-ink/[0.065]"
            >
              <Insight
                label="Active days"
                value={stats.activeDays}
                detail="days with shipped work"
                icon={<CalendarDays aria-hidden="true" size={14} strokeWidth={1.7} />}
                reducedMotion={reducedMotion}
              />
              <Insight
                label="Best run"
                value={stats.longestStreak}
                detail="consecutive active days"
                icon={<Flame aria-hidden="true" size={14} strokeWidth={1.7} />}
                reducedMotion={reducedMotion}
              />
              <Insight
                label="Peak day"
                value={stats.peak.count}
                detail={stats.peak.date ? dateLabel(stats.peak.date, true) : "—"}
                icon={<Zap aria-hidden="true" size={14} strokeWidth={1.7} />}
                reducedMotion={reducedMotion}
              />
            </dl>
          </div>
        </div>

        <div className="mt-5 min-w-0 rounded-[18px] border border-ink/[0.065] bg-[var(--activity-inset)] p-3 shadow-[inset_0_1px_0_var(--surface-highlight)] sm:mt-6 sm:p-4 lg:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-dim">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_color-mix(in_srgb,var(--accent)_42%,transparent)]" />
              </span>
              <span>
                {activity.source === "live" ? "Live profile" : "Saved snapshot"}
              </span>
              {lastDay ? (
                <span className="hidden text-ink/[0.18] sm:inline">·</span>
              ) : null}
              {lastDay ? (
                <span className="hidden normal-case tracking-normal text-ink-dim sm:inline">
                  through {dateLabel(lastDay.date, true)}
                </span>
              ) : null}
            </div>

            <div
              aria-label="Contribution intensity from less to more"
              className="hidden items-center gap-1.5 text-[10px] text-ink-dim sm:flex"
            >
              <span>Less</span>
              <span className="flex gap-1" aria-hidden="true">
                {PALETTE.map((color) => (
                  <span
                    key={color}
                    className="h-2.5 w-2.5 rounded-[3px] ring-1 ring-inset ring-ink/[0.07]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </span>
              <span>More</span>
            </div>
          </div>

          <div
            ref={graphRef}
            data-cursor="compact"
            className="relative -mx-1 overflow-hidden rounded-[12px] px-1"
          >
            <div
              ref={graphScrollRef}
              onScroll={() => setGraphTooltip(null)}
              className="overflow-x-auto overscroll-x-contain pb-1 pl-10 [scrollbar-width:none] lg:pl-0 [&::-webkit-scrollbar]:hidden"
            >
              <ActivityCalendar
                data={activity.data}
                colorScheme="dark"
                theme={{ dark: [...PALETTE] }}
                blockSize={13}
                blockMargin={3}
                blockRadius={3}
                fontSize={11}
                showColorLegend={false}
                showTotalCount={false}
                weekStart={1}
                style={{ color: "var(--activity-label)" }}
                className="!w-[845px] !max-w-none lg:!w-full lg:!max-w-full [&_.react-activity-calendar__scroll-container]:!max-w-none [&_.react-activity-calendar__scroll-container]:!overflow-visible [&_svg]:!h-auto [&_svg]:!w-full [&_text]:fill-[var(--activity-label)] [&_text]:font-medium"
                labels={{ legend: { less: "Less", more: "More" } }}
                renderBlock={(block, day) =>
                  cloneElement(block, {
                    "aria-label": activityLabel(day),
                    "aria-describedby": "github-calendar-help",
                    "aria-keyshortcuts":
                      "ArrowLeft ArrowRight ArrowUp ArrowDown",
                    className:
                      "cursor-default outline-none transition-[filter,opacity] duration-200 ease-out hover:brightness-150 focus-visible:brightness-150 focus-visible:[filter:drop-shadow(0_0_4px_rgba(46,229,157,0.55))]",
                    onKeyDown: (event: KeyboardEvent<SVGRectElement>) =>
                      moveCalendarFocus(event, day, activity.data),
                    onPointerEnter: (
                      event: ReactPointerEvent<SVGRectElement>
                    ) => showGraphTooltip(event, day),
                    onPointerDown: (
                      event: ReactPointerEvent<SVGRectElement>
                    ) => {
                      if (event.pointerType === "touch") {
                        showGraphTooltip(event, day);
                      }
                    },
                    onPointerLeave: (
                      event: ReactPointerEvent<SVGRectElement>
                    ) => {
                      if (event.pointerType !== "touch") {
                        setGraphTooltip(null);
                      }
                    },
                    onFocus: (event: FocusEvent<SVGRectElement>) =>
                      showGraphTooltip(event, day),
                    onBlur: () => setGraphTooltip(null),
                    role: "img",
                    tabIndex: day.date === lastActiveDay?.date ? 0 : -1,
                  })
                }
              />
            </div>
            <AnimatePresence>
              {graphTooltip ? (
                <motion.div
                  key={graphTooltip.activity.date}
                  role="tooltip"
                  initial={
                    reducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 3, scale: 0.97 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 2, scale: 0.98 }}
                  transition={{ duration: reducedMotion ? 0 : 0.14 }}
                  className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[10px] bg-[var(--surface-tooltip)] px-2.5 py-2 text-[11px] font-semibold tracking-[-0.01em] text-ink shadow-[0_14px_38px_rgba(0,0,0,0.18)] ring-1 ring-inset ring-ink/[0.1] backdrop-blur-xl"
                  style={{ left: graphTooltip.x, top: graphTooltip.y }}
                >
                  {activityLabel(graphTooltip.activity)}
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-l from-transparent to-[var(--activity-inset)] lg:hidden"
            />
          </div>
          <p
            id="github-calendar-help"
            className="mt-2 px-1 text-[10px] leading-4 text-ink-dim lg:sr-only"
          >
            Swipe for earlier months · arrow keys move between days
          </p>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
