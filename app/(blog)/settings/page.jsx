import ProfileForm from "@/components/ProfileForm";
import { getAuthSession } from "@/lib/auth";

import React from "react";

const settings = async () => {
  const session = await getAuthSession();
  return (
    <>
      <ProfileForm user={session.user} />
    </>
  );
};

export default settings;
