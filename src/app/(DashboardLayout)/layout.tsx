// Dependencies
import { Metadata } from "next";

// Components
import { AllMetadata } from "@/metadata/AllMetadata";

// Meta data
export const metadata: Metadata = AllMetadata();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard-container">
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
