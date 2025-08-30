import Image from "next/image";
import { Button } from "primereact/button";
import React from "react";

function ServiceBanner() {
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";
  return (
    <>
      <section className="serviceBanner" id="service_banner">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-12 gap-5">
            <div className="lg:col-span-6 md:col-span-6 col-span-12 sm:col-span-12">
              <div className="serviceHeader">
                <h1 className="serviceHead">
                  Empowering Maritime Excellence,{" "}
                  <span className="service_yellow">One Service</span> at a time
                </h1>
                <p className="servicePara">
                  Our qualified Port Captains and Engineer Superintendents are
                  based across Indian ports, ensuring support and smooth
                  operations wherever needed.
                </p>
                <div className="serviceButton">
                  <Button
                    label="Contact Us"
                    className="contact_button padd_set"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 md:col-span-6 col-span-12 sm:col-span-12">
              <div className="serviceImage">
                <Image
                  src="/assets/services/service_banner.webp"
                  className="servicePic"
                  alt={companyUrl}
                  width={300}
                  height={300}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceBanner;
