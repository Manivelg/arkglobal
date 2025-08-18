import React from "react";
import Home from "./home/page";
import { Metadata } from "next";
import { AllMetadata } from "@/metadata/AllMetadata";

// Meta data
export const metadata: Metadata = AllMetadata({});

function page() {
  return <Home />;
}

export default page;
