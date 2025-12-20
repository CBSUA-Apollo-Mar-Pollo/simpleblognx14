"use client";

import { useSession } from "next-auth/react";
import React from "react";
import UserAvatar from "../utils/UserAvatar";
import AddPostModal from "../Post/AddPostModal";
import { Separator } from "../ui/Separator";
import Image from "next/image";
import AddGalleryPostModal from "../Post/AddImagePostModal";

const UserPostCreationSection = ({ user }) => {
  const { data: session } = useSession();
  return (
    <>
      {session?.user.id === user?.id && (
        <div className=" border pt-3 pb-1 px-5 rounded-2xl bg-white shadow-md drop-shadow-sm dark:bg-neutral-800 dark:border-0">
          <div className="flex flex-row items-center space-x-4">
            <UserAvatar
              className="h-10 w-10 "
              user={{
                name: session?.user.name || null || user?.name,
                image: session?.user.image || null || user?.image,
              }}
            />

            <AddPostModal />
          </div>

          <Separator className="mt-3 dark:bg-neutral-700" />

          <div className="flex items-center justify-center my-1 ">
            <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
              <Image
                src="/ImageIcons/live.png"
                className="h-8 w-8"
                alt="Live video icon"
                width={32}
                height={32}
              />
              <span className="dark:text-neutral-100 text-sm">Live video</span>
            </div>
            <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
              <AddGalleryPostModal session={session} />
            </div>
            <div className="flex flex-1 items-center justify-center space-x-3 py-2 dark:hover:bg-neutral-700 rounded-md">
              <Image
                src="/ImageIcons/smile.png"
                className="h-7 w-7"
                alt="Feeling or activity icon"
                width={28}
                height={28}
              />
              <span className="dark:text-neutral-100 text-sm">
                Feeling/Activity
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPostCreationSection;
