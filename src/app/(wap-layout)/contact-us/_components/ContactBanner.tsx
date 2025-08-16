"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function ContactBanner() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section className="map" id="map">
      <div className="container mx-auto px-2">
        <div className="mapHead">
          <h1 className="mapHeader">
            Get in Touch with <span className="banner_yellow">Our Team</span>
          </h1>
          <p className="mapPara" ref={ref}>
            We have the team and know-how to help you scale{" "}
            <span className="faster">
              {inView && (
                <CountUp
                  start={0}
                  end={10}
                  duration={5}
                  separator=""
                  className="text-[#1b4f72]"
                  suffix="X"
                />
              )}
            </span>{" "}
            faster.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactBanner;
