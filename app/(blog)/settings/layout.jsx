import NavBarSettings from "@/components/NavBarSettings";
import { Separator } from "@/components/ui/Separator";
import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="mx-72">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account settings </p>
      </div>

      <Separator className="my-4" />
      <div className="grid grid-cols-5 px-4 space-y-2 gap-2 ">
        <div className="col-span-1">
          <NavBarSettings />
        </div>
        <div className="col-span-4 mx-10">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
