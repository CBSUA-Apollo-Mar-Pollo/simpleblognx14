import Navbar from "@/components/utils/Navbar";
import React, { Suspense } from "react";

export const metadata = {
  title: "Estorya",
  description: "All in one social media app",
};

const Layout = ({ children }) => {
  return (
    <div className="h-full ">
      <Suspense>
        <Navbar />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
