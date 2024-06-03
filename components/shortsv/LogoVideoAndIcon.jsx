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
import useCustomHooks from "@/hooks/use-custom-hooks";

const LogoVideoAndIcon = ({
  videoData,
  setToggleCommentSection,
  toggleCommentSection,
  commentAmt,
}) => {
  const { data: session } = useSession();
  const { signinToast } = useCustomHooks();
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

  const CheckSession = () => {
    if (!session && !session?.user) {
      return signinToast();
    } else {
      router.push("/shortsv/create");
    }
  };

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
          <Button
            size="md"
            variant="ghost"
            className="hover:bg-neutral-700 rounded-full bg-neutral-800"
          >
            <ChevronLeft className="text-white dark:text-neutral-100  p-3 h-14 w-14 rounded-full cursor-pointer" />
          </Button>
        </div>
        <div className="relative border dark:border-neutral-800 border-neutral-950 rounded-2xl mt-8">
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
            key={videoData?.videoUrl}
            onClick={handlePlayClick}
            ref={videoRef}
            loop
            playsInline
            autoPlay
            preload="metadata"
            muted={!isMuted}
            className="h-[90vh] w-[22vw] rounded-2xl z-10 cursor-pointer bg-black"
          >
            <source src={videoData?.videoUrl} type="video/mp4" />
          </video>

          <div className="absolute bottom-2 left-4 w-full">
            <div className="flex items-center justify-between gap-x-2">
              <div className="gap-x-3 flex items-center">
                <UserAvatar
                  className="h-8 w-8 cursor-pointer"
                  post="post"
                  user={{
                    handleName: videoData?.author?.handleName,
                    bio: videoData?.author?.bio,
                    birthdate: videoData?.author?.birthdate,
                    name: videoData?.author?.name || null,
                    image: videoData?.author?.image || null,
                  }}
                />
                <span className="text-white">
                  {videoData?.author?.name || videoData?.author?.handleName}
                </span>
              </div>
              <Button
                size="sm"
                className="mr-6 px-5 rounded-3xl bg-neutral-50 hover:bg-neutral-200 text-neutral-800 text-[13px] font-medium  "
              >
                Follow
              </Button>
              {/* <Button
                variant="ghost"
                className="px-5 py-2 bg-neutral-600 text-white"
              >
                Follow
              </Button> */}
            </div>
            <div className="mb-4 mt-3">
              <p className="text-white text-sm">{videoData?.description}</p>
            </div>
          </div>
        </div>
        <div className="space-y-5 flex flex-col justify-end mx-2 mb-5 z-30">
          <div className="p-3  rounded-full bg-neutral-800">
            <Heart className="stroke-white fill-white" />
          </div>
          {/* comment button and comment amount */}
          <div className="flex flex-col space-y-1">
            <Button
              onClick={() => setToggleCommentSection((prevState) => !prevState)}
              className="px-3 py-6  rounded-full bg-neutral-800"
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
            <Button className="px-3 py-6  rounded-full bg-neutral-800">
              <Redo2 className="dark:stroke-white" />
            </Button>
            <span className="text-center text-white text-sm">Share</span>
          </div>
          <div className="p-3  rounded-full bg-neutral-800">
            <MoreVertical className="stroke-white" />
          </div>
        </div>
        <div className="z-20 flex items-center">
          <Button
            onClick={() => router.refresh()}
            size="md"
            variant="ghost"
            className="hover:bg-neutral-700 rounded-full bg-neutral-800"
          >
            <ChevronRight className="text-white dark:text-neutral-100   p-3 h-14 w-14 rounded-full cursor-pointer" />
          </Button>
        </div>
      </div>

      {!toggleCommentSection && (
        <div className="absolute right-7 top-16 mt-1">
          <Button
            onClick={CheckSession}
            className="bg-neutral-100 text-black dark:text-white dark:bg-neutral-800 rounded-full py-0 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-500"
          >
            <span className="pr-2">
              <Clapperboard className="w-5.5 h-5.5 stroke-neutral-800 dark:text-neutral-200" />
            </span>
            Create shortsv
          </Button>
        </div>
      )}
    </>
  );
};

export default LogoVideoAndIcon;
