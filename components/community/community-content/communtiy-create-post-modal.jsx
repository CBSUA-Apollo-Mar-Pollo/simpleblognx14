import AddGalleryPostModal from "@/components/Post/AddImagePostModal";
import AddPostModal from "@/components/Post/AddPostModal";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
import Image from "next/image";
import React from "react";

const CommunityCreatePostModal = ({ session, communityId }) => {
  return (
    <div className="border pt-3 pb-1 px-5 rounded-xl bg-white dark:bg-neutral-800 dark:border-0 ml-16">
      <div className="flex flex-row items-center space-x-4">
        <UserAvatar
          className="h-10 w-10 "
          user={{
            name: session?.user.name || null,
            image: session?.user.image || null,
          }}
        />

        <AddPostModal session={session} communityId={communityId} />
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
          <AddGalleryPostModal session={session} communityId={communityId} />
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
  );
};

export default CommunityCreatePostModal;
