import AuroraField from "@/components/AuroraField";
import ActivityGrid from "@/components/ActivityGrid";
import VoiceOrb from "@/components/VoiceOrb";
import Ribbon from "@/components/Ribbon";
import Nav from "@/components/Nav";
import TabsCard from "@/components/TabsCard";
import BossPhone from "@/components/BossPhone";
import ReceiptTweets from "@/components/ReceiptTweets";
import {
  IdentityTile,
  ConnectTile,
  GlobeTile,
  WatchTile,
  TerminalTile,
} from "@/components/cards";
import { Marquee } from "@/components/ui/marquee";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import contributions from "@/data/contributions.json";
import {
  identity,
  about,
  experience,
  projects,
  winsCloser,
  thinking,
  marqueeItems,
  contactCloser,
} from "@/config/portfolio";

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
      <ScrollProgress className="!bg-gradient-to-r !from-accent !via-accent !to-accent-dim h-[2px]" />
      <Nav />

      {/* ══ HERO — the monument ═══════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col justify-between overflow-hidden">
        <AuroraField />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh]"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 110%, rgba(16,185,129,0.42), rgba(16,185,129,0.1) 45%, transparent 70%)",
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
          <p className="kicker hidden sm:block">full-stack engineer &amp; founder</p>
        </header>

        <div className="relative z-10 px-4 pb-2 sm:px-6">
          <BlurFade delay={0.1}>
            <p className="serif-accent mb-2 pl-2 text-xl text-ink-dim sm:text-3xl">
              shipped with teams, led in production, built whole products{" "}
              <span className="text-accent">solo</span> —
            </p>
          </BlurFade>
          <BlurFade delay={0.25}>
            <h1
              className="w-full text-center uppercase leading-[0.82] text-ink"
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: "clamp(4rem, 17.5vw, 17rem)",
                textShadow: "0 10px 80px rgba(16,185,129,0.3)",
              }}
            >
              Jayanth
              <br />
              Koppala
            </h1>
          </BlurFade>
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

      {/* ══ THE BOARD ═════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24" id="now">
        <Head caps="Right" serif="now." />
        <div className="grid gap-4 sm:grid-cols-3">
          <IdentityTile />
          <TabsCard />
          <ConnectTile />
          <GlobeTile />
          <WatchTile />
          <TerminalTile />
          <BossPhone />
          {/* contributions ticker tile */}
          <a href="#activity" className="glass group flex flex-col justify-between !rounded-3xl p-6">
            <p className="kicker">contributions · last 365 days</p>
            <p className="text-6xl font-black tabular-nums text-ink">
              <NumberTicker value={contributions.total} className="!text-ink" />
            </p>
            <p className="text-sm text-ink-dim">
              97% in private repos —{" "}
              <span className="text-accent">that&apos;s where the work is</span>
            </p>
          </a>
          <div className="sm:col-span-3" id="activity">
            <ActivityGrid />
          </div>
        </div>
      </section>

      {/* ══ STORY ═════════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-6 py-24" id="story">
        <Head caps="The" serif="story." />
        <div className="space-y-6 text-lg leading-relaxed text-ink-dim">
          {about.map((p, i) => (
            <BlurFade key={i} delay={0.08} inView>
              <p className={i === 3 ? "serif-accent text-3xl text-accent" : ""}>
                {p}
              </p>
            </BlurFade>
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
              className="glass group relative block overflow-hidden !rounded-3xl p-8 transition-all hover:-translate-y-1 hover:border-accent/50 sm:sticky"
              style={{ top: `${80 + i * 16}px` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-10 select-none text-[9rem] uppercase leading-none text-ink opacity-[0.04] transition-opacity group-hover:opacity-[0.09]"
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

      {/* ══ RECEIPTS — the actual tweets ══════════════════════ */}
      <section className="relative overflow-hidden py-24" id="receipts">
        <AuroraField dim />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <Head caps="The" serif="receipts." />
          <p className="-mt-6 mb-8 text-sm text-ink-faint">
            Not claims. The actual posts.
          </p>
          <ReceiptTweets />
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

      <div className="border-y border-line py-4">
        <Marquee pauseOnHover className="[--duration:36s]">
          {marqueeItems.map((item) => (
            <span key={item} className="kicker mx-6 !text-[0.78rem]">
              {item} <span className="ml-6 text-accent">·</span>
            </span>
          ))}
        </Marquee>
      </div>

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
              className="glass group !rounded-3xl p-6 transition-all hover:-translate-y-1"
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
              "radial-gradient(120% 100% at 50% 115%, rgba(16,185,129,0.3), transparent 65%)",
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
