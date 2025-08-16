import type { Metadata } from "next";
import { AllMetadata } from "@/metadata/AllMetadata";
import ErrorPage from "./(wap-layout)/common/ErrorPage/ErrorPage";

export const metadata: Metadata = AllMetadata({
  title: `Page Not Found`,
});

function Error() {
  return <ErrorPage />;
}

export default Error;
