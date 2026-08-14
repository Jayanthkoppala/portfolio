"use client";

import { useState } from "react";
import Watch from "@/components/Watch";
import { identity, contactCloser } from "@/config/portfolio";

/** The goodbye: the question, the connect card, and the watch still ticking. */
export default function ContactEnd() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="grid items-center gap-10 sm:grid-cols-[1.4fr_1fr]">
      <div>
        <p
          className="text-5xl uppercase leading-[0.9] sm:text-7xl"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Tell me where
          <br />
          <span className="serif-accent normal-case text-accent">
            I&apos;m wrong.
          </span>
        </p>
        <p className="mt-6 max-w-md text-sm text-ink-dim">{contactCloser}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(identity.email);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            }}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-105"
          >
            {copied ? "copied ✓" : `${identity.email} — tap to copy`}
          </button>
          {identity.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-4 py-2 text-sm text-ink-dim transition-colors hover:border-accent hover:text-ink"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="hidden flex-col items-center gap-3 sm:flex">
        <Watch size={190} />
        <p className="kicker">bengaluru · probably still up</p>
      </div>
    </div>
  );
}
