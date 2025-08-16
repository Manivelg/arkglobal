import Image from "next/image";
import React from "react";

function Map() {
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";
  return (
    <>
      <section className="maps">
        <div className="conainter mx-auto px-2">
          <Image
            src="/assets/contact-us/map/map.webp"
            className="mapImg pointer-events-none small:opacity-80 lg:opacity-70"
            alt={companyUrl}
            width={1000}
            height={1000}
            layout="responsive"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>
    </>
  );
}

export default Map;
