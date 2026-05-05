import type { Metadata } from "next";
import { DM_Sans, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://joes-aluminum-llc-grm.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Joe's Aluminum. Screens & Aluminum Work. The Villages, Lake County FL",
  description:
    "Lanai screens, pool cages, screen doors, vinyl windows, gutters. Joe answers the phone and gives a number on the first call. The Villages, Fruitland Park, Lake County.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Joe's Aluminum L.L.C.",
    title: "Joe's Aluminum. Screens & Aluminum Work",
    description:
      "One-hundred-fifteen reviews. Five stars on Google. The aluminum guy The Villages already calls.",
    // images populated by src/app/opengraph-image.tsx (file-based metadata)
  },
  twitter: {
    card: "summary_large_image",
    title: "Joe's Aluminum. Screens & Aluminum Work",
    description:
      "One-hundred-fifteen reviews. Five stars on Google. The aluminum guy The Villages already calls.",
    // images populated by src/app/twitter-image.tsx (file-based metadata)
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    additionalType: ["RoofingContractor", "GeneralContractor"],
    name: "Joe's Aluminum L.L.C.",
    url: SITE_URL,
    telephone: "+1-352-602-3785",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5121 Magnolia Ridge Road",
      addressLocality: "Fruitland Park",
      addressRegion: "FL",
      postalCode: "34731",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.8696869,
      longitude: -81.868015,
    },
    foundingDate: "2017",
    sameAs: ["https://www.facebook.com/Joesaluminumllc/"],
    serviceType: [
      "Screen repair",
      "Screen replacement",
      "Vinyl window repair",
      "Aluminum gutter repair",
      "Aluminum roof leak repair",
      "Pool cage screening",
      "Lanai screening",
    ],
    areaServed: [
      { "@type": "Place", name: "The Villages, FL" },
      { "@type": "Place", name: "Fruitland Park, FL" },
      { "@type": "Place", name: "Lake County, FL" },
      { "@type": "Place", name: "Sumter County, FL" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "115",
    },
    openingHours: "Mo-Su 09:00-19:00",
  };

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
