import React from "react";
import Copyrights from "./_components/Copyright";
import Official from "./_components/Official";
function Footer() {
  return (
    <footer className="footer_section">
      <div className="container mx-auto px-2">
        <Official />
      </div>
      <Copyrights />
    </footer>
  );
}

export default Footer;
