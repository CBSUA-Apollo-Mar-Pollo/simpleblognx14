import Navbar from "@/components/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex-1 ">{children}</div>
    </main>
  );
};

export default Layout;
