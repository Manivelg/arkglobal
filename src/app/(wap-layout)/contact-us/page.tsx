import { AllMetadata } from "@/metadata/AllMetadata";
import { Metadata } from "next";
import React from "react";
import NewContact from "./_components/NewContact";
import Map from "./_components/Map";
import ContactBanner from "./_components/ContactBanner";
import Address from "./_components/Address";
import Location from "./_components/Location";

// Meta data
export const metadata: Metadata = AllMetadata({
  title: "Contact ARK GLOBAL PTE LTD | 24/7 Marine Advisory Support",
  description:
    "Get in touch with ARK GLOBAL PTE LTD. Reach our marine advisory team in Singapore, Malaysia, India, or Indonesia 24/7 via WhatsApp or email.",
  keywords:
    "Contact ARK GLOBAL, Marine Support, Ship Services Singapore, Marine Advisors, 24/7 Marine Help, VLCC Pilotage Contact",
  openGraph: {
    title: "Contact ARK GLOBAL PTE LTD | Global Marine Services",
    description:
      "Reach out to our experienced marine team for pilotage, advisory, or training. Available 24/7 globally.",
    url: `https://www.arkglobalworldwide.com`,
    siteName: "ARK Global Group",
    type: "website",
  },
});

function page() {
  return (
    <>
      <ContactBanner />
      <Map />
      <Address />
      <NewContact />
      <Location />
    </>
  );
}

export default page;
