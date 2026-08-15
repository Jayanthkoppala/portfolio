import type { Metadata } from "next";
import { Anton, Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import ThemeProvider from "@/components/ThemeProvider";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const SITE = "https://jayanthkoppala.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Jayanth Koppala — Full-stack engineer & founder",
    template: "%s · Jayanth Koppala",
  },
  description:
    "Full-stack engineer & founder in Bengaluru. Building BOSS!, an AI hiring agent for India. Every claim on this site carries a receipt — winning tweets, registry records, live products.",
  keywords: [
    "Jayanth Koppala",
    "full-stack engineer",
    "founder",
    "BOSS",
    "AI hiring",
    "Bengaluru",
    "portfolio",
    "voice AI",
    "blockchain developer",
  ],
  authors: [{ name: "Jayanth Koppala", url: SITE }],
  creator: "Jayanth Koppala",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "profile",
    url: SITE,
    siteName: "Jayanth Koppala",
    title: "Jayanth Koppala — Full-stack engineer & founder",
    description:
      "Building BOSS!, an AI hiring agent for India. Every claim carries a receipt.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jayanth Koppala — every claim carries a receipt.",
      },
    ],
    firstName: "Jayanth",
    lastName: "Koppala",
  },
  twitter: {
    card: "summary_large_image",
    site: "@JayBosshq",
    creator: "@JayBosshq",
    title: "Jayanth Koppala — Full-stack engineer & founder",
    description:
      "Building BOSS!, an AI hiring agent for India. Every claim carries a receipt.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: "#0a0c0b",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jayanth Koppala",
  url: SITE,
  image: `${SITE}/shots/jay.png`,
  jobTitle: "Full-stack engineer & founder",
  worksFor: { "@type": "Organization", name: "BOSS!", url: "https://bosshq.in" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  email: "mailto:jay@bosshq.in",
  sameAs: [
    "https://x.com/JayBosshq",
    "https://github.com/Jayanthkoppala",
    "https://www.linkedin.com/in/jayanth-koppala-71a8091b9/",
    "https://bosshq.in",
  ],
  knowsAbout: [
    "Full-stack development",
    "AI agents",
    "Voice AI",
    "Hiring technology",
    "Blockchain",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anton.variable} ${archivo.variable} ${instrument.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <Cursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
