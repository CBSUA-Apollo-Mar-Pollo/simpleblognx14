import AccountForm from "@/components/SettingsComponent/AccountForm";
import React from "react";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const AccountFormPage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  return <AccountForm />;
};

export default AccountFormPage;
