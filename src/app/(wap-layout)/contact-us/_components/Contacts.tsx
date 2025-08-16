import Image from "next/image";
import React from "react";
import { ContactLists } from "../_actions/contact";

function Contacts() {
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";
  const contactData = ContactLists[0]?.data ?? [];

  return (
    <>
      <div className="addressSet">
        <p className="addContact">Contact Us</p>
        {/* <div className="contactList">
          <p className="country">Singapore</p>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-6">
              <div className="connect">
                <div className="callApp">
                  <Image
                    src="/assets/footer/chat.svg"
                    width={50}
                    height={50}
                    alt={companyUrl}
                  />
                </div>
                <div className="">
                  <p className="phoneOwner">Capt.Ron D’Rozario</p>
                  <p className="phoneOne">+65 966 418 72</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="connectWrapper">
          {contactData.map((group) => (
            <div key={group.id} className="groupSection">
              <div className="contactList">
                <h2 className="country">{group.GroupName}</h2>
                <div className="grid grid-cols-12 gap-4">
                  {group.contacts.map((contact) => (
                    <div className="col-span-6" key={contact.id}>
                      <div className="connect">
                        <div className="w-full">
                          <p className="phoneOwner">{contact.PilotName}</p>
                          <div className="flex items-center pb-[3px]">
                            <Image
                              src="/assets/footer/chat.svg"
                              width={30}
                              height={30}
                              alt={companyUrl}
                            />
                            <p className="phoneOne">{contact.PilotPhone}</p>
                          </div>
                          <div className="flex items-center">
                            {contact.Mail && (
                              <>
                                <Image
                                  src="/assets/footer/mail.svg"
                                  width={22}
                                  height={22}
                                  alt={companyUrl}
                                  className="mr-1 ml-1"
                                />

                                <p className="mailOne">{contact.Mail}</p>
                              </>
                            )}
                          </div>

                          <div className="flex items-center pt-[4px]">
                            {contact.Mail1 && (
                              <>
                                <Image
                                  src="/assets/footer/mail.svg"
                                  width={22}
                                  height={22}
                                  alt={companyUrl}
                                  className="mr-2 ml-1"
                                />

                                <p className="mailOne">{contact.Mail1}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Contacts;
