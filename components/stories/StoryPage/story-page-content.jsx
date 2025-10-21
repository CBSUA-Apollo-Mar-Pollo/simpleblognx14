"use client";

import NotificationMenu from "@/components/Notification/NotificationMenu";
import { Button } from "@/components/ui/Button";
import ChatBoxMenu from "@/components/utils/ChatBoxMenu";
import Menu from "@/components/utils/Menu";
import UserAccountNav from "@/components/utils/UserAccountNav";
import UserAvatar from "@/components/utils/UserAvatar";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pause,
  Play,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const StoryPageContent = ({
  session,
  stories,
  goToNextImage,
  goToPreviousImage,
}) => {
  console.log(stories, "story page content");
  const getTimeDifference = (createdAt) => {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const diffInMinutes = Math.floor((now - createdTime) / (1000 * 60));

    return diffInMinutes < 60
      ? `${diffInMinutes}m`
      : `${Math.floor(diffInMinutes / 60)}h`;
  };

  // const latestImage = stories.images.reduce((latest, image) =>
  //   new Date(image.createdAt) > new Date(latest.createdAt) ? image : latest
  // );

  const timerDuration = 7; // For example, 10 seconds
  const [progress, setProgress] = useState(0);
  const [countDown, setCountDown] = useState(8000);
  const [isPaused, setIsPaused] = useState(false);

  const handleNextImage = () => {
    setCountDown(countDown);
    setProgress(0);
    goToNextImage();
  };

  useEffect(() => {
    if (isPaused) return;
    // Start the timer
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          // When the progress reaches 100%, fire goToNextImage

          handleNextImage(); // Ensure goToNextImage is called after delay

          return 0; // Reset progress to 0 after reaching 100%
        }
        return prevProgress + 100 / timerDuration; // Increment progress
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, goToNextImage, timerDuration]);

  const togglePause = () => setIsPaused((prev) => !prev);

  return (
    <div className="relative">
      <div className="absolute top-4 right-7 flex items-center justify-end  gap-x-2 z-30">
        <Menu contentClassName="-mr-32" />
        <ChatBoxMenu />
        <NotificationMenu />
        <UserAccountNav user={session?.user} />
      </div>

      <div className="flex items-center justify-center w-full mt-4 relative">
        {stories.imgIndex === 1 && (
          <div className="absolute top-1/2 left-[23vw]">
            <Button
              onClick={() => handleNextImage()}
              className=" bg-neutral-200 hover:bg-neutral-400 rounded-full py-7 px-2 "
            >
              <ChevronLeft className="h-10 w-10 text-neutral-800" />
            </Button>
          </div>
        )}

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
            src={stories.Image}
            alt="Story image"
            objectFit="cover"
            className="min-h-[90vh] min-w-[24vw] rounded-xl"
          />

          <div className="absolute top-3 w-full">
            <div className="flex items-center gap-x-1 mx-4">
              {[...Array(stories.imgLength)].map((item, index) => (
                <div
                  key={index}
                  className="flex-1 h-[0.5vh]  bg-neutral-300 rounded-full"
                >
                  {stories.imgIndex === index && (
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        transition: progress === 0 ? "none" : "1s linear",
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="mx-4 mt-3 flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <UserAvatar
                  className="h-10 w-10 "
                  user={{
                    name: stories?.Author.name || null,
                    image: stories?.Author.image || null,
                  }}
                />

                <div className="flex items-center gap-x-1">
                  <span className="text-[14px] font-medium text-white">
                    {stories.Author.name}
                  </span>
                  {/* <span className="text-[12px] font-light text-white ">
                    {getTimeDifference(latestImage.createdAt)}
                  </span> */}
                </div>
              </div>

              <div className="flex items-center">
                <Button
                  onClick={togglePause}
                  size="icon"
                  variant="ghost"
                  className="hover:bg-transparent"
                >
                  {isPaused ? (
                    <Play className="h-5 w-5 fill-white text-white" />
                  ) : (
                    <Pause className="h-5 w-5 fill-white text-white" />
                  )}
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
          <Button
            onClick={() => handleNextImage()}
            className=" bg-neutral-200 hover:bg-neutral-400 rounded-full py-7 px-2 "
          >
            <ChevronRight className="h-10 w-10 text-neutral-800" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryPageContent;
