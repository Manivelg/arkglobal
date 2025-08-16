import React from "react";

function Year() {
  const Showyear = new Date().getFullYear();
  return <span>{Showyear}</span>;
}

export default Year;
