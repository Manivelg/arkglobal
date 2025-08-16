import React from "react";
import { MissionLists } from "../_actions/mission";
import Image from "next/image";

function MissionGoal() {
  const missionData = MissionLists[0].data;
  return (
    <div className="missionGoal grid grid-cols-12">
      {missionData.map((e, index) => {
        const isFirst = index === 0;
        return (
          <div
            className={`col-span-12 ${
              isFirst
                ? "lg:col-span-4 md:col-span-12 "
                : "lg:col-span-4 md:col-span-6"
            }`}
            key={e.id}
          >
            <div className={`goalContent ${isFirst ? "height_set" : ""}`}>
              <div className="goalIcon">
                <Image
                  src={e.Image}
                  width={100}
                  height={100}
                  className="goalImage"
                  alt={e.MissionHeader}
                />
              </div>
              <h3 className="goalHeader">{e.MissionHeader}</h3>
              <p className="goalPara">{e.MissionPara}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MissionGoal;
