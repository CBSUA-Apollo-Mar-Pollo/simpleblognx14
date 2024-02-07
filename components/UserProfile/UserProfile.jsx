import ProfilePicture from "@/components/UserProfile/ProfilePicture/ProfilePicture";
import React from "react";
import { UTApi } from "uploadthing/server";

const UserProfile = async ({ user }) => {
  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image.substring(image.lastIndexOf("/") + 1));
  };
  return (
    <div className="mt-[60px] bg-neutral-100 ">
      <ProfilePicture user={user} deleteImage={deleteImage} />
    </div>
  );
};

export default UserProfile;
