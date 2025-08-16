"use client";
import { Button } from "primereact/button";
import React from "react";
import { useRouter } from "next/navigation";

function ContactUs() {
  const router = useRouter();

  const gotoContactPage = () => {
    router.push("/contact-us");
  };
  return (
    <>
      <section className="contactUs">
        <div className="container mx-auto px-2">
          <div className="contactHeader">
            <p className="contactHead">Let&apos;s Navigate Together</p>
            <p className="contactPara">
              Ready to optimize your vessel operations or need a trusted marine
              audit partner?
            </p>
            <div className="homeButton">
              <Button
                label="Contact Us"
                className="contact_button padd_set"
                onClick={gotoContactPage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
