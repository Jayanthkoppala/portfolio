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
import MoltenMetal from "@/components/MoltenMetal";
import MoltenName from "@/components/MoltenName";
import StatusLine from "@/components/HeroBits";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Highlighter } from "@/components/ui/highlighter";
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

      {/* ══ HERO — molten monument (mode D + ripple) ══════════ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <MoltenMetal
            color1="#10b981"
            color2="#065f46"
            color3="#0a0c0b"
            speed={0.5}
            scale={1.1}
            glow={0.5}
            swirl={0.6}
            grain
            grainIntensity={0.08}
            mouseInteraction
            mouseStrength={0.35}
          />
        </div>
        <MoltenName />
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

        <div className="relative z-10 mt-auto flex flex-col items-center gap-4 px-6 pb-16">
          <p className="serif-accent text-lg text-ink-dim sm:text-2xl">
            shipped with teams, led in production, built whole products{" "}
            <span className="text-accent">solo</span> —
          </p>
          <StatusLine />
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            {identity.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line bg-bg/50 px-4 py-1.5 text-sm text-ink-dim backdrop-blur transition-colors hover:border-accent hover:text-ink focus-visible:ring-1 focus-visible:ring-accent"
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
              {i === 3 && p.endsWith("cooking season.") ? (
                <>
                  {p.slice(0, -"cooking season.".length)}
                  <Highlighter
                    action="underline"
                    color="var(--annotation-ink)"
                    strokeWidth={2.25}
                    animationDuration={620}
                    iterations={1}
                    padding={2}
                    multiline={false}
                    isView
                  >
                    cooking season.
                  </Highlighter>
                </>
              ) : (
                p
              )}
            </p>
          ))}
        </div>
      </section>

      {/* ══ II.5 · THE DESK — live bento ══════════════════════ */}
      <section
        className="mx-auto max-w-[1400px] px-6 pb-12 pt-24 xl:px-12"
        id="desk"
      >
        <Head caps="Meanwhile," serif="at the desk." />
        <Board />
        <div className="mt-8">
          <ActivityGrid />
        </div>
      </section>

      {/* ══ III · HOW I BUILD — directly after GitHub activity ═ */}
      <section
        className="mx-auto max-w-[1400px] px-6 pb-24 pt-2 xl:px-12"
        id="stack"
      >
        <TechSplit />
      </section>

      {/* ══ IV · WHAT I'VE BUILT ══════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-24" id="work">
        <Head caps="What I've" serif="built." />
        <div className="mx-auto max-w-4xl">
          <ProjectStack />
        </div>
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
              "radial-gradient(120% 100% at 50% 115%, var(--hero-glow-soft), transparent 65%)",
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
