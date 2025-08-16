import React from "react";
import Image from "next/image";
import { Button } from "primereact/button";

interface NotFoundProps {
  onBack: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onBack }) => (
  <div className="found_head">
    <Image
      src="/error/error.webp"
      alt="Not Found"
      className="not_found_img"
      width={500}
      height={580}
    />
    <div className="top_move">
      <p className="not_found_header">Page not found</p>
      <Button onClick={onBack} label="Back to Home" className="submit_button" />
    </div>
  </div>
);

export default NotFound;
