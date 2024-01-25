import AccountForm from "@/components/AccountForm";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const accountForm = async () => {
  const session = await getAuthSession();
  return (
    <div>
      <AccountForm user={session.user} />
    </div>
  );
};

export default accountForm;
