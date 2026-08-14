"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Now", href: "#now" },
  { label: "Story", href: "#story" },
  { label: "Work", href: "#work" },
  { label: "Receipts", href: "#receipts" },
  { label: "Ask", href: "#voice" },
];

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
      {/* mobile: fixed bottom pill */}
      <nav className="glass !fixed inset-x-4 bottom-4 z-50 flex items-center justify-around rounded-full px-2 py-2 sm:hidden">
        {LINKS.slice(0, 4).map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-ink-dim"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <nav className="glass !fixed left-1/2 top-4 z-50 hidden w-max -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5 sm:flex">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-4 py-1.5 text-xs font-medium text-ink-dim transition-colors hover:bg-white/10 hover:text-ink"
          >
            {l.label}
          </a>
        ))}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open command palette"
          className="ml-1 rounded-full border border-line px-3 py-1.5 font-mono text-[0.65rem] text-ink-faint transition-colors hover:border-accent hover:text-accent"
        >
          ⌘K
        </button>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 pt-[18vh] backdrop-blur-sm"
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
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-ink-dim hover:bg-white/10 hover:text-ink"
                >
                  {l.label}
                  <span className="kicker">↵</span>
                </a>
              ))}
              <a
                href="mailto:jay@bosshq.in"
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-accent hover:bg-white/10"
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
