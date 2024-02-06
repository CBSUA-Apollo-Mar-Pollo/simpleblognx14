import UserAvatar from "@/components/UserAvatar";
import ProfilePicture from "@/components/UserProfile/ProfilePicture";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { getAuthSession } from "@/lib/auth";
import { Camera, Pen } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const UserProfile = async ({ user }) => {
  return (
    <div className="flex justify-center mt-[60px] bg-neutral-100">
      <ProfilePicture user={user} />
    </div>
  );
};

export default UserProfile;
