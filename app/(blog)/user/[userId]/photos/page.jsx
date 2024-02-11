import AddBlogModal from "@/components/AddBlogModal";
import ProfilePicture from "@/components/UserProfile/ProfilePicture/ProfilePicture";
import UserAllPosts from "@/components/UserProfile/UserAllPosts";
import UserDetails from "@/components/UserProfile/UserDetails";
import UserPhotos from "@/components/UserProfile/UserPhotos";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const UserProfilePagePhotos = async ({ params }) => {
  const session = await getAuthSession();
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
    <div className="mt-[60px] ">
      <ProfilePicture user={user} deleteImage={deleteImage} />

      {/* user all posts */}
      <div className="bg-neutral-200 px-60 py-5">
        <UserPhotos userId={params.userId} />
      </div>
    </div>
  );
};

export default UserProfilePagePhotos;
