"use client";
import React, { useState, useEffect } from "react";
import ReachMob from "./ReachMob";
import ReachDesk from "./ReachDesk";

function Reach() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 767);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className="reach" id="we_are">
        <div className="container mx-auto px-2">
          <p className="reachHead">
            Our Global <span className="reachImpact">Impact at a Glance</span>
          </p>
        </div>
        {isMobile ? (
          <div className="container mx-auto px-2">
            <ReachDesk />
          </div>
        ) : (
          <ReachMob />
        )}
      </section>
    </>
  );
}

export default Reach;
