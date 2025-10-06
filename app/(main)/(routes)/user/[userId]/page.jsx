import ProfileBanner from "@/components/UserProfile/ProfileSection/profile-banner";
import UserAllPosts from "@/components/UserProfile/UserAllPosts";
import UserBio from "@/components/UserProfile/UserBio";
import PageSetupChecklists from "@/components/UserProfile/page-setup-checklists";
import StickDiv from "@/components/UserProfile/sticky_div";
import UserPostCreationSection from "@/components/UserProfile/user-post-creation-section";
import UserPostsToolBar from "@/components/UserProfile/user-posts-toolbar";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

import React from "react";
import { UTApi } from "uploadthing/server";

export const metadata = {
  title: `Estorya | User profile`,
  description: "All in one social media app",
};

const UserProfilePage = async ({ params }) => {
  const session = await getAuthSession();
  const userId = params?.userId;
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      blogs: true,
    },
  });

  const initialPosts = await db.blog.findMany({
    // get all posts by user
    where: {
      authorId: user?.id,
    },
    include: {
      comments: true,
      author: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  // short video posts
  const shortVideos = await db.shortsv.findMany({
    where: {
      authorId: user?.id,
    },
    include: {
      author: true,
      comments: true,
      shortsVotes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  const mergeData = [...initialPosts, ...shortVideos];

  const sortedData = mergeData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const getCoverPhoto = await db.blog.findMany({
    where: {
      AND: [
        { image: { not: null } }, // Ensure `image` is not null
        {
          image: {
            equals: {
              url: user?.backgroundImage, // Correctly reference the JSON key
            },
          },
        },
      ],
    },
  });

  user.coverPhotoId = getCoverPhoto[0]?.id;

  // delete image in upload thing if the user click the cancel button
  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image[0].key);
  };

  const userImages = await db.blog.findMany({
    where: {
      authorId: user.id,
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
      trashed: true,
    },
  });

  console.log(user);

  return (
    <div className="relative h-full">
      {/* user profile page header */}
      <ProfileBanner user={user} deleteImage={deleteImage} />

      <StickDiv user={user} />

      {/* content */}
      <div className="grid grid-cols-7 justify-center bg-neutral-100 xl:pr-56 xl:pl-72  pt-5 gap-x-2 dark:bg-neutral-900">
        <div className="col-span-3 relative space-y-4">
          {session?.user.id === user.id && user.type === "page" && (
            <PageSetupChecklists />
          )}
          <div className="sticky top-[8rem]">
            <UserBio userImages={userImages} user={user} />
          </div>
        </div>
        <div className="mx-2 space-y-2 col-span-4">
          <UserPostCreationSection user={user} />
          <UserPostsToolBar />
          <UserAllPosts initialPosts={sortedData} userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
