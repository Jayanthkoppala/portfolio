"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SiriOrb from "@/components/ui/smoothui/siri-orb";

/**
 * Breathing voice orb + "ask me" panel.
 * v1: free-tier interaction — browser speech recognition for listening,
 * grounded canned answers typed out in text. The orb's level animates from
 * speech activity. Voice replies (Jay's cloned voice) arrive in v2 as
 * pre-generated audio; the component is built so audio can be slotted in.
 */

const FACTS: { keys: string[]; answer: string }[] = [
  {
    keys: ["boss", "building", "startup", "now", "current"],
    answer:
      "Right now Jay is building BOSS — AI round-one screening for India recruiters. A recruiter gets 242 applications per role; BOSS screens the pile, talks to the ones worth talking to, and returns a top 5–10 with reasons in 48 hours. He's the sole developer, and BOSS is in the Sarvam AI Startup Program.",
  },
  {
    keys: ["win", "hackathon", "prize", "award", "uniswap", "ton"],
    answer:
      "Documented wins: 2nd place at the TON Hackathon Bootcamp ($1,500, TonMate). A Uniswap Foundation prize at the Hook Incubator for VixDex. $1,500 in the Recall + Gaia trading-agent competition — that one turned into a job offer. A Polkadot Hacker House bounty. And a ₹15 lakh MSME grant for Souldem. Every one links to a public receipt on this page.",
  },
  {
    keys: ["stack", "tech", "language", "tools", "skills"],
    answer:
      "TypeScript and Next.js on the front, Node and Python behind, Solidity and Foundry for on-chain work, LLM agents and voice AI for the current chapter. He ships whole products alone — backend, frontend, and the voice on the call.",
  },
  {
    keys: ["story", "who", "about", "background", "journey"],
    answer:
      "Started working at 16 — marketing first, then walked away from that money to build. Left home at 17 for a college where he didn't speak the local language, on purpose. Won hackathons, ran a business, worked full-time, started companies — all stacked on top of classes. Read the About section; it's his own words.",
  },
  {
    keys: ["hire", "contact", "email", "talk", "reach", "meet"],
    answer:
      "Email jay@bosshq.in, or find him as @JayBosshq on X. If you're building something in hiring, tell him where you think he's wrong — that's the fastest way to a real conversation.",
  },
  {
    keys: ["nohunt", "candidate"],
    answer:
      "NoHunt was the candidate side of hiring: one resume upload, then it found roles, tailored, applied, and tracked. BOSS attacks the same problem from the recruiter's side of the table.",
  },
];

const FALLBACK =
  "I only answer from what's on this page — the work, the wins, the story. Try asking about BOSS, the hackathon wins, his stack, or how to reach him. Anything deeper: ask him on X @JayBosshq.";

const GREETING =
  "You found the voice layer. I answer for Jay — grounded only in what's on this page. Ask about the work, the wins, or the story. Type, or use the mic.";

export default function VoiceOrb() {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState(0);
  const [listening, setListening] = useState(false);
  const [log, setLog] = useState<{ from: "you" | "orb"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const recRef = useRef<{ stop: () => void } | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Idle breathing.
  useEffect(() => {
    if (listening) return;
    let raf: number;
    const t0 = performance.now();
    const breathe = (t: number) => {
      setLevel(0.18 + 0.12 * Math.sin((t - t0) / 900));
      raf = requestAnimationFrame(breathe);
    };
    raf = requestAnimationFrame(breathe);
    return () => cancelAnimationFrame(raf);
  }, [listening]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [log]);

  const answer = useCallback((q: string) => {
    const lower = q.toLowerCase();
    const hit = FACTS.find((f) => f.keys.some((k) => lower.includes(k)));
    const reply = hit ? hit.answer : FALLBACK;
    setLog((l) => [...l, { from: "you", text: q }, { from: "orb", text: reply }]);
  }, []);

  const openPanel = () => {
    setOpen(true);
    if (log.length === 0) setLog([{ from: "orb", text: GREETING }]);
  };

  const toggleMic = () => {
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    type SR = new () => {
      lang: string;
      interimResults: boolean;
      onresult: (e: { results: { [i: number]: { [j: number]: { transcript: string } } }; resultIndex: number }) => void;
      onend: () => void;
      start: () => void;
      stop: () => void;
    };
    const w = window as unknown as { SpeechRecognition?: SR; webkitSpeechRecognition?: SR };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      setLog((l) => [
        ...l,
        { from: "orb", text: "This browser has no speech recognition — type instead." },
      ]);
      return;
    }
    const rec = new Ctor();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const text = e.results[e.resultIndex][0].transcript;
      setLevel(0.85);
      answer(text);
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    rec.start();
    setListening(true);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* The orb */}
      <button
        onClick={openPanel}
        aria-label="Talk to the site"
        className="group relative grid h-52 w-52 cursor-pointer place-items-center"
      >
        <div
          className="transition-transform duration-300"
          style={{ transform: `scale(${1 + level * 0.12})`, filter: "drop-shadow(0 0 60px rgba(16,185,129,0.35))" }}
        >
          <SiriOrb
            size="200px"
            animationDuration={16}
            colors={{
              bg: "oklch(20% 0.03 170)",
              c1: "oklch(75% 0.16 165)",
              c2: "oklch(65% 0.17 175)",
              c3: "oklch(60% 0.12 200)",
            }}
          />
        </div>
      </button>

      {!open && (
        <p className="kicker text-center">
          I build voice agents. this one answers for me — click it
        </p>
      )}

      {/* The panel */}
      {open && (
        <div className="w-full max-w-xl rounded-xl border border-line bg-bg-card">
          <div ref={logRef} className="max-h-72 space-y-4 overflow-y-auto p-5">
            {log.map((m, i) => (
              <p
                key={i}
                className={
                  m.from === "you"
                    ? "text-right text-sm text-ink-dim"
                    : "text-sm leading-relaxed text-ink"
                }
              >
                {m.from === "orb" && (
                  <span className="kicker mr-2 !text-[0.6rem]" style={{ color: "var(--accent)" }}>
                    orb
                  </span>
                )}
                {m.text}
              </p>
            ))}
          </div>
          <form
            className="flex items-center gap-2 border-t border-line p-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                answer(input.trim());
                setInput("");
              }
            }}
          >
            <button
              type="button"
              onClick={toggleMic}
              className={`rounded-lg border border-line px-3 py-2 text-xs transition-colors ${
                listening ? "border-accent text-accent" : "text-ink-dim hover:text-ink"
              }`}
            >
              {listening ? "listening…" : "mic"}
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the work, the wins, the story…"
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-bg transition-transform hover:scale-105"
            >
              Ask
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
