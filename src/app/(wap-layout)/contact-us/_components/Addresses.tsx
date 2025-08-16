import React from "react";
import { ContactLists } from "../_actions/contact";
import ContactGroup from "../../common/ContactGroup";
function Addresses() {
  const contactData = ContactLists[0].data;
  return (
    <>
      <section className="message">
        <div className="container mx-auto px-4">
          <div className="messageHeader">
            <h2 className="messageHead">Contact Us</h2>
            <p className="messagePara">
              Your Global Marine Partner is Just a{" "}
              <span className="message_block">Message Away.</span>
            </p>
          </div>

          <div className="chat">
            <div className="contact">
              <ContactGroup
                group={contactData[0]}
                groupName="lg:col-span-3 md:col-span-6 sm:col-span-6 small:col-span-12"
              />
            </div>
          </div>

          <div className="chat">
            <div className="contact">
              <ContactGroup
                group={contactData[0]}
                groupName="lg:col-span-3 md:col-span-6 sm:col-span-6 small:col-span-12"
              />
            </div>

            <div className="contact">
              <div className="grid grid-cols-12 md:gap-8 small:gap-4">
                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                  <ContactGroup
                    group={contactData[1]}
                    groupName="lg:col-span-6 md:col-span-6 sm:col-span-6 small:col-span-12"
                  />
                </div>
                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                  <ContactGroup
                    group={contactData[2]}
                    groupName="lg:col-span-6 md:col-span-6 sm:col-span-6 small:col-span-12"
                  />
                </div>
              </div>
            </div>

            <div className="contact">
              <div className="grid grid-cols-12 md:gap-8 small:gap-4">
                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                  <ContactGroup
                    group={contactData[3]}
                    groupName="lg:col-span-6 md:col-span-6 sm:col-span-6 small:col-span-12"
                  />
                </div>
                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                  <ContactGroup
                    group={contactData[4]}
                    groupName="lg:col-span-12 md:col-span-12 sm:col-span-12 small:col-span-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Addresses;
