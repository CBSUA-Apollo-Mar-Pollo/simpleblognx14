import NavBarSettings from "@/components/SettingsComponent/NavBarSettings";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-9 bg-gray-100 h-screen relative">
      <div className="col-span-2 pl-5 px-2 bg-white shadow-[rgba(0,0,0,0.1)_0px_4px_10px_-1px] border-r">
        <NavBarSettings />
      </div>
      <div className="col-span-7 ">
        <div className="bg-white mx-32 my-5 rounded-xl px-10 py-5 border border-gray-200 h-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
