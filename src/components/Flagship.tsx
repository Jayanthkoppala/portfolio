import { Iphone } from "@/components/ui/iphone";
import { BorderBeam } from "@/components/ui/border-beam";
import ActivityGrid from "@/components/ActivityGrid";

/**
 * NOW — the flagship. The single canonical BOSS pitch on the page:
 * live product, real phone, real activity wall. Everything else links here.
 */
export default function Flagship() {
  return (
    <div className="space-y-4">
      <div className="glass glass-ember relative overflow-hidden !rounded-3xl">
        <BorderBeam size={160} duration={10} colorFrom="#10b981" colorTo="#34d399" />
        <div className="grid items-center gap-8 p-8 sm:grid-cols-[1.2fr_0.8fr] sm:p-10">
          <div className="min-w-0">
            <p className="kicker !text-accent">now · jun 2026 — present</p>
            <p
              className="mt-3 text-6xl uppercase leading-none text-ink sm:text-7xl"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              BOSS<span className="text-accent">!</span>
            </p>
            <p className="serif-accent mt-3 text-2xl text-ink-dim">
              round-one hiring, done.
            </p>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink-dim">
              A recruiter opens one role and gets 242 applications, most in the
              first hour. BOSS screens all of them, talks to the ones worth
              talking to, and hands back a top 5–10 with reasons in 48 hours.
              Runs on WhatsApp, reads the Naukri pile, holds a live voice call.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://bosshq.in"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105"
              >
                bosshq.in ↗
              </a>
              <span className="kicker">sarvam ai startup program</span>
              <span className="kicker">· sole developer</span>
            </div>
          </div>
          <div className="mx-auto w-[210px] rotate-[5deg] transition-transform duration-500 hover:rotate-0 sm:w-[230px]">
            <Iphone src="/shots/boss-hero.png" className="size-full" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[2fr_1fr] [&>*]:min-w-0">
        <ActivityGrid />
        <a
          href="https://qatobit.com"
          target="_blank"
          rel="noreferrer"
          className="glass group flex flex-col justify-center !rounded-3xl p-6"
        >
          <p className="kicker">also now · part-time</p>
          <p className="mt-2 text-2xl font-bold">
            Qatobit{" "}
            <span className="serif-accent text-ink-dim">founding engineer</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Crypto index investing for India — QSI indices, proof of reserves,
            INR rails.
          </p>
          <span className="kicker mt-4 transition-colors group-hover:!text-accent">
            qatobit.com ↗
          </span>
        </a>
      </div>
    </div>
  );
}
