import React from "react";
import Year from "./Year";

function Copyright() {
  const companyUrl =
    process.env.NEXT_PUBLIC_COMPANY_NAME || "Ark Global PTE Ltd.";
  return (
    <div className="text-center copy_section">
      <div className="mobile_view">
        <span className="mobile_space">{companyUrl} </span> &copy; Copyrights{" "}
        <Year /> &#10072; All Rights Reserved.
      </div>
    </div>
  );
}

export default Copyright;
