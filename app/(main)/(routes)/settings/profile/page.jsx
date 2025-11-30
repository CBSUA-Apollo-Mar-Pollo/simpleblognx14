import ProfileForm from "@/components/SettingsComponent/ProfileForm";
import { getAuthSession } from "@/lib/auth";
import React from "react";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }
  return <ProfileForm />;
};

export default ProfilePage;
