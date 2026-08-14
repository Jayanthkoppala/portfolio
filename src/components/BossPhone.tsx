import { Iphone } from "@/components/ui/iphone";
import { BorderBeam } from "@/components/ui/border-beam";

/** Founder card — real BOSS mobile screenshot inside the Magic UI iPhone frame. */
export default function BossPhone() {
  return (
    <div className="glass glass-ember relative overflow-hidden !rounded-3xl p-8 sm:col-span-2">
      <BorderBeam size={140} duration={9} colorFrom="#10b981" colorTo="#34d399" />
      <div className="grid items-center gap-6 sm:grid-cols-2">
        <div>
          <p className="kicker">founder of</p>
          <p
            className="mt-2 text-5xl uppercase leading-none text-ink"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            BOSS<span className="text-accent">!</span>
          </p>
          <p className="serif-accent mt-3 text-2xl text-ink-dim">
            round-one hiring, done.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-dim">
            242 applications in. A ranked shortlist of 5–10 out, with reasons,
            in 48 hours. Screens on WhatsApp, reads the Naukri pile, talks to
            candidates on a live call. One developer behind all of it.
          </p>
          <a
            href="https://bosshq.in"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg transition-transform hover:scale-105"
          >
            bosshq.in ↗
          </a>
        </div>
        <div className="mx-auto w-[230px] rotate-[6deg] transition-transform duration-500 hover:rotate-0">
          <Iphone src="/shots/boss-hero.png" className="size-full" />
        </div>
      </div>
    </div>
  );
}
