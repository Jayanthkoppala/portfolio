import AuroraField from "@/components/AuroraField";
import Marquee from "@/components/Marquee";
import ActivityGrid from "@/components/ActivityGrid";
import VoiceOrb from "@/components/VoiceOrb";
import Ribbon from "@/components/Ribbon";
import { ClockWidget, TerminalWidget } from "@/components/widgets";
import {
  identity,
  about,
  experience,
  projects,
  wins,
  winsCloser,
  thinking,
  marqueeItems,
  contactCloser,
} from "@/config/portfolio";

/** Display/serif collision section head: WHAT I'VE built */
function Head({ caps, serif }: { caps: string; serif: string }) {
  return (
    <h2 className="mb-12 leading-none">
      <span
        className="block text-5xl uppercase text-ink sm:text-7xl"
        style={{ fontFamily: "var(--font-anton)", letterSpacing: "0.01em" }}
      >
        {caps}
      </span>
      <span className="serif-accent -mt-2 block text-4xl text-accent sm:-mt-4 sm:text-6xl">
        {serif}
      </span>
    </h2>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* ══ HERO — the monument ═══════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden">
        <AuroraField />
        {/* ember floor under the name */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh]"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 110%, rgba(255,92,31,0.5), rgba(255,92,31,0.12) 45%, transparent 70%)",
          }}
        />
        <header className="relative z-10 flex items-start justify-between px-6 pt-6 sm:px-10">
          <p className="kicker">
            Bengaluru · building{" "}
            <a
              href="https://bosshq.in"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              BOSS!
            </a>
          </p>
          <div className="flex gap-4">
            {identity.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="kicker transition-colors hover:!text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </header>

        <div className="relative z-10 px-4 pb-2 sm:px-6">
          <p className="serif-accent mb-2 pl-2 text-xl text-ink-dim sm:text-3xl">
            shipped with teams, led in production, built whole products{" "}
            <span className="text-accent">solo</span> —
          </p>
          <h1
            className="w-full text-center uppercase leading-[0.82] text-ink"
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(4rem, 17.5vw, 17rem)",
              textShadow: "0 10px 80px rgba(255,92,31,0.35)",
            }}
          >
            Jayanth
            <br />
            Koppala
          </h1>
        </div>
      </section>

      <Ribbon
        phrases={[
          "cooking season",
          "end to end",
          "still shipping",
          "since sixteen",
          "built in Bengaluru",
        ]}
      />

      {/* ══ NOW — the board ═══════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 py-24" id="now">
        <Head caps="Right" serif="now." />
        <div className="grid gap-4 sm:grid-cols-3">
          {/* BOSS tile */}
          <a
            href="https://bosshq.in"
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-line p-6 sm:col-span-2"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,92,31,0.16), rgba(255,92,31,0.03) 60%)",
            }}
          >
            <p className="kicker !text-accent">currently building</p>
            <p
              className="mt-3 text-5xl uppercase text-ink"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              BOSS!
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-dim">
              AI round-one screening for India recruiters. 242 applications in,
              a shortlist of 5–10 out, with reasons, in 48 hours. Sarvam AI
              Startup Program. One developer: me.
            </p>
            <p className="mt-4 text-xs text-ink-faint transition-colors group-hover:text-accent">
              bosshq.in ↗
            </p>
          </a>

          {/* Clock tile */}
          <div className="rounded-2xl border border-line bg-bg-card p-6">
            <ClockWidget />
          </div>

          {/* Terminal tile */}
          <div className="rounded-2xl border border-line bg-bg-card p-2 sm:row-span-2">
            <TerminalWidget />
          </div>

          {/* Receipts tile */}
          <a
            href="#receipts"
            className="group rounded-2xl border border-line bg-bg-card p-6"
          >
            <p className="kicker">documented wins</p>
            <p
              className="mt-2 text-6xl text-ink"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              5
            </p>
            <p className="mt-2 text-sm text-ink-dim">
              every one links to a public receipt{" "}
              <span className="text-accent transition-transform group-hover:translate-y-1 inline-block">
                ↓
              </span>
            </p>
          </a>

          {/* Voice teaser tile */}
          <a
            href="#voice"
            className="group flex flex-col justify-between rounded-2xl border border-line bg-bg-card p-6"
          >
            <p className="kicker">voice layer</p>
            <div className="mx-auto my-3 h-14 w-14 rounded-full transition-transform group-hover:scale-110"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(255,140,90,0.9), rgba(255,92,31,0.4) 60%, transparent)",
                boxShadow: "0 0 40px rgba(255,92,31,0.4)",
              }}
            />
            <p className="text-sm text-ink-dim">
              don&apos;t read the page. <span className="text-accent">ask it.</span>
            </p>
          </a>

          {/* GitHub wall — full width */}
          <div className="sm:col-span-3">
            <ActivityGrid />
          </div>
        </div>
      </section>

      {/* ══ STORY ═════════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-6 py-24" id="story">
        <Head caps="The" serif="story." />
        <div className="space-y-6 text-lg leading-relaxed text-ink-dim">
          {about.map((p, i) => (
            <p key={i} className={i === 3 ? "serif-accent text-3xl text-accent" : ""}>
              {p}
            </p>
          ))}
        </div>
      </section>

      <Ribbon
        phrases={[
          "slept through exams",
          "coded till sunrise",
          "cracked mac screen",
          "kept building",
        ]}
        angle={2.5}
        reverse
      />

      {/* ══ BUILT ═════════════════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-6 py-24" id="work">
        <Head caps="What I've" serif="built." />
        <div className="space-y-6">
          {projects.map((p, i) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-2xl border border-line bg-bg-card p-8 transition-all hover:-translate-y-1 hover:border-accent/70 sm:sticky"
              style={{ top: `${80 + i * 16}px` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-10 select-none text-[9rem] uppercase leading-none text-ink opacity-[0.04] transition-opacity group-hover:opacity-[0.08]"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative flex items-baseline justify-between gap-4">
                <h3
                  className="text-4xl uppercase tracking-tight sm:text-5xl"
                  style={{ fontFamily: "var(--font-anton)" }}
                >
                  {p.name}
                </h3>
                <p className="kicker whitespace-nowrap">
                  {p.year}
                  {p.live && <span className="ml-2 text-good">● live</span>}
                </p>
              </div>
              <p className="serif-accent relative mt-4 text-2xl text-ink">
                {p.problem}
              </p>
              <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
                {p.shipped}
              </p>
              <p className="relative mt-5 text-xs text-ink-faint transition-colors group-hover:text-accent">
                {p.href.replace("https://", "")} ↗
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ══ RECEIPTS ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24" id="receipts">
        <AuroraField dim />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <Head caps="The" serif="receipts." />
          <p className="-mt-6 mb-8 text-sm text-ink-faint">
            No badges. Links.
          </p>
          <div className="overflow-hidden rounded-xl border border-line bg-bg-card">
            {wins.map((w) => (
              <a
                key={w.line}
                href={w.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-0 hover:bg-bg-raised"
              >
                <p className="font-mono text-sm text-ink">{w.line}</p>
                <span className="kicker whitespace-nowrap transition-colors group-hover:!text-accent">
                  {w.source} ↗
                </span>
              </a>
            ))}
          </div>
          <p className="serif-accent mt-6 text-xl text-ink-dim">{winsCloser}</p>
        </div>
      </section>

      {/* ══ WORKED ════════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-6 py-24" id="experience">
        <Head caps="Where I've" serif="worked." />
        <div>
          {experience.map((e) => (
            <div
              key={`${e.role}-${e.org}`}
              className="grid gap-1 border-b border-line py-6 sm:grid-cols-[1fr_2fr] sm:gap-6"
            >
              <div>
                <p className="font-semibold text-ink">
                  {e.role}{" "}
                  <span className="text-accent">
                    ·{" "}
                    {e.href ? (
                      <a
                        href={e.href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {e.org}
                      </a>
                    ) : (
                      e.org
                    )}
                  </span>
                </p>
                <p className="kicker mt-1">{e.period}</p>
              </div>
              <p className="text-sm leading-relaxed text-ink-dim">{e.note}</p>
            </div>
          ))}
        </div>
      </section>

      <Marquee items={marqueeItems} />

      {/* ══ THINKING ══════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-6 py-24" id="thinking">
        <Head caps="How I" serif="think." />
        <div className="grid gap-6 sm:grid-cols-2">
          {thinking.map((t) => (
            <a
              key={t.title}
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-line bg-bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/70"
            >
              <p className="font-semibold">{t.title}</p>
              <p className="serif-accent mt-3 text-xl leading-snug text-ink-dim">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="kicker mt-4 transition-colors group-hover:!text-accent">
                read on {t.where} ↗
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ══ VOICE ═════════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-6 py-24" id="voice">
        <Head caps="Don't read." serif="ask." />
        <VoiceOrb />
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════ */}
      <footer className="relative overflow-hidden border-t border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh]"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 115%, rgba(255,92,31,0.35), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-24">
          <p
            className="text-4xl uppercase leading-[0.9] sm:text-6xl"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            Tell me where
            <br />
            <span className="serif-accent normal-case text-accent">
              I&apos;m wrong.
            </span>
          </p>
          <p className="mt-6 max-w-md text-sm text-ink-dim">{contactCloser}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${identity.email}`}
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105"
            >
              {identity.email}
            </a>
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
          <p className="kicker mt-16">
            © {new Date().getFullYear()} Jayanth Koppala · built end to end,
            obviously
          </p>
        </div>
      </footer>
    </main>
  );
}
