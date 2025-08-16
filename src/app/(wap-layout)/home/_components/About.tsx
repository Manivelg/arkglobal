import React from "react";
import { ContentList } from "../_actions/content";
import Image from "next/image";

function About() {
  const AboutList = ContentList[0].data;
  return (
    <>
      <section className="homeAbout">
        <div className="container mx-auto px-2">
          <div className="aboutHeader">
            <h2 className="aboutHead">About Us</h2>
            <p className="aboutPara">
              We provide comprehensive marine and offshore solutions, including
              pilotage, port operations, and technical support, ensuring safe
              and efficient vessel operations.
            </p>
          </div>

          <div className="weAre">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 aboutContent">
              {AboutList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white py-6 px-4 transition duration-300 aboutusHead"
                >
                  <div className="bg-white">
                    <div className="flex justify-center">
                      <Image
                        src={item.Image}
                        alt={item.contentHeader}
                        className="aboutPic"
                        width={90}
                        height={90}
                      />
                    </div>
                    <p className="aboutusHeader">{item.contentHeader}</p>
                    <p className="aboutusPara">{item.contentPara}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
