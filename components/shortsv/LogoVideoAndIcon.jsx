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
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import ProfileImageAndIcons from "../PostComment/ProfileImageAndIcons";
import UserAvatar from "../utils/UserAvatar";
import { Button } from "../ui/Button";

import useCustomHooks from "@/hooks/use-custom-hooks";
import ShortsvVote from "../PostVote/shortsv-vote";

const LogoVideoAndIcon = ({
  videoData,
  setToggleCommentSection,
  toggleCommentSection,
  commentAmt,
  nextLink,
}) => {
  const { data: session } = useSession();
  const { signinToast } = useCustomHooks();
  const router = useRouter();
  const videoRef = useRef(null);
  const close = () => {
    router.back();
  };
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = false;
    }
  }, [videoData]);

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

  const goToNextLink = () => {
    router.push(`/shortsv/${nextLink}`);
  };

  return (
    <>
      <div className="absolute top-0 flex justify-between w-full items-center px-5 py-2">
        {/* close button and logo */}
        <div className="flex items-center justify-center gap-2 z-20">
          <div
            className="p-4 cursor-pointer dark:hover:bg-gray-600 hover:bg-neutral-300 rounded-full transition"
            onClick={close}
          >
            <X className=" text-white h-7 w-7" />
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
            onClick={() => router.back()}
            size="md"
            variant="ghost"
            className="hover:bg-neutral-700 rounded-full bg-neutral-800"
          >
            <ChevronLeft className="text-white dark:text-neutral-100  p-3 h-14 w-14 rounded-full cursor-pointer" />
          </Button>
        </div>
        <div className="relative  rounded-2xl mt-4 h-[95vh] flex justify-center items-center">
          {isPlaying ? (
            <Pause
              onClick={handlePlayClick}
              className="fill-white stroke-none absolute top-8 left-5 flex items-start justify-start z-20 cursor-pointer"
            />
          ) : (
            <Play
              onClick={handlePlayClick}
              className="fill-white stroke-none absolute top-8 left-5 flex items-start justify-start z-20 cursor-pointer"
            />
          )}

          {isMuted ? (
            <Volume2
              onClick={() => setIsMuted(false)}
              className="stroke-white absolute top-8 right-7 flex items-start justify-start z-20 cursor-pointer w-6 h-6"
            />
          ) : (
            <VolumeX
              onClick={() => setIsMuted(true)}
              className="stroke-white absolute top-8 right-7 flex items-start justify-start z-20 cursor-pointer w-6 h-6"
            />
          )}

          {!isPlaying && (
            <Play
              onClick={handlePlayClick}
              className="fill-white stroke-none absolute   z-20 cursor-pointer w-24 h-24 bg-neutral-800 p-4 rounded-full bg-opacity-90"
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
            className="h-[92vh] w-[23vw] rounded-2xl z-10 cursor-pointer bg-black"
          >
            <source src={videoData?.videoUrl} type="video/mp4" />
          </video>

          <div className="absolute bottom-4 left-4 w-full z-20">
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
                <span className="text-white text-sm">
                  {videoData?.author?.name || videoData?.author?.handleName}
                </span>
              </div>

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
        <div className="space-y-3 flex flex-col justify-end mx-2 mb-5 z-30 ml-4">
          <ShortsvVote />
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
            <span className="text-center text-white ">{commentAmt}</span>
          </div>
          {/* share button */}
          <div className="flex flex-col space-y-2">
            <Button className="px-3 py-6  rounded-full bg-neutral-800">
              <Redo2 className="dark:stroke-white" />
            </Button>
            <span className="text-center text-white text-sm">Share</span>
          </div>
          <div className="p-3  rounded-full bg-neutral-800">
            <MoreVertical className="stroke-white" />
          </div>
        </div>
        <div className="z-20 flex items-center ml-3">
          <Button
            onClick={() => goToNextLink()}
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
            className="bg-neutral-100 drop-shadow-md text-neutral-900 font-bold  rounded-lg py-0 text-[13px] hover:bg-neutral-200 "
          >
            <span className="pr-2.5">
              <Clapperboard className="w-5.5 h-5.5 text-neutral-900 " />
            </span>
            Create shortsv
          </Button>
        </div>
      )}
    </>
  );
};

export default LogoVideoAndIcon;
