import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import "@/styles/welcomesection.css";
import "@/styles/section2.css";
import "@/styles/section3.css";
import "@/styles/section4.css";
import "@/styles/section5.css";
import "@/styles/navbar.css";
import "@/styles/main.css";
import "@/styles/section-gallery.css";
import "@/styles/animations.css";

const SITE_URL = "https://flawlessbeauty.nl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flawless Beauty | Nagelsalon in Raalte",
    template: "%s | Flawless Beauty Raalte",
  },
  description:
    "Flawless Beauty is dé nagelsalon in Raalte voor BIAB, nailextensions, gelpolish en nailart. Persoonlijke aandacht en topkwaliteit door nagelstyliste Celine. Maak eenvoudig online een afspraak.",
  keywords: [
    "nagelsalon Raalte",
    "nagelstudio Raalte",
    "BIAB Raalte",
    "nailextensions Raalte",
    "gelpolish Raalte",
    "manicure Raalte",
    "nagelstyliste Raalte",
    "Flawless Beauty",
  ],
  authors: [{ name: "Flawless Beauty" }],
  creator: "Flawless Beauty",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: "Flawless Beauty",
    title: "Flawless Beauty | Nagelsalon in Raalte",
    description:
      "Dé nagelsalon in Raalte voor BIAB, nailextensions, gelpolish en nailart. Persoonlijke aandacht en topkwaliteit.",
    images: [
      {
        url: "/img/celine-product.jpeg",
        alt: "Flawless Beauty — nagelsalon in Raalte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flawless Beauty | Nagelsalon in Raalte",
    description:
      "Dé nagelsalon in Raalte voor BIAB, nailextensions, gelpolish en nailart.",
    images: ["/img/celine-product.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/img/thumbnail_flawlessbeauty.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#484036",
};

// LocalBusiness structured data — helps Google place Flawless Beauty in local
// search results for "nagelsalon Raalte". Verify geo at maps before launch.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  "@id": `${SITE_URL}/#business`,
  name: "Flawless Beauty",
  description:
    "Nagelsalon in Raalte voor BIAB, nailextensions, gelpolish en nailart.",
  url: SITE_URL,
  telephone: "+31683524241",
  email: "flawlessbeauty@kpnmail.nl",
  image: `${SITE_URL}/img/celine-product.jpeg`,
  logo: `${SITE_URL}/img/logozwart.svg`,
  priceRange: "€€",
  currenciesAccepted: "EUR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Warmelo 5",
    postalCode: "8103 HT",
    addressLocality: "Raalte",
    addressRegion: "Overijssel",
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.3875,
    longitude: 6.2764,
  },
  areaServed: { "@type": "City", name: "Raalte" },
  sameAs: [
    "https://www.instagram.com/flawlessbeauty.nl",
    "https://www.facebook.com/profile.php?id=61564057466537",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "13:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "09:00",
      closes: "17:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Sacramento&family=Work+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
