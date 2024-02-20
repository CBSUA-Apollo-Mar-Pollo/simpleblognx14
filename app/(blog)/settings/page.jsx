import ProfileForm from "@/components/SettingsComponent/ProfileForm";
import { getAuthSession } from "@/lib/auth";

import React from "react";

const settings = async () => {
  const session = await getAuthSession();
  return (
    <div className="">
      <ProfileForm user={session.user} />
    </div>
  );
};

export default settings;
