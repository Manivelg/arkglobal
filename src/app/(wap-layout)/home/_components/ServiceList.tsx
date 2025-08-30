"use client";
import React, { useState, useEffect } from "react";
import { ServiceLists } from "../_actions/services";
import Image from "next/image";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

// type ServiceItem = {
//   id: string | number;
//   ServiceId?: string | number;
//   Image: string;
//   ServiceHeader: string;
//   ServiceYear?: string;
//   ServicePara: string;
// };

function ServiceList() {
  const ServiceData = ServiceLists[0].data;
  const [visibleItems, setVisibleItems] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const updateVisibleItems = () => {
      setVisibleItems(window.innerWidth < 1024 ? 4 : 3);
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const showServices = () => {
    // No need to set selectedService if you're not using it
    router.push(`/our-services#ourService`);
  };

  return (
    <>
      <div className="grid grid-cols-12 serviceList">
        {ServiceData.slice(0, visibleItems).map((e) => (
          <div
            className="lg:col-span-4 md:col-span-6 sm:col-span-12"
            key={e.id}
          >
            <div className="">
              <Image
                src={e.Img}
                className="serviceImg"
                width={100}
                height={100}
                alt={e.ServiceHeader}
                title={e.ServiceHeader}
              />
            </div>
            <div className="serviceHead">
              <p className="serviceHeader">{e.ServiceHeader}</p>
              <p className="serviceYear">
                {e.ServiceYear ? `(${e.ServiceYear})` : ``}
              </p>
              <p className="servicePara">{e.ServicePara}</p>
            </div>
            <div className="">
              <Button
                label="View More"
                className="submit_button"
                onClick={() => showServices()}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ServiceList;
