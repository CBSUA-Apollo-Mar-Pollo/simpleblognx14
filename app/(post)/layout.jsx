import Navbar from "@/components/utils/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-full ">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
