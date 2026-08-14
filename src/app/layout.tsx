import type { Metadata } from "next";
import { Anton, Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Jayanth Koppala",
  description:
    "Full-stack engineer & founder. Shipped with hackathon teams, led engineers in production, built whole products solo. Currently building BOSS.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${archivo.variable} ${instrument.variable}`}>
        {children}
      </body>
    </html>
  );
}
