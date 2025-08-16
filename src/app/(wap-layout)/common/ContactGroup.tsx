import Image from "next/image";

export interface Contact {
  id: string | number;
  PilotName: string;
  PilotPhone?: string;
  Mail?: string;
  Mail1?: string;
}

export interface ContactGroupProps {
  id: string | number;
  GroupName: string;
  contacts: Contact[];
}

interface Props {
  group: ContactGroupProps;
  groupName: string;
}

export default function ContactGroup({ group, groupName }: Props) {
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";

  return (
    <div className="contactGroup" key={group.id}>
      <p className="contactHeader">
        <span className="line">{group.GroupName}</span>
      </p>
      <div
        className={`grid lg:grid-cols-12 md:grid-cols-6 md:gap-8 small:gap-5 height_set ${
          group.GroupName === "India" ? "center_height" : ""
        }`}
      >
        {group.contacts.map((e) => (
          <div className={groupName} key={e.id}>
            <div
              className={`contactList ${
                e.Mail === "" ? "contactOnly" : "allContacts"
              }`}
            >
              <p className="contactHead">{e.PilotName}</p>
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
    </div>
  );
}
