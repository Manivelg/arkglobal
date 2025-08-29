// components/meta.ts
import { Metadata } from "next";

export const metadataBase = new URL("https://www.arkglobalworldwide.com");

export const AllMetadata = (
  customMetadata: Partial<Metadata> = {}
): Metadata => {
  return {
    metadataBase, // Required for proper OG image URLs
    title: `ARK GLOBAL PTE LTD | Trusted Marine Pilots for Malacca–Singapore Straits & VLCC Transit`,
    description:
      "ARK GLOBAL PTE LTD provides expert marine pilotage, VLCC transit advisory, and 24/7 marine audits in the Malacca–Singapore Straits. ISO-certified solutions for safe, efficient navigation.",
    keywords: [
      "Malacca Singapore Straits Pilotage",
      "VLCC Marine Pilots Singapore",
      "Ship Pilot Services Straits of Malacca",
      "Marine Advisory for Tankers",
      "STS Operations Experts",
      "Port Captain Services",
      "Ship Lay-Up Management Asia",
      "Navigation Risk Assessment",
      "Ark Global Worldwide",
    ].join(", "),
    authors: [{ name: "Ark Global Worldwide" }],
    openGraph: {
      title: "ARK GLOBAL PTE LTD | Marine Pilotage & Advisory | Singapore",
      description:
        "24/7 marine pilot services for VLCCs, tankers, and cargo ships transiting the Malacca–Singapore Straits. ISO-compliant audits and risk assessments.",
      url: "/", // Relative URL - metadataBase handles the domain
      siteName: "ARK GLOBAL PTE LTD",
      type: "website",
      locale: "en_SG",
      images: [
        {
          url: "/assets/arkglobal-opengraph.jpg", // Now resolves to full URL via metadataBase
          alt: "ARK GLOBAL Marine Pilots guiding VLCC in Malacca Straits",
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: "/", // Relative URL
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "Ark Global Worldwide",
      description:
        "24/7 marine pilot services for VLCCs, tankers, and cargo ships transiting the Malacca–Singapore Straits. ISO-compliant audits and risk assessments.",
      images: ["https://www.arkglobalworldwide.com/og-image.jpg"],
      creator: "@arkglobal",
    },
    // REMOVED: viewport and themeColor from here (moved to viewport.ts)
    other: {
      "apple-mobile-web-app-capable": "yes",
      distribution: "global",
      "revisit-after": "7 days",
      author: "ARK GLOBAL PTE LTD",
    },
    ...customMetadata,
  };
};
