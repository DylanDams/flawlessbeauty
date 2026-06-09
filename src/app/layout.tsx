import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import "@/styles/animations.css";
import "@/styles/redesign.css";
import "@/styles/redesign-mobile.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

const SITE_URL = "https://flawlessbeauty.nl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flawless Beauty | Nagelsalon in Raalte",
    template: "%s | Flawless Beauty Raalte",
  },
  description:
    "Flawless Beauty is dé nagelsalon in Raalte voor BIAB, nailextensions, gelpolish en nailart. Persoonlijke aandacht en topkwaliteit door nagelstyliste Celine.",
  icons: { icon: "/img/thumbnail_flawlessbeauty.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#484036",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: "Flawless Beauty",
  url: SITE_URL,
  telephone: "+31683524241",
  email: "flawlessbeauty@kpnmail.nl",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Warmelo 5",
    postalCode: "8103 HT",
    addressLocality: "Raalte",
    addressCountry: "NL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${cormorant.variable} ${workSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
