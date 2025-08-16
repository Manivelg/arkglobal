"use client";
import React, { useEffect, useState } from "react";
import ServiceList from "./ServiceList";
import { Button } from "primereact/button";
import MobileServiceList from "./MobileServiceList";
import { useRouter } from "next/navigation";

function Services() {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gotoServicePage = () => {
    router.push("/our-services");
  };

  return (
    <section className="mission">
      <div className="container px-4 mx-auto">
        <div className="missionHeader">
          <h2 className="missionHead">Our Services</h2>
          <p className="missionPara">
            We provide comprehensive marine and offshore solutions, including
            pilotage, port operations, and technical support.
          </p>
        </div>
        {isMobile ? <MobileServiceList /> : <ServiceList />}

        <div className="text-center pt-16 more_service">
          <Button
            label="Click to Learn more"
            className="submit_button padd_set"
            onClick={gotoServicePage}
          />
        </div>
      </div>
    </section>
  );
}

export default Services;
