import AuroraField from "@/components/AuroraField";
import Ribbon from "@/components/Ribbon";
import Nav from "@/components/Nav";
import Flagship from "@/components/Flagship";
import PastTimeline from "@/components/PastTimeline";
import ProjectStack from "@/components/ProjectStack";
import TechSplit from "@/components/TechSplit";
import ReceiptTweets from "@/components/ReceiptTweets";
import ContactEnd from "@/components/ContactEnd";
import Board from "@/components/Board";
import ActivityGrid from "@/components/ActivityGrid";
import LightRays from "@/components/LightRays";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { identity, about } from "@/config/portfolio";

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

function Bridge({ text }: { text: string }) {
  return (
    <p className="serif-accent mx-auto max-w-6xl px-6 pb-2 pt-8 text-2xl text-ink-faint">
      {text}
    </p>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <ScrollProgress className="h-[2px] !bg-gradient-to-r !from-accent !via-accent !to-accent-dim" />
      <Nav />

      {/* ══ HERO — left-axis monument ═════════════════════════ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <div className="absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#10b981"
            raysSpeed={0.6}
          />
        </div>
        <AuroraField dim />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh]"
          style={{
            background:
              "radial-gradient(120% 100% at 30% 115%, rgba(16,185,129,0.35), rgba(16,185,129,0.08) 45%, transparent 70%)",
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
          <p className="kicker hidden sm:block">
            full-stack engineer &amp; founder
          </p>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-24 pt-10">
          <p className="serif-accent mb-4 text-xl text-ink-dim sm:text-3xl">
            shipped with teams, led in production, built whole products{" "}
            <span className="text-accent">solo</span> —
          </p>
          <h1
            className="hero-name uppercase leading-[0.84] text-ink"
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(3.6rem, 12.5vw, 12rem)",
              textShadow: "0 10px 80px rgba(16,185,129,0.3)",
            }}
          >
            Jayanth
            <br />
            Koppala
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            {identity.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-dim transition-colors hover:border-accent hover:text-ink focus-visible:ring-1 focus-visible:ring-accent"
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
        <p className="kicker absolute bottom-6 left-6 z-10 sm:left-10">
          scroll ↓
        </p>
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

      {/* ══ I · WHERE I'VE WORKED — now, then before ══════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24" id="now">
        <Head caps="Where I've" serif="worked." />
        <Flagship />
        <PastTimeline />
      </section>

      {/* ══ II · THE STORY ════════════════════════════════════ */}
      <Bridge text="how it started, in my own words —" />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-8" id="story">
        <Head caps="The" serif="story." />
        <div className="space-y-6 text-lg leading-relaxed text-ink-dim">
          {about.map((p, i) => (
            <p
              key={i}
              className={i === 3 ? "serif-accent text-3xl text-accent" : ""}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ══ II.5 · THE DESK — live bento ══════════════════════ */}
      <section className="mx-auto max-w-[1400px] px-6 py-24" id="desk">
        <Head caps="Meanwhile," serif="at the desk." />
        <Board />
        <div className="mt-4">
          <ActivityGrid />
        </div>
      </section>

      {/* ══ III · WHAT I'VE BUILT ═════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24" id="work">
        <Head caps="What I've" serif="built." />
        <div className="mx-auto max-w-4xl">
          <ProjectStack />
        </div>
      </section>

      {/* ══ IV · HOW I BUILD — tech globe + philosophy ════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24" id="stack">
        <Head caps="How I" serif="build." />
        <TechSplit />
      </section>

      {/* ══ V · THE RECEIPTS ══════════════════════════════════ */}
      <Bridge text="don't take my word for any of it —" />
      <section className="relative overflow-hidden pb-24 pt-8" id="receipts">
        <AuroraField dim />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Head caps="The" serif="receipts." />
          <ReceiptTweets />
          <p className="serif-accent mt-4 text-xl text-ink-dim">
            Plus a few smaller ones I never posted about.
          </p>
        </div>
      </section>

      {/* ══ VII · CONTACT ═════════════════════════════════════ */}
      <footer
        className="relative overflow-hidden border-t border-line"
        id="contact"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh]"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 115%, rgba(16,185,129,0.28), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <ContactEnd />
          <p className="kicker mt-16">
            © {new Date().getFullYear()} Jayanth Koppala · set in Anton &amp;
            Instrument Serif · built end to end, obviously
          </p>
        </div>
      </footer>
    </main>
  );
}
