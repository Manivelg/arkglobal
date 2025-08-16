import React from "react";
import { ValueLists } from "../_actions/coreValues";
import Image from "next/image";

function CoreValues() {
  const ValueData = ValueLists[0].data;

  return (
    <>
      <section className="coreValues" id="core_value">
        <div className="container mx-auto px-2">
          <div className="coreHeader">
            <h2 className="coreHead">Our Core Values</h2>
            <p className="corePara">
              To be trusted marine partner, empowering safe and efficient
              shipping through expert advisory, compliance, and operational
              services.
            </p>
          </div>

          <div className="coreLists">
            {ValueData.map((item) => (
              <div className="ourValues" key={item.id}>
                <div className="">
                  <div className="coreImg">
                    <Image
                      src={item.Image}
                      className="ourpic"
                      alt={item.CoreHeader}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="valueHeader">
                    <p className="valueHead">{item.CoreHeader}</p>
                    <p className="valueLine">
                      <span className="coreLine"></span>
                    </p>
                    <p className="valuePara">{item.CorePara}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default CoreValues;
