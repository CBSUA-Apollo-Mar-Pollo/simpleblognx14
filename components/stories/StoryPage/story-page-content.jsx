"use client";

import NotificationMenu from "@/components/Notification/NotificationMenu";
import { Button } from "@/components/ui/Button";
import ChatBoxMenu from "@/components/utils/ChatBoxMenu";
import Menu from "@/components/utils/Menu";
import UserAccountNav from "@/components/utils/UserAccountNav";
import UserAvatar from "@/components/utils/UserAvatar";
import { ChevronRight, MoreHorizontal, Play } from "lucide-react";
import Image from "next/image";
import React from "react";

const StoryPageContent = ({ session, stories }) => {
  console.log(stories[0].images);
  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const diffInMinutes = Math.floor((now - createdTime) / (1000 * 60)); // Convert ms to minutes

    return diffInMinutes < 60
      ? `${diffInMinutes}m`
      : `${Math.floor(diffInMinutes / 60)}h`;
  };

  const latestImage = stories[0].images.reduce((latest, image) =>
    new Date(image.createdAt) > new Date(latest.createdAt) ? image : latest
  );
  return (
    <div className="relative">
      <div className="absolute top-4 right-7 flex items-center justify-end  gap-x-2 z-30">
        <Menu contentClassName="-mr-32" />
        <ChatBoxMenu />
        <NotificationMenu />
        <UserAccountNav user={session.user} />
      </div>

      <div className="flex items-center justify-center w-full mt-4 relative">
        <div className="relative">
          <div
            className="absolute top-0 left-0 w-full h-[4vh] bg-gradient-to-t "
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0))`,
            }}
          ></div>
          <Image
            sizes="100vw"
            width={0}
            height={0}
            src={stories[0].images[0].img}
            alt="Story image"
            objectFit="cover" // Ensures the image covers the entire div without distortion
            className="min-h-[90vh] min-w-[24vw] rounded-xl"
          />

          <div className="absolute top-3 w-full">
            <div className="flex items-center gap-x-1 mx-4">
              {stories[0].images.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 h-[0.5vh]  bg-neutral-300 rounded-full"
                ></div>
              ))}
            </div>
            <div className="mx-4 mt-3 flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <UserAvatar
                  className="h-10 w-10 "
                  user={{
                    name: stories[0]?.author.name || null,
                    image: stories[0]?.author.image || null,
                  }}
                />

                <div className="flex items-center gap-x-1">
                  <span className="text-[14px] font-medium text-white">
                    {stories[0].author.name}
                  </span>
                  <span className="text-[12px] font-light text-white ">
                    {getTimeDifference(latestImage.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-transparent"
                >
                  <Play className="h-5 w-5 fill-white text-white" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-transparent"
                >
                  <MoreHorizontal className="h-7 w-7 fill-white text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 right-[23vw]">
          <Button className=" bg-neutral-200 hover:bg-neutral-400 rounded-full py-7 px-2 ">
            <ChevronRight className="h-10 w-10 text-neutral-800" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryPageContent;
