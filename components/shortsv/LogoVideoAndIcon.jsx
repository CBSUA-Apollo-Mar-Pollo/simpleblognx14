"use client";

import {
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Heart,
  MessageCircle,
  MoreVertical,
  Pause,
  Play,
  Redo2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ProfileImageAndIcons from "../PostComment/ProfileImageAndIcons";
import UserAvatar from "../utils/UserAvatar";
import { Button, buttonVariants } from "../ui/Button";
import { cn } from "@/lib/utils";

const LogoVideoAndIcon = ({
  videoData,
  setToggleCommentSection,
  toggleCommentSection,
  commentAmt,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const videoRef = useRef(null);
  const close = () => {
    router.back();
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  console.log(toggleCommentSection);

  return (
    <>
      <div className="absolute top-0 flex justify-between w-full items-center px-5 py-2">
        {/* close button and logo */}
        <div className="flex items-center justify-center gap-2 z-20">
          <div
            className="py-4 px-4 cursor-pointer hover:bg-gray-600 rounded-full transition"
            onClick={close}
          >
            <X className=" text-white" />
          </div>
          <Link href="/" className="font-bold flex items-center gap-x-3">
            <span className="py-[6px] px-4 rounded-full bg-yellow-400 text-4xl">
              E
            </span>
            <h1 className="text-white font-bold text-2xl">Shortsv</h1>
          </Link>
        </div>
        {/* enter fullscreen */}
        {!toggleCommentSection && (
          <div className="z-20">
            <ProfileImageAndIcons session={session} />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <div className="z-20 flex items-center mr-20 ">
          <ChevronLeft className="text-white dark:text-neutral-100 bg-neutral-800 p-3 h-14 w-14 rounded-full cursor-pointer" />
        </div>
        <div className="relative border dark:border-neutral-800 border-neutral-300 rounded-2xl mt-8">
          {isPlaying ? (
            <Pause
              onClick={handlePlayClick}
              className="fill-white stroke-none absolute top-5 left-5 flex items-start justify-start z-20 cursor-pointer"
            />
          ) : (
            <Play
              onClick={handlePlayClick}
              className="fill-white stroke-none absolute top-5 left-5 flex items-start justify-start z-20 cursor-pointer"
            />
          )}

          {isMuted ? (
            <Volume2
              onClick={() => setIsMuted(false)}
              className="stroke-white absolute top-5 right-7 flex items-start justify-start z-20 cursor-pointer w-6 h-6"
            />
          ) : (
            <VolumeX
              onClick={() => setIsMuted(true)}
              className="stroke-white absolute top-5 right-7 flex items-start justify-start z-20 cursor-pointer w-6 h-6"
            />
          )}

          <video
            key={videoData.videoUrl}
            onClick={handlePlayClick}
            ref={videoRef}
            loop
            playsInline
            autoPlay
            preload="metadata"
            muted={!isMuted}
            className="h-[90vh] w-[22vw] rounded-2xl z-10 cursor-pointer bg-black"
          >
            <source src={videoData.videoUrl} type="video/mp4" />
          </video>

          <div className="absolute bottom-2 left-4">
            <div className="flex items-center gap-x-2">
              <UserAvatar
                className="h-8 w-8 cursor-pointer"
                post="post"
                user={{
                  handleName: videoData.author?.handleName,
                  bio: videoData.author?.bio,
                  birthdate: videoData.author?.birthdate,
                  name: videoData.author?.name || null,
                  image: videoData.author?.image || null,
                }}
              />
              <div className="gap-x-3 flex items-center">
                <span className="text-white">
                  {videoData.author?.handleName}
                </span>
                <Button
                  size="xs"
                  className="px-4 rounded-3xl dark:bg-neutral-100 dark:text-neutral-700 text-xs dark:hover:bg-neutral-300 "
                >
                  follow
                </Button>
              </div>
              {/* <Button
                variant="ghost"
                className="px-5 py-2 bg-neutral-600 text-white"
              >
                Follow
              </Button> */}
            </div>
            <div className="my-5">
              <p className="text-white text-sm">{videoData.description}</p>
            </div>
          </div>
        </div>
        <div className="space-y-5 flex flex-col justify-end mx-2 mb-5 z-30">
          <div className="p-3 bg-neutral-200 rounded-full dark:bg-neutral-800">
            <Heart className="dark:stroke-white fill-white" />
          </div>
          {/* comment button and comment amount */}
          <div className="flex flex-col space-y-1">
            <Button
              onClick={() => setToggleCommentSection((prevState) => !prevState)}
              className="px-3 py-6 bg-neutral-200 rounded-full dark:bg-neutral-800"
            >
              <MessageCircle
                className={`${
                  toggleCommentSection
                    ? "dark:stroke-blue-500 fill-blue-500 stroke-blue-500"
                    : "dark:stroke-white fill-white"
                }`}
              />
            </Button>
            <span className="text-center text-white text-sm">{commentAmt}</span>
          </div>
          {/* share button */}
          <div className="flex flex-col space-y-1">
            <Button className="px-3 py-6 bg-neutral-200 rounded-full dark:bg-neutral-800">
              <Redo2 className="dark:stroke-white" />
            </Button>
            <span className="text-center text-white text-sm">Share</span>
          </div>
          <div className="p-3 bg-neutral-200 rounded-full dark:bg-neutral-800">
            <MoreVertical className="dark:stroke-white" />
          </div>
        </div>
        <div className="z-20 flex items-center">
          <ChevronRight
            onClick={() => router.refresh()}
            className="text-white dark:text-neutral-100 bg-neutral-800  p-3 h-14 w-14 rounded-full cursor-pointer"
          />
        </div>
      </div>

      {!toggleCommentSection && (
        <div className="absolute right-7 top-16 mt-1">
          <Link
            href="/shortsv/create"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-neutral-800 rounded-full py-0 text-sm hover:bg-neutral-600"
            )}
          >
            <span className="pr-2">
              <Clapperboard className="w-5.5 h-5.5" />
            </span>
            Create shortsv
          </Link>
        </div>
      )}
    </>
  );
};

export default LogoVideoAndIcon;
