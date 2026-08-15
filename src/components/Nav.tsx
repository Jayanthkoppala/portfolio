"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { identity } from "@/config/portfolio";

const BOOKING_FALLBACK = `mailto:${identity.email}?subject=${encodeURIComponent(
  "Portfolio — book a call"
)}`;
const BOOKING_HREF = identity.bookingUrl ?? BOOKING_FALLBACK;
const BOOKING_IS_EXTERNAL = Boolean(identity.bookingUrl);
const BOOKING_LABEL = BOOKING_IS_EXTERNAL ? "Book a Call" : "Email Jay";

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
        <a
          href={BOOKING_HREF}
          target={BOOKING_IS_EXTERNAL ? "_blank" : undefined}
          rel={BOOKING_IS_EXTERNAL ? "noreferrer" : undefined}
          aria-label={
            BOOKING_IS_EXTERNAL
              ? "Book a call with Jay"
              : "Email Jay to book a call"
          }
          className="reference-nav__cta"
        >
          {BOOKING_LABEL}
        </a>
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
        <a
          href={BOOKING_HREF}
          target={BOOKING_IS_EXTERNAL ? "_blank" : undefined}
          rel={BOOKING_IS_EXTERNAL ? "noreferrer" : undefined}
          aria-label={
            BOOKING_IS_EXTERNAL
              ? "Book a call with Jay"
              : "Email Jay to book a call"
          }
          className="reference-nav__cta"
        >
          {BOOKING_LABEL}
        </a>
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
        <a
          href={BOOKING_HREF}
          target={BOOKING_IS_EXTERNAL ? "_blank" : undefined}
          rel={BOOKING_IS_EXTERNAL ? "noreferrer" : undefined}
          aria-label={
            BOOKING_IS_EXTERNAL
              ? "Book a call with Jay"
              : "Email Jay to book a call"
          }
          className="reference-mobile-nav__item"
        >
          {BOOKING_IS_EXTERNAL ? "Call" : "Email"}
        </a>
      </nav>
    </>
  );
}
