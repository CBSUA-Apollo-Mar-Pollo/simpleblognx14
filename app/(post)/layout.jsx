import Navbar from "@/components/utils/Navbar";
import React from "react";

export const metadata = {
  title: "Estorya",
  description: "All in one social media app",
};

const Layout = ({ children }) => {
  return (
    <div className="h-full ">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
