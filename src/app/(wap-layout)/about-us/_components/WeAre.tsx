import Image from "next/image";
import React from "react";

function WeAre() {
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";

  return (
    <>
      <div className="weAre">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-12 gap-5 weBg">
            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 small:col-span-12 weareHeader">
              <p className="weareHead">
                Powering Marine Excellence{" "}
                <span className="weareblock">
                  On Deck and <span className="banner_yellow">Beyond</span>
                </span>
              </p>
            </div>

            <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 small:col-span-12 wePara">
              <div className="wesetPara">
                <div className="glitter">
                  <Image
                    src="/assets/about-us/banner/glitter.svg"
                    alt={companyUrl}
                    className="glitterImg pointer-events-none"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="">
                  <Image
                    src="/assets/about-us/banner/captain.webp"
                    className="weareImg pointer-events-none"
                    width={100}
                    height={100}
                    alt={companyUrl}
                  />
                </div>
                <p className="weArePara">
                  Founded in Singapore in 2004, ARK Global delivers
                  cost-effective, top-quality marine and offshore services. With
                  24/7 support centers across Asia, the Middle East, Australia,
                  and the USA, we serve as a trusted one-stop partner for safe
                  and efficient ship operations worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeAre;
