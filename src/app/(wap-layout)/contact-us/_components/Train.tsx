import React from "react";
import { ContactsList } from "../_actions";
import Image from "next/image";

function Train() {
  const Contacts = ContactsList[0].data;
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";
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

          <div className="contactList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="gap-10 grid">
              {Contacts.slice(0, 4).map((e) => (
                <div className="contactCard" key={e.id}>
                  <div className="contactshow">
                    <p className="contactCountry">{e.GroupName}</p>
                  </div>
                  <div
                    className={`contactwrap ${
                      e.Mail != "" ? "twoContacts" : ""
                    }`}
                  >
                    <p className="contactName">{e.PilotName}</p>
                    <div className="flex gap-2 flex-col">
                      {e.PilotPhone && (
                        <div className="flex gap-1">
                          <Image
                            src="/assets/footer/social.svg"
                            width={20}
                            height={20}
                            alt={companyUrl}
                            className="mr-1 ml-1"
                          />
                          <p className="contactChat">{e.PilotPhone}</p>
                        </div>
                      )}
                      {(e.Mail || e.Mail1) && (
                        <div className="flex gap-1">
                          <Image
                            src="/assets/footer/email.svg"
                            width={22}
                            height={22}
                            alt={companyUrl}
                            className="mr-1 ml-1"
                          />
                          <p className="mailOne">
                            {[e.Mail, e.Mail1].filter(Boolean).join(" / ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="gap-10 grid">
              {Contacts.slice(4, 8).map((e) => (
                <div className="contactCard" key={e.id}>
                  <div className="contactshow">
                    <p className="contactCountry">{e.GroupName}</p>
                  </div>
                  <div
                    className={`contactwrap ${
                      e.Mail != "" ? "twoContacts" : ""
                    }`}
                  >
                    <p className="contactName">{e.PilotName}</p>
                    <div className="flex gap-2 flex-col">
                      {e.PilotPhone && (
                        <div className="flex gap-1">
                          <Image
                            src="/assets/footer/social.svg"
                            width={20}
                            height={20}
                            alt={companyUrl}
                            className="mr-1 ml-1"
                          />
                          <p className="contactChat">{e.PilotPhone}</p>
                        </div>
                      )}
                      {(e.Mail || e.Mail1) && (
                        <div className="flex gap-1">
                          <Image
                            src="/assets/footer/email.svg"
                            width={22}
                            height={22}
                            alt={companyUrl}
                            className="mr-1 ml-1"
                          />
                          <p className="mailOne">
                            {[e.Mail, e.Mail1].filter(Boolean).join(" / ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="gap-10 grid">
              {Contacts.slice(8, 11).map((e) => (
                <div className="contactCard" key={e.id}>
                  <div className="contactshow">
                    <p className="contactCountry">{e.GroupName}</p>
                  </div>
                  <div
                    className={`contactwrap ${
                      e.Mail != "" ? "twoContacts" : ""
                    }`}
                  >
                    <p className="contactName">{e.PilotName}</p>
                    <div className="flex gap-2 flex-col">
                      {e.PilotPhone && (
                        <div className="flex gap-1">
                          <Image
                            src="/assets/footer/social.svg"
                            width={20}
                            height={20}
                            alt={companyUrl}
                            className="mr-1 ml-1"
                          />
                          <p className="contactChat">{e.PilotPhone}</p>
                        </div>
                      )}
                      {e.Mail && (
                        <div className="flex gap-1">
                          <Image
                            src="/assets/footer/email.svg"
                            width={22}
                            height={22}
                            alt={companyUrl}
                            className="mr-1 ml-1"
                          />
                          <p className="mailOne">{[e.Mail]}</p>
                        </div>
                      )}
                      {e.Mail1 && (
                        <div className="flex gap-1">
                          <Image
                            src="/assets/footer/email.svg"
                            width={22}
                            height={22}
                            alt={companyUrl}
                            className="mr-1 ml-1"
                          />
                          <p className="mailOne">{[e.Mail1]}</p>
                        </div>
                      )}
                    </div>
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

export default Train;
