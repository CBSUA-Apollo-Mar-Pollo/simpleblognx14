import AddGalleryPostModal from "@/components/Post/AddImagePostModal";
import AddPostModal from "@/components/Post/AddPostModal";
import ProfileSection from "@/components/UserProfile/ProfileSection/ProfileSection";
import UserAllPosts from "@/components/UserProfile/UserAllPosts";
import UserBio from "@/components/UserProfile/UserBio";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
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
      authorId: user?.id,
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

  const getCoverPhoto = await db.blog.findMany({
    where: {
      image: {
        path: "$.url",
        equals: user?.backgroundImage,
      },
    },
  });

  user.coverPhotoId = getCoverPhoto[0]?.id;

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
      <div className="grid grid-cols-7 justify-center bg-neutral-200 px-60 pt-5 gap-x-2 dark:bg-neutral-900">
        <div className="col-span-3 relative">
          <div className="sticky top-[4.5rem]">
            <UserBio user={user} />
          </div>
        </div>
        <div className="mx-2 space-y-2 col-span-4">
          {session?.user.id === user.id && (
            <div className=" border pt-3 pb-1 px-5 rounded-lg bg-white dark:bg-neutral-800 dark:border-0">
              <div className="flex flex-row items-center space-x-4">
                <UserAvatar
                  className="h-10 w-10 "
                  user={{
                    name: session?.user.name || null || user?.name,
                    image: session?.user.image || null || user?.image,
                  }}
                />

                <AddPostModal session={session} />
              </div>

              <Separator className="mt-3 dark:bg-neutral-700" />

              <div className="flex items-center justify-center my-1 ">
                <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
                  <img src="/ImageIcons/live.png" className="h-8 w-8" />
                  <span className="dark:text-neutral-100 text-sm">
                    Live video
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
                  <AddGalleryPostModal session={session} />
                </div>
                <div className="flex flex-1 items-center justify-center space-x-3 py-2 dark:hover:bg-neutral-700 rounded-md">
                  <img src="/ImageIcons/smile.png" className="h-7 w-7" />
                  <span className="dark:text-neutral-100 text-sm">
                    Feeling/Activity
                  </span>
                </div>
              </div>
            </div>
          )}
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
