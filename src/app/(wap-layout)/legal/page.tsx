import { AllMetadata } from "@/metadata/AllMetadata";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = AllMetadata({
  title: `Legal Notice`,
});

function page() {
  return <div>Legal Notice</div>;
}

export default page;
