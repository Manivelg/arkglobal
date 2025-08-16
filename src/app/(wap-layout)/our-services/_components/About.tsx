import Image from "next/image";
import React from "react";

function About() {
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";
  return (
    <>
      <section className="serviceAbout">
        <div className="container mx-auto px-4">
          <div className="serviceBg">
            <div className="grid grid-cols-12 gap-2">
              <div className="lg:col-span-5 md:col-span-5 sm:col-span-12 small:col-span-12">
                <div className="serviceAboutHeader">
                  <p className="serviceAboutHead">
                    Trusted Maritime Solutions{" "}
                    <span className="aboutBlock">
                      by <span className="service_yellow">ARK Global</span>
                    </span>
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 md:col-span-7 sm:col-span-12 small:col-span-12">
                <div className="service AboutContent">
                  <Image
                    src="/assets/services/service.webp"
                    alt={companyUrl}
                    width={80}
                    height={80}
                    className="serviceName pointer-events-none"
                  />
                  <div className="">
                    <p className="serviceParabold">
                      Delivering Precision. Ensuring Performance. Empowering
                      Progress.
                    </p>
                    <p className="servicePara">
                      we take pride in offering specialized maritime services
                      that uphold the highest standards of safety, efficiency,
                      and expertise. <span className="more">Know more</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
