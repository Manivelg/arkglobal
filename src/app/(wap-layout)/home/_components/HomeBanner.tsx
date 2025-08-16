"use client";
import { Button } from "primereact/button";
import React from "react";
import VideoPlayer from "../../common/VideoPlayer";
import { useRouter } from "next/navigation";

function HomeBanner() {
  const router = useRouter();
  const gotoServicePage = () => {
    router.push("/our-services");
  };
  const gotoContactPage = () => {
    router.push("/contact-us");
  };
  return (
    <>
      <section className="homeBanner">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="headBanner">
                <h1 className="bannerHeader">
                  Your Trusted Partner in{" "}
                  <span className="banner_yellow">Marine Advisiory</span>{" "}
                  <span className="block">&amp; Offshore Services</span>
                </h1>
                <p className="headPara">
                  We have our Team of fully qualified Port Captains and Engineer
                  Superintendents based in India who handle operations and give
                  the needed support at{" "}
                  <span className="india">all ports in India.</span>
                </p>
              </div>
              <div className="homeButton gap-5 flex items-center justify-center">
                <Button
                  label="Contact Us"
                  className="contact_button padd_set"
                  onClick={gotoContactPage}
                />
                <Button
                  label="Click to Learn more"
                  className="submit_button"
                  onClick={gotoServicePage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ark_video">
        <VideoPlayer srcMp4="/video/ark_global.mp4" className="videoPlayer" />
      </section>
    </>
  );
}

export default HomeBanner;
