import React from "react";
import Home from "./home/page";
import { Metadata } from "next";
import { AllMetadata } from "@/metadata/AllMetadata";

// Meta data
export const metadata: Metadata = AllMetadata({
  title:
    "ARK GLOBAL PTE LTD | Marine Advisors | Malacca–Singapore Straits Pilot Services",
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
  },
});

function page() {
  return <Home />;
}

export default page;
