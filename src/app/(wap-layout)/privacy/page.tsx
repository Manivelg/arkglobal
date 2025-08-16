import { AllMetadata } from "@/metadata/AllMetadata";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = AllMetadata({
  title: `Privacy Policy`,
});

function page() {
  return <div>Privacy Policy</div>;
}

export default page;
