import AuroraField from "@/components/AuroraField";
import Marquee from "@/components/Marquee";
import ActivityGrid from "@/components/ActivityGrid";
import VoiceOrb from "@/components/VoiceOrb";
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

function SectionHead({ no, title }: { no: string; title: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="kicker !text-accent">{no}</span>
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <div className="ml-4 h-px flex-1 bg-line" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6">
        <AuroraField />
        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <p className="kicker mb-6">
            Bengaluru · building{" "}
            <a
              href="https://bosshq.in"
              className="text-accent hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              BOSS!
            </a>{" "}
            · Sarvam AI Startup Program
          </p>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            Jayanth
            <br />
            <span className="serif-accent text-accent">Koppala</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-dim sm:text-xl">
            I&apos;ve shipped with hackathon teams, led engineers in
            production, and built whole products{" "}
            <span className="serif-accent text-ink">solo</span>.
          </p>
          <p className="mt-2 text-base text-ink-faint">
            Full-stack engineer &amp; founder.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {identity.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-dim transition-colors hover:border-accent hover:text-ink"
              >
                {s.label}
              </a>
            ))}
            <a
              href={`mailto:${identity.email}`}
              className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-bg transition-transform hover:scale-105"
            >
              {identity.email}
            </a>
          </div>
        </div>
      </section>

      <Marquee items={marqueeItems} />

      {/* ── About ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-28" id="about">
        <SectionHead no="01" title="The story" />
        <div className="space-y-6 text-lg leading-relaxed text-ink-dim">
          {about.map((p, i) => (
            <p key={i} className={i === 3 ? "serif-accent text-2xl text-ink" : ""}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-28" id="experience">
        <SectionHead no="02" title="Where I've worked" />
        <div className="space-y-0">
          {experience.map((e) => (
            <div
              key={`${e.role}-${e.org}`}
              className="group grid gap-1 border-b border-line py-6 sm:grid-cols-[1fr_2fr] sm:gap-6"
            >
              <div>
                <p className="font-semibold text-ink">
                  {e.role}{" "}
                  <span className="text-accent">
                    ·{" "}
                    {e.href ? (
                      <a href={e.href} target="_blank" rel="noreferrer" className="hover:underline">
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

      {/* ── Projects — stacking cards ────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-28" id="work">
        <SectionHead no="03" title="What I've built" />
        <div className="space-y-6">
          {projects.map((p, i) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-2xl border border-line bg-bg-card p-8 transition-colors hover:border-accent/60 sm:sticky"
              style={{ top: `${88 + i * 14}px` }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {p.name}
                </h3>
                <p className="kicker whitespace-nowrap">
                  {p.year}
                  {p.live && <span className="ml-2 text-good">● live</span>}
                </p>
              </div>
              <p className="serif-accent mt-4 text-xl text-ink">{p.problem}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
                {p.shipped}
              </p>
              <p className="mt-5 text-xs text-ink-faint transition-colors group-hover:text-accent">
                {p.href.replace("https://", "")} ↗
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ── Wins — receipts ──────────────────────────────────── */}
      <section className="relative overflow-hidden py-28" id="wins">
        <AuroraField dim />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <SectionHead no="04" title="Receipts" />
          <p className="mb-8 -mt-4 text-sm text-ink-faint">
            Every claim links to its public artifact. No badges, just links.
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
          <p className="serif-accent mt-6 text-lg text-ink-dim">{winsCloser}</p>
        </div>
      </section>

      {/* ── GitHub wall ──────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-28" id="activity">
        <SectionHead no="05" title="Still shipping" />
        <ActivityGrid />
      </section>

      {/* ── Thinking ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-28" id="thinking">
        <SectionHead no="06" title="How I think" />
        <div className="grid gap-6 sm:grid-cols-2">
          {thinking.map((t) => (
            <a
              key={t.title}
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-line bg-bg-card p-6 transition-colors hover:border-accent/60"
            >
              <p className="font-semibold">{t.title}</p>
              <p className="serif-accent mt-3 text-lg leading-snug text-ink-dim">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="kicker mt-4 transition-colors group-hover:!text-accent">
                read on {t.where} ↗
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ── Voice ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-28" id="voice">
        <SectionHead no="07" title="Don't read. Ask." />
        <VoiceOrb />
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <footer className="relative overflow-hidden border-t border-line">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <p className="serif-accent text-3xl leading-snug sm:text-4xl">
            {contactCloser}
          </p>
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
            © {new Date().getFullYear()} Jayanth Koppala · built end to end, obviously
          </p>
        </div>
      </footer>
    </main>
  );
}
