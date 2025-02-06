"use client";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
import { Dot, Plus, Settings, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const StoryPageSidebar = ({ session, stories }) => {
  const router = useRouter();
  let isUserPostedAStory = stories.find(
    (story) => story.author.id === session.user.id
  );

  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const diffInMinutes = Math.floor((now - createdTime) / (1000 * 60)); // Convert ms to minutes

    return diffInMinutes < 60
      ? `${diffInMinutes}m`
      : `${Math.floor(diffInMinutes / 60)}h`;
  };

  const latestImageForUser = isUserPostedAStory?.images.reduce(
    (latest, image) =>
      new Date(image.createdAt) > new Date(latest.createdAt) ? image : latest
  );

  const getLatestImageTimeStamp = (story) => {
    const latestImage = story?.images.reduce((latest, image) => {
      if (!latest) return image; // handle the case when it's the first iteration
      return new Date(image.createdAt) > new Date(latest.createdAt)
        ? image
        : latest;
    }, null); // initialize with null or any valid fallback value

    return latestImage?.createdAt; // return only the createdAt value
  };

  return (
    <div className="relative">
      <div>
        <div className="flex items-center justify-start mt-2 pl-4 pb-2 gap-2">
          <button
            onClick={() => router.push("/")}
            className="p-[8px] cursor-pointer bg-neutral-700/50 rounded-full transition hover:bg-neutral-300"
          >
            <X className=" text-neutral-200 h-8 w-8" />
          </button>
          <Link href="/" className="font-bold">
            <span className="py-[2px] px-4 rounded-full bg-yellow-400 text-3xl">
              E
            </span>
          </Link>
        </div>

        <Separator className=" dark:bg-neutral-700" />

        <div className="px-4">
          <div className="flex flex-col mt-3">
            <h1 className="text-2xl font-bold dark:text-white ">Stories</h1>

            <div className="flex items-center mt-3">
              <p className="text-blue-600">Archive</p>
              <Dot className="text-blue-600" />
              <p className="text-blue-600">Settings</p>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold text-lg">Your Story</h2>

            {isUserPostedAStory ? (
              <div className="flex items-center justify-between  w-full gap-x-3 mt-1 hover:bg-neutral-200 p-2 rounded-lg">
                <div className="flex items-center gap-x-3">
                  <UserAvatar
                    className="h-14 w-14 border-2 border-neutral-500"
                    user={{
                      name: session?.user.name || null || user?.name,
                      image: session?.user.image || null || user?.image,
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[0.9rem] font-semibold ">
                      {session.user.name}
                    </span>
                    <span className="text-sm font-light">
                      {getTimeDifference(latestImageForUser.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="">
                  <Plus className="text-blue-600 bg-neutral-100 p-5 h-16 w-16 rounded-full" />
                </div>
              </div>
            ) : (
              <div className="flex items-center  w-full gap-x-3 mt-3">
                <div className="">
                  <Plus className="text-blue-600 bg-neutral-100 p-5 h-16 w-16 rounded-full" />
                </div>

                <div className="flex flex-col">
                  <h3 className="font-semibold">Create a story</h3>
                  <span className="text-xs text-neutral-600">
                    Share a photo or write something.
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h2 className="font-semibold text-lg">All Stories</h2>

            <div className="space-y-2">
              {stories
                .filter((item) => item.author.id !== session.user.id)
                .map((story) => (
                  <div className="flex items-center gap-x-3 hover:bg-neutral-200 p-2 rounded-lg">
                    <UserAvatar
                      className="h-14 w-14 border-2 border-neutral-500"
                      user={{
                        name: story.author.name || null,
                        image: story.author.image || null,
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-[0.9rem] font-semibold ">
                        {story.author.name}
                      </span>
                      <span className="text-sm font-light">
                        {getTimeDifference(getLatestImageTimeStamp(story))}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPageSidebar;
