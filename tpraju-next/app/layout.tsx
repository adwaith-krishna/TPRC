import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const viewport = {
  themeColor: "#FFB800",
};

export const metadata: Metadata = {
  title: "TP Raju Constructions | Scaffolding Rental & Industrial Engineering",
  description:
    "Premium scaffolding rentals, mechanical fabrication, and industrial engineering services in India since 2008. Safe, reliable, and ISO 9001:2015 certified.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tprconstructions.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TP Raju Constructions | Scaffolding Rental & Industrial Engineering",
    description: "Premium scaffolding rentals, mechanical fabrication, and industrial engineering services in India since 2008.",
    url: "https://tprconstructions.in",
    siteName: "TP Raju Constructions",
    images: [
      {
        url: "/left.png",
        width: 1200,
        height: 630,
        alt: "TP Raju Constructions Scaffolding & Engineering Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TP Raju Constructions | Scaffolding Rental & Industrial Engineering",
    description: "Premium scaffolding rentals, mechanical fabrication, and industrial engineering services in India since 2008.",
    images: ["/left.png"],
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tprconstructions.in";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ConstructionBusiness",
  "name": "TP Raju Constructions",
  "image": `${siteUrl}/left.png`,
  "@id": `${siteUrl}/#organization`,
  "url": siteUrl,
  "telephone": "+919447590954",
  "email": "tprconstructions2020@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "16/313A, TPR Business Plaza building, Near BPCL-KR, Ambalamugal P.O.",
    "addressLocality": "Ernakulam",
    "addressRegion": "Kerala",
    "postalCode": "682302",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 9.9816,
    "longitude": 76.2999
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.instagram.com/tprconstructions/?hl=en"
  ],
  "priceRange": "$$",
  "logo": `${siteUrl}/TPRC.png`
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} ${playfair.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`font-display bg-background-light dark:bg-background-dark text-charcoal dark:text-gray-100 antialiased transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
