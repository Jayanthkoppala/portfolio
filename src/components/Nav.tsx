"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { getCalApi } from "@calcom/embed-react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { identity } from "@/config/portfolio";

const CAL_LINK = identity.calLink;
const CAL_NAMESPACE = "book-a-call";
const CAL_CONFIG = JSON.stringify({ layout: "month_view" });

const BOOKING_FALLBACK = `mailto:${identity.email}?subject=${encodeURIComponent(
  "Portfolio — book a call"
)}`;
const BOOKING_HREF = identity.bookingUrl ?? BOOKING_FALLBACK;
const BOOKING_IS_EXTERNAL = Boolean(identity.bookingUrl);
const CAN_BOOK = Boolean(CAL_LINK) || BOOKING_IS_EXTERNAL;
const BOOKING_LABEL = CAN_BOOK ? "Book a Call" : "Email Jay";
const BOOKING_SHORT_LABEL = CAN_BOOK ? "Call" : "Email";
const BOOKING_ARIA = CAN_BOOK
  ? "Book a call with Jay"
  : "Email Jay to book a call";

// The embed script is pulled in when the browser goes idle rather than during
// first paint: the booking popup is never the reason someone lands here, so it
// should not compete with the hero for bandwidth.
function useCalEmbed() {
  const { resolvedTheme } = useTheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!CAL_LINK) return;
    let cancelled = false;

    const load = async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#087f5b" },
          dark: { "cal-brand": "#10b981" },
        },
      });
      setReady(true);
    };

    const handle = window.requestIdleCallback
      ? window.requestIdleCallback(() => void load(), { timeout: 2000 })
      : window.setTimeout(() => void load(), 300);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  // Keep the popup on the same side of the light/dark switch as the site.
  useEffect(() => {
    if (!CAL_LINK || !ready) return;
    let cancelled = false;

    void (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;
      cal("ui", { theme: resolvedTheme === "light" ? "light" : "dark" });
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, resolvedTheme]);

  return ready;
}

function BookingCta({
  className,
  label,
  ready,
}: {
  className: string;
  label: string;
  ready: boolean;
}) {
  if (CAL_LINK) {
    return (
      <button
        type="button"
        data-cal-namespace={CAL_NAMESPACE}
        data-cal-link={CAL_LINK}
        data-cal-config={CAL_CONFIG}
        aria-label={BOOKING_ARIA}
        className={className}
        onClick={() => {
          // If someone beats the idle load to the click, send them to the
          // hosted page rather than swallowing the tap.
          if (!ready) {
            window.open(
              `https://cal.com/${CAL_LINK}`,
              "_blank",
              "noreferrer"
            );
          }
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <a
      href={BOOKING_HREF}
      target={BOOKING_IS_EXTERNAL ? "_blank" : undefined}
      rel={BOOKING_IS_EXTERNAL ? "noreferrer" : undefined}
      aria-label={BOOKING_ARIA}
      className={className}
    >
      {label}
    </a>
  );
}

const NAV_LINKS = [
  { label: "Home", href: "#home", sections: ["home"], size: "home" },
  { label: "Work", href: "#desk", sections: ["desk"], size: "work" },
  { label: "Career", href: "#now", sections: ["now"], size: "about" },
  {
    label: "Story",
    href: "#story",
    sections: ["story"],
    size: "story",
  },
  {
    label: "Proof",
    href: "#stack",
    sections: ["stack", "receipts"],
    size: "proof",
  },
] as const;

const SECTION_ORDER = [
  "home",
  "desk",
  "now",
  "story",
  "stack",
  "receipts",
  "contact",
] as const;

const subscribeToHydration = () => () => undefined;

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = window.scrollY + Math.min(window.innerHeight * 0.34, 340);
      let next = "home";

      for (const id of SECTION_ORDER) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) next = id;
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8
      ) {
        next = "contact";
      }

      setActiveSection((current) => (current === next ? current : next));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  return activeSection;
}

function ThemeControl({ compact = false }: { compact?: boolean }) {
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <AnimatedThemeToggler
      theme={mounted && resolvedTheme === "light" ? "light" : "dark"}
      onThemeChange={setTheme}
      duration={520}
      fromCenter
      disabled={!mounted}
      className={`reference-nav__theme${
        compact ? " reference-nav__theme--compact" : ""
      }`}
      title={
        mounted && resolvedTheme === "light"
          ? "Use dark theme"
          : "Use light theme"
      }
    />
  );
}

function PrimaryLink({
  label,
  href,
  sections,
  size,
  activeSection,
}: (typeof NAV_LINKS)[number] & { activeSection: string }) {
  const active = sections.some((section) => section === activeSection);

  return (
    <a
      href={href}
      aria-current={active ? "location" : undefined}
      data-active={active}
      className={`reference-nav__item reference-nav__item--${size}`}
    >
      {label}
    </a>
  );
}

export default function Nav() {
  const activeSection = useActiveSection();
  const calReady = useCalEmbed();

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="reference-nav reference-nav--desktop"
      >
        {NAV_LINKS.map((link) => (
          <PrimaryLink
            key={link.href}
            {...link}
            activeSection={activeSection}
          />
        ))}

        <span aria-hidden className="reference-nav__divider" />
        <ThemeControl />
        <BookingCta
          className="reference-nav__cta"
          label={BOOKING_LABEL}
          ready={calReady}
        />
      </nav>

      <nav
        aria-label="Primary navigation"
        className="reference-nav reference-nav--tablet"
      >
        {NAV_LINKS.map((link) => (
          <PrimaryLink
            key={link.href}
            {...link}
            activeSection={activeSection}
          />
        ))}
        <span aria-hidden className="reference-nav__divider" />
        <ThemeControl compact />
        <BookingCta
          className="reference-nav__cta"
          label={BOOKING_LABEL}
          ready={calReady}
        />
      </nav>

      <nav
        aria-label="Primary navigation"
        className="reference-mobile-nav"
      >
        {NAV_LINKS.slice(0, 3).map((link) => (
          <PrimaryLink
            key={link.href}
            {...link}
            activeSection={activeSection}
          />
        ))}
        <ThemeControl compact />
        {NAV_LINKS.slice(3).map((link) => (
          <PrimaryLink
            key={link.href}
            {...link}
            activeSection={activeSection}
          />
        ))}
        <BookingCta
          className="reference-mobile-nav__item"
          label={BOOKING_SHORT_LABEL}
          ready={calReady}
        />
      </nav>
    </>
  );
}
