import AuroraField from "@/components/AuroraField";
import Ribbon from "@/components/Ribbon";
import Nav from "@/components/Nav";
import ExperienceSection from "@/components/ExperienceSection";
import TechSplit from "@/components/TechSplit";
import ReceiptTweets from "@/components/ReceiptTweets";
import ContactEnd from "@/components/ContactEnd";
import Board from "@/components/Board";
import ActivityGrid from "@/components/ActivityGrid";
import MoltenMetal from "@/components/MoltenMetal";
import MoltenName from "@/components/MoltenName";
import ProfileCard from "@/components/ProfileCard";
import GradientWaves from "@/components/GradientWaves";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Highlighter } from "@/components/ui/highlighter";
import { identity, about } from "@/config/portfolio";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

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
  const heroSocials = identity.socials.filter(
    ({ label }) => label === "GitHub" || label === "LinkedIn"
  );

  return (
    <main className="relative overflow-x-hidden">
      <ScrollProgress className="h-[2px] !bg-gradient-to-r !from-accent !via-accent !to-accent-dim" />
      <Nav />

      {/* ══ HERO — molten monument (mode D + ripple) ══════════ */}
      <section
        aria-labelledby="hero-title"
        className="hero-section relative flex min-h-[max(100svh,42rem)] flex-col overflow-hidden"
      >
        <div aria-hidden className="absolute inset-0 opacity-[0.2]">
          <MoltenMetal
            color1="#10b981"
            color2="#065f46"
            color3="#0a0c0b"
            speed={0.42}
            scale={1.1}
            glow={0.42}
            swirl={0.52}
            grain
            grainIntensity={0.06}
            mouseInteraction
            mouseStrength={0.24}
          />
        </div>
        <MoltenName />
        <header className="relative z-10 flex items-start justify-between px-6 pt-6 sm:px-10">
          <p className="kicker !text-ink-dim sm:hidden xl:block">
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
          <p className="kicker hidden !text-ink-dim xl:block">
            full-stack engineer &amp; founder
          </p>
        </header>

        <div className="hero-content relative z-10 mt-auto flex flex-col items-center px-6 pb-[calc(7.5rem+env(safe-area-inset-bottom))] sm:pb-[clamp(4.5rem,8vh,6rem)]">
          <p className="hero-proof serif-accent max-w-3xl text-balance text-center text-[clamp(1.2rem,2.2vw,1.6rem)] leading-[1.25] text-ink">
            Shipped with teams. Led engineers in production. Built whole
            products <span className="text-accent">solo.</span>
          </p>
          <div className="hero-actions mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#desk"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-[1.125rem] py-3 text-sm font-semibold text-bg shadow-[0_14px_34px_-18px_var(--accent)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-dim hover:shadow-[0_18px_40px_-18px_var(--accent)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              See what I ship
              <ArrowDownRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                strokeWidth={1.8}
              />
            </a>
            <a
              href={`mailto:${identity.email}`}
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-bg/55 px-[1.125rem] py-3 text-sm font-medium text-ink backdrop-blur-md transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:bg-bg-raised/75 hover:shadow-[0_14px_30px_-22px_var(--ink)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Let&apos;s talk
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </a>
          </div>
          <nav className="hero-tertiary mt-3 flex items-center gap-4" aria-label="Find me online">
            <span aria-hidden className="h-px w-5 bg-line" />
            {heroSocials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center px-1 text-xs font-medium text-ink-dim transition-[color,transform] duration-200 hover:-translate-y-px hover:text-ink active:scale-[0.96] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                {social.label}
              </a>
            ))}
            <span aria-hidden className="h-px w-5 bg-line" />
          </nav>
        </div>
        <div
          aria-hidden
          className="hero-scroll-cue absolute bottom-7 left-10 z-10 hidden items-center gap-3 sm:flex"
        >
          <span className="kicker !text-ink-dim">scroll to explore</span>
          <span className="h-px w-8 bg-line" />
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
        <ExperienceSection />
      </section>

      {/* ══ II · THE STORY ════════════════════════════════════ */}
      <Bridge text="how it started, in my own words —" />
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-8" id="story">
        <Head caps="The" serif="story." />
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-ink-dim">
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
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProfileCard
              avatarUrl="/shots/jay.png"
              miniAvatarUrl="/shots/jay.png"
              name="Jayanth Koppala"
              title="Full-stack engineer & founder"
              handle="JayBosshq"
              status="Shipping daily"
              contactText="Email"
              showUserInfo
              enableTilt
              innerGradient="linear-gradient(145deg,#10b98126 0%,#0a0c0bcc 100%)"
            />
          </div>
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
      {/* ══ V · THE RECEIPTS ══════════════════════════════════ */}
      <Bridge text="don't take my word for any of it —" />
      <section className="relative overflow-hidden pb-24 pt-8" id="receipts">
        <AuroraField dim />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Head caps="The" serif="receipts." />
          <ReceiptTweets />
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
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
          <GradientWaves
            horizonColor="#0a0c0b"
            waveColor="#065f46"
            crestColor="#10b981"
            speed={0.5}
            amplitude={0.7}
            brightness={0.8}
          />
        </div>
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
