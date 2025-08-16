import React from "react";
import ClientFeedbacks from "./ClientFeedbacks";

function Feedback() {
  return (
    <section className="feedback">
      <div className="container mx-auto px-2">
        <div className="feedbackHeader">
          <h2 className="feedbackHead">
            What Our Clients{" "}
            <span className="feedback_block">Say About Us</span>
          </h2>
          <p className="feedbackPara">
            Clients appreciate our reliable service, expert support, and
            commitment to safe and smooth operations.
          </p>
        </div>

        <div className="ourFeedback">
          <ClientFeedbacks />
        </div>
      </div>
    </section>
  );
}

export default Feedback;
