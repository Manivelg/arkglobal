"use client";
import React from "react";
import { FirstLists, SecondLists, ThirdLists } from "../_actions";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Tooltip } from "primereact/tooltip";

function Official() {
  const router = useRouter();
  const pathname = usePathname();
  const filteredLinks = SecondLists[0].data.filter(
    (item) => item.routeName === pathname
  );

  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";

  const handleWhatsAppClick = (number: string, message: string) => {
    const formattedNumber = number.replace(/\D/g, "");
    const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="grid grid-cols-12">
      <div className="lg:col-span-3 md:col-span-6 sm:col-span-6 small:col-span-12">
        <div className="footerLogo md:w-[90%] w-full mb-6">
          <Image
            src="/assets/logo/logo.png"
            alt={companyUrl}
            className="footer_logo bg-white md:w-[90%] w-full"
            width={200}
            height={45}
            layout="responsive"
          />
        </div>
      </div>

      <div className="lg:col-span-3 md:col-span-6 sm:col-span-6 small:col-span-6">
        <div className="footerOne">
          <div className="footerHeader">
            <h1 className="footHead">Company</h1>
          </div>
          {FirstLists[0].data.map((e) => (
            <ul className="footer_list" key={e.id}>
              <li>
                <span
                  className="cursor-pointer text-white hover:text-[#face00]"
                  onClick={() => router.push(e.link)}
                >
                  {e.FooterHeader}
                </span>
              </li>
            </ul>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3 md:col-span-6 sm:col-span-6 small:col-span-6">
        <div className="footerOne">
          <div className="footerHeader">
            <h1 className="footHead">Quick Links</h1>
          </div>
          {filteredLinks.map((e) => (
            <ul className="footer_list" key={e.id}>
              <li>
                <span
                  className="cursor-pointer text-white hover:text-[#face00]"
                  // onClick={() => router.push(e.link)}
                  onClick={() => {
                    const sectionId = e.link.replace("#", "");
                    const target = document.getElementById(sectionId);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.location.href = e.routeName + e.link;
                    }
                  }}
                >
                  {e.FooterHeader}
                </span>
              </li>
            </ul>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3 md:col-span-6 sm:col-span-6 small:col-span-12">
        <div className="footerOne">
          <div className="footerHeader">
            <h1 className="footHead">More Info</h1>
          </div>
          {ThirdLists[0].data.map((e) => (
            <ul className="footer_list" key={e.id}>
              <li>
                <div className="flex contact_img">
                  <div>
                    <Image
                      src="/assets/footer/call.svg"
                      alt={e.ContactName}
                      width={100}
                      height={100}
                      className="contacts"
                    />
                  </div>
                  <span className="cursor-pointer text-white hover:text-[#face00]">
                    <Tooltip
                      target=".custom_tooltip"
                      className="custom_tooltip"
                    />
                    <span
                      className="custom_tooltip"
                      data-pr-tooltip={e.ContactName}
                      data-pr-position="right"
                      onClick={() =>
                        handleWhatsAppClick(e.ContactNo, e.ContactMessage)
                      }
                    >
                      {e.ContactNo}
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Official;
