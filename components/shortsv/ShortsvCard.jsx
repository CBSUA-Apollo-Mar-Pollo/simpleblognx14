import React from "react";
import LogoVideoAndIcon from "./LogoVideoAndIcon";

const ShortsvCard = () => {
  return (
    <div className="grid grid-cols-4 relative">
      <div className="col-span-4 h-screen">
        <LogoVideoAndIcon />
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default ShortsvCard;
