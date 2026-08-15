import Ribbon from "@/components/Ribbon";
import Nav from "@/components/Nav";
import ExperienceSection from "@/components/ExperienceSection";
import TechSplit from "@/components/TechSplit";
import ReceiptTweets from "@/components/ReceiptTweets";
import ContactEnd from "@/components/ContactEnd";
import Board from "@/components/Board";
import ActivityGrid from "@/components/ActivityGrid";
import Hero from "@/components/Hero";
import ProfileCard from "@/components/ProfileCard";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Highlighter } from "@/components/ui/highlighter";
import { about, identity } from "@/config/portfolio";

function Head({
  caps,
  serif,
  className = "",
}: {
  caps: string;
  serif: string;
  className?: string;
}) {
  return (
    <h2 className={`mb-12 leading-none ${className}`}>
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
      <ScrollProgress className="h-[2px] !bg-none !bg-accent" />
      <Nav />

      {/* ══ HERO — personal typographic poster ════════════════ */}
      <Hero />

      {/* ══ II.5 · THE DESK — live bento ══════════════════════ */}
      <section
        className="relative mx-auto max-w-[1400px] px-4 pb-12 pt-16 before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-line sm:px-6 sm:pt-24 sm:before:inset-x-6 xl:px-12 xl:before:inset-x-12"
        id="desk"
      >
        <Head caps="Meanwhile," serif="at the desk." />
        <Board />
      </section>

      <Ribbon
        phrases={[
          "receipts over resumes",
          "end to end",
          "since sixteen",
          "ships daily",
          "bengaluru built",
          "cooking season",
        ]}
      />

      {/* ══ I · WHERE I'VE WORKED — now, then before ══════════ */}
      <section
        className="mx-auto min-h-[100svh] max-w-[1400px] px-4 pb-20 pt-8 sm:min-h-[calc(100svh-5.5rem)] sm:px-6 sm:pb-16 sm:pt-8 lg:px-8 lg:py-6 min-[960px]:min-h-[calc(100svh-6.5rem)] xl:px-12"
        id="now"
      >
        <Head
          caps="Where I've"
          serif="worked."
          className="career-heading !mb-0"
        />
        <ExperienceSection />
      </section>

      {/* ══ II · THE STORY ════════════════════════════════════ */}
      <Bridge text="how it started, in my own words —" />
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-8 sm:pb-20" id="story">
        <Head caps="The" serif="story." />
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
        <div className="min-w-0 max-w-3xl space-y-6 text-lg leading-relaxed text-ink-dim">
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
          <div className="mx-auto w-full min-w-0 max-w-[380px] lg:sticky lg:top-28 lg:self-start">
            <ProfileCard
              avatarUrl="/shots/jay.png"
              miniAvatarUrl="/shots/jay.png"
              name="Jayanth Koppala"
              title="Full-stack engineer & founder"
              handle="JayBosshq"
              status="Shipping daily"
              contactText="Email"
              contactHref={`mailto:${identity.email}?subject=${encodeURIComponent("Portfolio — let's build something")}`}
              showUserInfo
              showHolo={false}
              enableTilt
              behindGlowEnabled={false}
              innerGradient="linear-gradient(145deg,rgba(10,12,11,.98) 0%,rgba(22,25,23,.96) 100%)"
            />
          </div>
        </div>

      </section>

      {/* ══ III · SKILLS + PROOF ══════════════════════════════ */}
      <section
        aria-labelledby="stack-title"
        className="mx-auto max-w-[1400px] px-4 pb-24 pt-8 sm:px-6 sm:pt-16 lg:pt-20 xl:px-12"
        id="stack"
      >
        <ActivityGrid intro={<TechSplit />} />
      </section>

      {/* ══ IV · WHAT I'VE BUILT ══════════════════════════════ */}
      {/* ══ V · THE RECEIPTS ══════════════════════════════════ */}
      <section
        aria-labelledby="receipts-title"
        className="relative border-t border-line pb-16 pt-20 sm:pb-20 sm:pt-28"
        id="receipts"
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-12">
          <ReceiptTweets />
        </div>
      </section>

      {/* ══ VII · CONTACT ═════════════════════════════════════ */}
      <footer
        className="relative border-t border-line"
        id="contact"
      >
        <div className="relative mx-auto max-w-[1400px] px-4 pb-24 pt-7 sm:px-6 sm:py-6 xl:px-12">
          <ContactEnd />
        </div>
      </footer>
    </main>
  );
}
