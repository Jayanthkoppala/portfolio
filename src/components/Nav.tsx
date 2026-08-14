"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const LINKS = [
  { label: "Now", href: "#now" },
  { label: "Story", href: "#story" },
  { label: "Receipts", href: "#receipts" },
  { label: "Contact", href: "#contact" },
];

const subscribeToHydration = () => () => undefined;

const THEME_TOGGLE_CLASS =
  "group/theme relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-ink/[0.035] text-ink-dim shadow-[inset_0_1px_0_var(--surface-highlight)] transition-[background-color,border-color,color,transform] duration-200 hover:border-accent/35 hover:bg-ink/[0.065] hover:text-ink active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-60";

function ThemeControl() {
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <AnimatedThemeToggler
      theme={mounted && resolvedTheme === "light" ? "light" : "dark"}
      onThemeChange={setTheme}
      duration={520}
      fromCenter
      disabled={!mounted}
      className={THEME_TOGGLE_CLASS}
      title={
        mounted && resolvedTheme === "light"
          ? "Use dark theme"
          : "Use light theme"
      }
    />
  );
}

/** Glass capsule nav + ⌘K command palette. */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQ("");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = LINKS.filter((l) =>
    l.label.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="glass !fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 grid grid-cols-[1fr_1fr_44px_1fr_1fr] items-center rounded-full px-2 py-2 sm:hidden"
      >
        {LINKS.slice(0, 2).map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="grid min-h-11 place-items-center rounded-full px-2 text-xs font-medium text-ink-dim transition-[background-color,color,transform] duration-200 hover:bg-ink/[0.055] hover:text-ink active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            {l.label}
          </a>
        ))}
        <ThemeControl />
        {LINKS.slice(2, 4).map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="grid min-h-11 place-items-center rounded-full px-2 text-xs font-medium text-ink-dim transition-[background-color,color,transform] duration-200 hover:bg-ink/[0.055] hover:text-ink active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <nav
        aria-label="Primary navigation"
        className="glass !fixed left-1/2 top-4 z-50 hidden w-[min(92vw,620px)] -translate-x-1/2 grid-cols-[1fr_44px_1fr] items-center rounded-full px-2 py-1.5 sm:grid"
      >
        <div className="flex min-w-0 items-center justify-end gap-0.5 pr-2">
          {LINKS.slice(0, 3).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="grid min-h-10 place-items-center rounded-full px-3 text-xs font-medium text-ink-dim transition-[background-color,color,transform] duration-200 hover:bg-ink/[0.055] hover:text-ink active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              {l.label}
            </a>
          ))}
        </div>
        <ThemeControl />
        <div className="flex min-w-0 items-center gap-0.5 pl-2">
          {LINKS.slice(3).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="grid min-h-10 place-items-center rounded-full px-3 text-xs font-medium text-ink-dim transition-[background-color,color,transform] duration-200 hover:bg-ink/[0.055] hover:text-ink active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open command palette"
            className="ml-0.5 min-h-10 rounded-full border border-line px-3 font-mono text-[0.65rem] text-ink-faint transition-[background-color,border-color,color,transform] duration-200 hover:border-accent/55 hover:bg-ink/[0.04] hover:text-accent active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            ⌘K
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-[var(--overlay)] pt-[18vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="glass w-full max-w-md overflow-hidden !rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Jump to…"
              className="w-full border-b border-line bg-transparent px-5 py-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <div className="p-2">
              {results.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center justify-between rounded-xl px-4 py-3 text-sm text-ink-dim transition-[background-color,color,transform] duration-200 hover:bg-ink/[0.055] hover:text-ink active:scale-[0.96]"
                >
                  {l.label}
                  <span className="kicker">↵</span>
                </a>
              ))}
              <a
                href="mailto:jay@bosshq.in"
                className="flex min-h-11 items-center justify-between rounded-xl px-4 py-3 text-sm text-accent transition-[background-color,transform] duration-200 hover:bg-ink/[0.055] active:scale-[0.96]"
              >
                Email Jay
                <span className="kicker">jay@bosshq.in</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
