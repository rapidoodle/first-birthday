import type { Metadata } from "next";
import { Fraunces, Quicksand, Great_Vibes } from "next/font/google";
import "./globals.css";
import { event } from "@/lib/config";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const script = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
});

export const metadata: Metadata = {
  title: `${event.childName}'s ${event.age}st Birthday ${event.accentEmoji} | ${event.theme}`,
  description: `Join us as we celebrate ${event.fullName}'s ${event.age} birthday on ${event.dateLabel}. RSVP inside!`,
  metadataBase: new URL(event.siteUrl),
  robots: { index: false, follow: false }, // private family site — keep off Google
  openGraph: {
    title: `${event.accentEmoji} ${event.childName} is turning ${event.age}!`,
    description:
      event.heroSubtitle,
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦖</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${script.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
