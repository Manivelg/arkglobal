// components/meta.ts

import { Metadata } from "next";

export const AllMetadata = (
  customMetadata: Partial<Metadata> = {}
): Metadata => {
  return {
    title: `ARK GLOBAL PTE LTD | Marine Advisors | Malacca–Singapore Straits Pilot Services`,
    description:
      "ARK GLOBAL PTE LTD is a trusted marine advisory and pilot service provider specializing in Malacca–Singapore Straits transits. Established in Singapore, we offer 24/7 global support with a team of expert VLCC Masters and Marine Auditors.",
    keywords:
      "ARK GLOBAL, Marine Pilot Services, Malacca Singapore Straits, VLCC Transit, Marine Auditors, Navigation Assessment, STS Operations, Port Captain, Ship Lay-Up Services",
    openGraph: {
      title: "ARK GLOBAL PTE LTD | Marine Advisors | Global Marine Services",
      description:
        "Trusted marine advisors and pilotage experts for the Malacca–Singapore Straits and beyond. 24/7 operations across Singapore, Malaysia, India, and more.",
      url: `https://www.arkglobalworldwide.com`,
      siteName: "ARK Global Group",
      type: "website",
      images: [
        {
          url: `/assets/arkglobalworldwide.png`,
          alt: "arkglobalworldwide",
          width: 800,
          height: 600,
        },
      ],
    },
    other: {
      language: "English",
      MobileOptimized: "320",
      HandheldFriendly: "True",
      copyright: "arkglobalworldwide",
      "X-UA-Compatible": "IE=edge",
      "mobile-web-app-capable": "yes",
      "Content-Type": "text/html; charset=utf-8",
      robots: "index, follow",
      "revisit-after": "7 days",
      author: "arkglobalworldwide",
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
      "theme-color": "#353535",
    },
    alternates: {
      canonical: "https://arkglobalworldwide.com/",
    },
    ...customMetadata, // Merge custom values if provided
  };
};
