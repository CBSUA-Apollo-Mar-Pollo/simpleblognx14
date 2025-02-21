import SideBarSettings from "@/components/SettingsComponent/SideBarSettings";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-9 bg-gray-100 relative">
      <div className="col-span-2 pl-3  bg-white dark:bg-neutral-800 shadow-[rgba(0,0,0,0.1)_0px_4px_10px_-1px] border-r dark:border-neutral-700">
        <SideBarSettings />
      </div>
      <div className="col-span-7 dark:bg-neutral-900 px-10 pb-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
