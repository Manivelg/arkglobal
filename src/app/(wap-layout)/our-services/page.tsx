import React from "react";
import ServiceBanner from "./_components/ServiceBanner";
import About from "./_components/About";
import Mixitup from "./_components/Mixitup";
import ServiceList from "./_components/ServiceList";
import { AllMetadata } from "@/metadata/AllMetadata";
import { Metadata } from "next";

// Meta data
export const metadata: Metadata = AllMetadata({
  title:
    "Marine Services by ARK GLOBAL | Navigation, STS, Port Captain, Lay-up & More",
  description:
    "Explore comprehensive marine services by ARK GLOBAL including pilotage, navigation audits, STS operations, cargo assessment, lay-up services, onboard training, and emergency response.",
  keywords:
    "Marine Services, Navigation Audit, STS Operations, Port Captain, Lay-up Management, Safety Audits, Marine Advisors, VLCC Pilots, Crew Training, ARK GLOBAL Services",
  openGraph: {
    title: "Marine Services | ARK GLOBAL PTE LTD",
    description:
      "We offer a full range of marine services from navigation and audits to lay-up, training, safety inspections and emergency handling.",
    url: `https://www.arkglobalworldwide.com`,
    siteName: "ARK Global Group",
    type: "website",
  },
});

function page() {
  return (
    <div className="servicePage">
      <ServiceBanner />
      <About />
      <ServiceList />
      <Mixitup />
    </div>
  );
}

export default page;
