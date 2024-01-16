"use client";

import { usePathname } from "next/navigation";
import React from "react";
import ProfileForm from "./ProfileForm";
import AccountForm from "./AccountForm";

const SettingsForm = ({ session }) => {
  const pathname = usePathname();
  return (
    <div className="px-7 mr-[280px]">
      {pathname === "/settings" && <ProfileForm user={session.user} />}
      {pathname === "/settings/account" && <AccountForm user={session.user} />}
    </div>
  );
};

export default SettingsForm;
