import type { Metadata, Viewport } from "next";
import "@fontsource/bebas-neue/latin-400.css";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://benitchris.github.io";
const socialImageUrl = `${siteUrl}${basePath}/images/hero.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Prince Barber | Sharp Cuts. Clean Style. Your Confidence.",
  description:
    "Prince Barber is a modern barbershop for precision cuts, considered grooming, and home visits. Book your chair — in the studio or at your door.",
  keywords: [
    "Prince Barber",
    "barbershop",
    "barber",
    "haircut",
    "skin fade",
    "beard trim",
    "home visit barber",
    "mobile barber",
    "Nairobi barber",
  ],
  openGraph: {
    title: "Prince Barber | Sharp Cuts. Clean Style.",
    description:
      "Precision barbering and grooming, in the studio or at your door. Book with Prince Barber on WhatsApp.",
    type: "website",
    locale: "en_KE",
    siteName: "Prince Barber",
    images: [
      {
        url: socialImageUrl,
        width: 1376,
        height: 768,
        alt: "A barber giving a precision haircut in a dark, upscale barbershop.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Barber | Sharp Cuts. Clean Style.",
    description:
      "Precision barbering and grooming, in the studio or at your door.",
    images: [socialImageUrl],
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0907",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE">
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[120] -translate-y-24 bg-gold px-4 py-3 text-xs font-bold uppercase tracking-widest text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
