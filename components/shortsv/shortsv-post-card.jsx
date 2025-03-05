"use client";

import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "../ui/Card";
import UserAvatar from "../utils/UserAvatar";
import {
  ArrowBigDown,
  ArrowBigUp,
  Dot,
  Forward,
  Globe,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "../utils/Icons";
import { useMutation } from "@tanstack/react-query";
import { useIntersection, usePrevious } from "@mantine/hooks";
import useCustomHooks from "@/hooks/use-custom-hooks";
import axios, { AxiosError } from "axios";
import ShortsVCardOptions from "./shortsv-card-options";

const ShortsVPostCard = ({
  videoData,
  session,
  shortsvVotesAmt,
  currentShortsvVote,
}) => {
  const mainVideoRef = useRef(null);
  const backgroundVideoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const { signinToast } = useCustomHooks();
  const [votesAmt, setVotesAmt] = useState(shortsvVotesAmt);
  const [currentVote, setCurrentVote] = useState(currentShortsvVote);
  const [isMuted, setIsMuted] = useState(true);
  const prevVote = usePrevious(currentVote);

  const { ref, entry } = useIntersection({
    threshold: 0.4, // Adjust this value as needed
  });

  useEffect(() => {
    // Handle video play/pause based on visibility
    if (mainVideoRef.current) {
      if (entry?.isIntersecting) {
        if (!isPlaying) {
          let playPromise = mainVideoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      } else {
        if (isPlaying) {
          mainVideoRef.current.pause();
          setIsPlaying(false);
        }
      }
    }
  }, [entry, isPlaying]);

  useEffect(() => {
    if (!mainVideoRef.current) return;

    const onPlay = () => {
      if (isWaiting) setIsWaiting(false);
      setIsPlaying(true);
    };

    const onPause = () => {
      if (isWaiting) setIsWaiting(false);
      setIsPlaying(false);
    };

    const onWaiting = () => {
      if (isPlaying) setIsPlaying(false);
      setIsWaiting(true);
    };

    const element = mainVideoRef.current;

    element.addEventListener("play", onPlay);
    element.addEventListener("playing", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("waiting", onWaiting);

    return () => {
      element.removeEventListener("play", onPlay);
      element.removeEventListener("playing", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("waiting", onWaiting);
    };
  }, [mainVideoRef.current, isPlaying, isWaiting]);

  useEffect(() => {
    setCurrentVote(currentShortsvVote);
  }, [currentShortsvVote]);

  const router = useRouter();
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

  const toggleVolume = (e) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const handlePauseOrPlay = () => {
    if (!mainVideoRef.current) return;
    const video = mainVideoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="xl:rounded-2xl rounded-none shadow-md dark:border-none">
      <CardContent className="p-0">
        <div
          onClick={handlePauseOrPlay}
          className="flex justify-center bg-neutral-500 dark:bg-neutral-950 relative xl:rounded-2xl rounded-none overflow-clip"
          ref={ref}
        >
          <video
            ref={backgroundVideoRef}
            key={videoData?.videoUrl}
            playsInline
            muted={true}
            className="absolute inset-0 w-full h-full object-cover  blur-[25px] z-[1] rounded-2xl "
            src={videoData?.videoUrl}
          />

          <div
            className="absolute top-0 flex justify-between w-full xl:px-5 px-1 xl:rounded-2xl rounded-none z-[3]"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))`,
            }}
          >
            <div className="gap-x-2  flex items-start mt-4">
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
              {isPlaying ? (
                <Play
                  onClick={handlePauseOrPlay}
                  className="stroke-white flex items-start justify-start z-20 cursor-pointer w-5 h-5"
                />
              ) : (
                <Pause
                  onClick={handlePauseOrPlay}
                  className="stroke-white flex items-start justify-start z-20 cursor-pointer w-5 h-5"
                />
              )}
              {isMuted ? (
                <Volume2
                  onClick={toggleVolume}
                  className="stroke-white flex items-start justify-start z-20 cursor-pointer w-6 h-6"
                />
              ) : (
                <VolumeX
                  onClick={toggleVolume}
                  className="stroke-white flex items-start justify-start z-20 cursor-pointer w-6 h-6"
                />
              )}

              <ShortsVCardOptions />
            </div>
          </div>

          {isWaiting && (
            <Loader2 className="absolute top-1/2 left-1/2  h-10 w-10 text-neutral-200 animate-spin my-4 z-30 " />
          )}

          {/* video content */}
          <div className="xl:max-w-[25vw] z-[2]">
            <video
              ref={mainVideoRef}
              key={videoData?.videoUrl}
              loop
              playsInline
              muted={!isMuted}
              className="max-h-[70vh] h-[70vh] z-10 cursor-pointer object-cover"
              style={{
                backgroundBlendMode: "overlay",
              }}
              src={videoData?.videoUrl}
            />
          </div>

          {/* Interactable buttons */}
          <div className="absolute bottom-7 right-5 flex flex-col space-y-2 z-[3]">
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
              onClick={handleClick}
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

          <div className="absolute left-6 bottom-4 z-[3]">
            <span className="text-neutral-100">{videoData.description}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortsVPostCard;
