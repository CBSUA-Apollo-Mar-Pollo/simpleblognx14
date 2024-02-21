import AccountForm from "@/components/SettingsComponent/AccountForm";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const AccountFormPage = async () => {
  const session = await getAuthSession();
  return (
    <div>
      <AccountForm user={session.user} />
    </div>
  );
};

export default AccountFormPage;
