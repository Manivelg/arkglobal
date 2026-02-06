import React from "react";
import Image from "next/image";
import { Button } from "primereact/button";

interface NotFoundProps {
  onBack: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onBack }) => (
  <div className="found_head">
    <div className="sm:h-auto md:h-75">
      <Image
        src="/error/error.svg"
        alt="Not Found"
        className="not_found_img"
        fill
      />
    </div>
    <div className="top_move">
      <p className="not_found_header">Page not found</p>
      <Button onClick={onBack} label="Back to Home" className="submit_button" />
    </div>
  </div>
);

export default NotFound;
