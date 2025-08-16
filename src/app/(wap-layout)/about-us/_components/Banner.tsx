"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React from "react";
import WeAre from "./WeAre";

function Banner() {
  const router = useRouter();

  const gotoContactPage = () => {
    router.push("/contact-us");
  };

  return (
    <>
      <section className="aboutBanner" id="aboutBanner">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-12 gap-5">
            <div className="lg:col-span-7 md:col-span-7 col-span-12 sm:col-span-12">
              <div className="bannerHead">
                <h1 className="bannerHeader">
                  One <span className="banner_yellow">Global Vision</span>,
                  Redefining Marine Services Worldwide
                </h1>
                <p className="bannerPara">
                  ARK Global ensures reliable, round-the-clock marine and
                  offshore solutions with expert teams across key international
                  shipping hubs.
                </p>
                <div className="homeButton gap-5 flex items-center justify-center">
                  <Button
                    label="Contact Us"
                    className="contact_button padd_set"
                    onClick={gotoContactPage}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="desktop_about">
            <WeAre />
          </div>
        </div>
      </section>
      <div className="mobile_about">
        <WeAre />
      </div>
    </>
  );
}

export default Banner;
