import ProfilePicture from "@/components/UserProfile/ProfilePicture/ProfilePicture";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import React from "react";
import { UTApi } from "uploadthing/server";
import UserAllPosts from "./UserAllPosts";
import { getAuthSession } from "@/lib/auth";
import AddBlogModal from "../AddBlogModal";
import UserDetails from "./UserDetails";

const UserProfile = async ({ user }) => {
  const session = await getAuthSession();
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

  // delete image in upload thing if the user click the cancel button
  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image.substring(image.lastIndexOf("/") + 1));
  };

  return (
    <div className="mt-[60px] bg-neutral-100">
      <ProfilePicture user={user} deleteImage={deleteImage} />

      {/* user all posts */}
      <div className="grid grid-cols-7 justify-center bg-neutral-200 px-60 pt-5 gap-x-2">
        <div className="col-span-3 relative">
          <div className="sticky top-20">
            <UserDetails />
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

export default UserProfile;
