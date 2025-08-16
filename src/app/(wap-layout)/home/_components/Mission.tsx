import React from "react";
import MissionGoal from "./MissionGoal";

function Mission() {
  return (
    <section className="mission" id="mission">
      <div className="container px-4 mx-auto">
        <div className="missionHeader">
          <h2 className="missionHead">Our Mission</h2>
          <p className="missionPara">
            The objective was to provide Ship-Owner&#x27;s with a{" "}
            <span className="oneStop">&#8220;ONE STOP&#8221;</span> of contact
            for reliable, cost-effective, and high-quality personalized service.
          </p>
        </div>

        <MissionGoal />
      </div>
    </section>
  );
}

export default Mission;
