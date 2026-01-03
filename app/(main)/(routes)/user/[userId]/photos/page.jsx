import ProfileBanner from "@/components/UserProfile/ProfileSection/profile-banner";
import UserPhotos from "@/components/UserProfile/UserPhotos";
import { db } from "@/lib/db";
import React from "react";
import { UTApi } from "uploadthing/server";

const UserProfilePagePhotos = async ({ params }) => {
  const user = await db.userProfile.findFirst({
    where: {
      id: params?.userId,
    },
    select: {
      posts: true,
      id: true,
      type: true,
      name: true,
      bio: true,
      image: true,
      categories: true,
      backgroundImage: true,
    },
  });

  if (!user?.backgroundImage) {
    user.coverPhotoId = null;
  } else {
    // 2. Only query if we have a valid URL
    const getCoverPhoto = await db.post.findMany({
      where: {
        image: {
          path: ["url"],
          equals: user.backgroundImage,
        },
      },
      select: { id: true }, // Optimization: only fetch the ID
      take: 1, // We only need the first match
    });

    user.coverPhotoId = getCoverPhoto[0]?.id || null;
  }

  // delete image in upload thing if the user click the cancel button
  // const deleteImage = async (image) => {
  //   "use server";
  //   if (!image || typeof image !== "string") return;
  //   try {
  //     const utapi = new UTApi();
  //     const filename = image.substring(image.lastIndexOf("/") + 1);
  //     await utapi.deleteFiles(filename);
  //   } catch (err) {
  //     console.error("deleteImage error:", err);
  //   }
  // };

  const userImages = await db.post.findMany({
    where: {
      authorId: params?.userId,
      image: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },

    select: {
      image: true,
      id: true,
    },
  });

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 px-60 py-5 min-h-screen">
      <UserPhotos userImages={userImages} />
    </div>
  );
};

export default UserProfilePagePhotos;
