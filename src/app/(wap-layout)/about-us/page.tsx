import React from "react";
import { Metadata } from "next";
import { AllMetadata } from "@/metadata/AllMetadata";
import Banner from "./_components/Banner";
import CoreValues from "./_components/CoreValues";
import SliderImg from "./_components/SliderImg";
import ContactUs from "./_components/ContactUs";
import Teammates from "./_components/Teammates";

// Meta data
export const metadata: Metadata = AllMetadata({
  title: "About ARK GLOBAL PTE LTD | Global Marine Advisory Experts",
  description:
    "Founded in Singapore in 2004, ARK GLOBAL PTE LTD is a marine advisory firm offering pilot services, navigation assessments, and port captain support across 10+ countries.",
  keywords:
    "About ARK GLOBAL, Marine Experts, Company Profile, VLCC Masters, Marine Safety, Port Captain Services, Global Marine Operations",
  openGraph: {
    title: "About ARK GLOBAL PTE LTD | Marine Pilot Services Since 2004",
    description:
      "Discover the story of ARK GLOBAL — a pioneer in marine advisory and pilotage services across the Malacca–Singapore Straits and international waters.",
    url: `https://www.arkglobalworldwide.com`,
    siteName: "ARK Global Group",
    type: "website",
  },
});

function page() {
  return (
    <>
      <Banner />
      <CoreValues />
      <SliderImg />
      <Teammates />
      <ContactUs />
    </>
  );
}

export default page;
