import ProfileSection from "@/components/UserProfile/ProfileSection/ProfileSection";
import UserPhotos from "@/components/UserProfile/UserPhotos";
import { db } from "@/lib/db";
import React from "react";
import { UTApi } from "uploadthing/server";

const UserProfilePagePhotos = async ({ params }) => {
  const user = await db.user.findFirst({
    where: {
      id: params.userId,
    },
    include: {
      blogs: true,
    },
  });

  const getCoverPhoto = await db.blog.findFirst({
    where: {
      image: user.backgroundImage,
    },
  });

  user.coverPhotoId = getCoverPhoto?.id;

  // delete image in upload thing if the user click the cancel button
  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image.substring(image.lastIndexOf("/") + 1));
  };

  return (
    <div className="">
      <ProfileSection user={user} deleteImage={deleteImage} />

      {/* user all posts */}
      <div className="bg-neutral-200 px-60 py-5">
        <UserPhotos userId={params.userId} />
      </div>
    </div>
  );
};

export default UserProfilePagePhotos;
