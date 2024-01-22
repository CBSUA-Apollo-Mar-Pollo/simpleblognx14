import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const Layout = async ({ children }) => {
  const session = await getAuthSession();
  return (
    <div className="flex bg-stone-50">
      <div className="mt-[70px]">
        <Sidebar session={session} />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
