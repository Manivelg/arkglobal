import { AllMetadata } from "@/metadata/AllMetadata";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = AllMetadata({
  title: `Terms and Conditions`,
});

function page() {
  return <div>Terms &amp; Conditions</div>;
}

export default page;
