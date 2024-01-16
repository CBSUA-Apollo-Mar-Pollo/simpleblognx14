import SettingsForm from "@/components/SettingsForm";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const accountForm = async () => {
  const session = await getAuthSession();
  return (
    <div>
      <SettingsForm session={session} />
    </div>
  );
};

export default accountForm;
