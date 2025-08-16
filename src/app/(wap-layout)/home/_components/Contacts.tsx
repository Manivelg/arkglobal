"use client";
import { Button } from "primereact/button";
import React from "react";
import { useRouter } from "next/navigation";

function Contacts() {
  const router = useRouter();
  const gotoContactPage = () => {
    router.push("/contact-us");
  };
  return (
    <>
      <section className="homeContact">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-12 gap-4">
            <div className="lg:col-span-8 md:col-span-8 sm:col-span-8 small:col-span-12">
              <div className="contactHead">
                <p className="ContactHeader">
                  Connect for expert marine services navigation, audits, lay-up,
                  and training with global support.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 small:col-span-12">
              <div className="contactButton">
                <Button
                  label="Contact Us"
                  className="contacts_button padd_set"
                  onClick={gotoContactPage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacts;
