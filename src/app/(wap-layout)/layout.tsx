import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import { AllMetadata } from "@/metadata/AllMetadata";
import { PrimeReactProvider } from "primereact/api";
import { Metadata } from "next";
import ScrollToTop from "./common/ScrolltoTop";

// Meta data
export const metadata: Metadata = AllMetadata();

export default function WrapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </PrimeReactProvider>
  );
}
