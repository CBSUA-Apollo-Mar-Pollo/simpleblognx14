import ProfileForm from "@/components/SettingsComponent/ProfileForm";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const ProfilePage = async () => {
  const session = await getAuthSession();
  return <ProfileForm user={session.user} />;
};

export default ProfilePage;
