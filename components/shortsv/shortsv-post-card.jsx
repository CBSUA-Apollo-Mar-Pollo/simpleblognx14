"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/Card";
import UserAvatar from "../utils/UserAvatar";
import {
  ArrowBigDown,
  ArrowBigUp,
  Dot,
  Forward,
  Globe,
  MessageCircle,
  MoreHorizontal,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "../utils/Icons";
import { useMutation } from "@tanstack/react-query";
import { usePrevious } from "@mantine/hooks";
import useCustomHooks from "@/hooks/use-custom-hooks";
import axios, { AxiosError } from "axios";

const ShortsVPostCard = ({
  videoData,
  session,
  shortsvVotesAmt,
  currentShortsvVote,
}) => {
  const { signinToast } = useCustomHooks();
  const [votesAmt, setVotesAmt] = useState(shortsvVotesAmt);
  const [currentVote, setCurrentVote] = useState(currentShortsvVote);
  const prevVote = usePrevious(currentVote);

  useEffect(() => {
    setCurrentVote(currentShortsvVote);
  }, [currentShortsvVote]);

  const router = useRouter();

  const [isMuted, setIsMuted] = useState(false);

  const date = new Date(videoData.createdAt);
  const options = { month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleClick = () => {
    router.push(`/shortsv/${videoData.id}`);
  };

  const handleVolumeClick = (event) => {
    event.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const { mutate: vote } = useMutation({
    mutationFn: async (type) => {
      const payload = {
        voteType: type,
        shortsvId: videoData.id,
      };

      await axios.patch("/api/shortsv/vote", payload);
    },
    onError: (err, voteType) => {
      if (voteType === "UP") setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);

      // reset current vote when error 500
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return signinToast();
        }
      }

      return toast({
        title: "Something went wrong",
        description: "Your vote was not registered. please try again",
        variant: "destructive",
      });
    },
    onMutate: (type) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === "UP") setVotesAmt((prev) => prev - 1);
        else if (type === "DOWN") setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type);
        if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  const upvoteClick = (event) => {
    event.stopPropagation();
    vote("UP");
  };
  const downvoteClick = (event) => {
    event.stopPropagation();
    vote("DOWN");
  };

  return (
    <Card
      className="rounded-2xl shadow-md dark:border-none"
      onClick={() => handleClick()}
    >
      <CardContent className="p-0">
        <div
          className="flex justify-center bg-neutral-400  relative rounded-2xl"
          style={{
            background: `
            linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
            linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
          `,
          }}
        >
          <div
            className="absolute top-0 flex justify-between w-full px-5 rounded-2xl"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))`,
            }}
          >
            <div className="gap-x-2 flex items-start mt-4">
              <UserAvatar
                className="h-10 w-10 cursor-pointer"
                post="post"
                user={{
                  handleName: videoData?.author?.handleName,
                  bio: videoData?.author?.bio,
                  birthdate: videoData?.author?.birthdate,
                  name: videoData?.author?.name || null,
                  image: videoData?.author?.image || null,
                }}
              />
              <div className="flex flex-col">
                <span className="text-white text-sm font-semibold">
                  {videoData?.author?.name || videoData?.author?.handleName}
                </span>
                <div className="flex items-center">
                  <h6 className="text-xs text-white">ShortsV</h6>

                  <Dot className="text-white -mx-0.5" />

                  <h6 className="text-white text-xs -mx-0.5">
                    {formattedDate}
                  </h6>

                  <Dot className="text-white -mx-0.5" />

                  <Globe className="text-white h-3 w-3" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-3 mr-2">
              {isMuted ? (
                <Volume2
                  onClick={handleVolumeClick}
                  className="stroke-white flex items-start justify-start z-20 cursor-pointer w-6 h-6"
                />
              ) : (
                <VolumeX
                  onClick={handleVolumeClick}
                  className="stroke-white flex items-start justify-start z-20 cursor-pointer w-6 h-6"
                />
              )}
              <MoreHorizontal className="stroke-white" />
            </div>
          </div>

          {/* video content */}
          <div className="max-w-[25vw]">
            <video
              key={videoData?.videoUrl}
              loop
              playsInline
              autoPlay
              preload="metadata"
              muted={!isMuted}
              className="max-h-[70vh] h-[70vh]  z-10 cursor-pointer object-cover"
            >
              <source src={videoData?.videoUrl} type="video/mp4" />
            </video>
          </div>

          {/* Interactable buttons */}
          <div className="absolute bottom-7 right-5 flex flex-col space-y-2">
            <button
              aria-label="upvote"
              className={cn("p-2 bg-neutral-800/40  rounded-full", {
                "bg-orange-500/50": currentVote === "UP",
              })}
              onClick={upvoteClick}
            >
              <ArrowBigUp
                className={cn("h-8 w-8  text-neutral-50 ", {
                  "stroke-[1.6px]  fill-orange-500 ": currentVote === "UP",
                })}
              />
            </button>

            {/* currentvote */}
            <p className="text-center font-semibold  text-neutral-200 px-1 text-lg">
              {votesAmt}
            </p>

            {/* downvote button */}
            <button
              aria-label="downvote"
              className={cn("p-2 bg-neutral-800/40  rounded-full", {
                "bg-violet-500/50": currentVote === "DOWN",
              })}
              onClick={downvoteClick}
            >
              <ArrowBigDown
                className={cn("h-8 w-8 text-neutral-50   ", {
                  " stroke-[1.6px]  fill-violet-600 ": currentVote === "DOWN",
                })}
              />
            </button>
            <button
              aria-label="upvote"
              className="p-3 bg-neutral-800/40  rounded-full"
            >
              <MessageCircle
                className={cn("h-6 w-6  text-neutral-50  fill-neutral-50 ")}
              />
            </button>

            <button
              aria-label="upvote"
              className="p-3 bg-neutral-800/40  rounded-full"
            >
              <Icons.Share
                className={cn("h-6 w-6  text-neutral-50  fill-neutral-50 ")}
              />
            </button>
          </div>

          <div className="absolute left-6 bottom-4">
            <span className="text-neutral-100">{videoData.description}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortsVPostCard;
