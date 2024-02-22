import AddBlogModal from "@/components/AddPostModal";
import ProfileSection from "@/components/UserProfile/ProfileSection/ProfileSection";
import UserAllPosts from "@/components/UserProfile/UserAllPosts";
import UserBio from "@/components/UserProfile/UserBio";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";
import { UTApi } from "uploadthing/server";

const UserProfilePage = async ({ params }) => {
  const session = await getAuthSession();
  const user = await db.user.findFirst({
    where: {
      id: params.userId,
    },
    include: {
      blogs: true,
    },
  });
  const initialPosts = await db.blog.findMany({
    // get all posts by user
    where: {
      authorId: user.id,
    },
    include: {
      comments: true,
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
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
      <div className="grid grid-cols-7 justify-center bg-neutral-200 px-60 pt-5 gap-x-2">
        <div className="col-span-3 relative">
          <div className="sticky top-[4.5rem]">
            <UserBio userId={user.id} />
          </div>
        </div>
        <div className="mx-2 space-y-2 col-span-4">
          {session?.user.id === user.id && <AddBlogModal user={user} />}
          <UserAllPosts
            initialPosts={initialPosts}
            userId={user.id}
            session={session}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
