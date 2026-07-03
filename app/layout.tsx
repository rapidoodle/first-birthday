import type { Metadata } from "next";
import { Baloo_2, Quicksand, Pacifico } from "next/font/google";
import "./globals.css";
import { event } from "@/lib/config";

const display = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const script = Pacifico({
  subsets: ["latin"],
  variable: "--font-script",
  weight: "400",
});

export const metadata: Metadata = {
  title: "A Fairy First Birthday for Niane 🧚 | Invitation",
  description: `Join us as we celebrate ${event.fullName}'s first birthday on ${event.dateLabel}. RSVP inside!`,
  metadataBase: new URL(event.siteUrl),
  openGraph: {
    title: "🧚 A Fairy First Birthday for Niane ✨",
    description:
      "One whole year of smiles, giggles, and unforgettable memories. Join us for a pastel fairyland celebration!",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧚</text></svg>",
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
