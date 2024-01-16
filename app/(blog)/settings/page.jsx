import SettingsForm from "@/components/SettingsForm";
import { getAuthSession } from "@/lib/auth";

import React from "react";

const settings = async () => {
  const session = await getAuthSession();
  return (
    <>
      <SettingsForm session={session} />
    </>
  );
};

export default settings;
