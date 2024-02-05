import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-full bg-stone-50">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
