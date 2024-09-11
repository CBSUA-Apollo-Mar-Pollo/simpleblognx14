"use client";

import { getAllReels } from "@/actions/getAllReels";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import {
  ChevronLeft,
  ChevronRight,
  Film,
  MoreHorizontal,
  Play,
  X,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Icons } from "../utils/Icons";
import ToolTipComp from "../utils/ToolTipComp";
import Link from "next/link";

const ReelsHomeCard = () => {
  const videoContainerRef = useRef(null);
  const videoRefs = useRef([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: reels } = useQuery({
    queryKey: ["getReels"],
    queryFn: async () => {
      const res = await getAllReels();
      return res;
    },
  });

  useEffect(() => {
    // Play the first video and limit its playback to a specific duration
    if (videoRefs.current.length > 0) {
      const firstVideo = videoRefs.current[0];
      const duration = 10000; // Set the duration in milliseconds (e.g., 10 seconds)

      // Play the video
      firstVideo.play();

      // Stop the video after the specified duration
      setTimeout(() => {
        firstVideo.pause();
        firstVideo.currentTime = 0; // Reset video to beginning
      }, duration);
    }
  }, [reels]);

  const RightScroll = () => {
    if (videoContainerRef.current) {
      videoContainerRef.current.scrollBy({
        left: 230,
        behavior: "smooth",
      });
      setIsScrolled(true);
    }
  };

  const LeftScroll = () => {
    if (videoContainerRef.current) {
      videoContainerRef.current.scrollBy({
        left: -230,
        behavior: "smooth",
      });

      const container = videoContainerRef.current;
      const atBeginning = container.scrollLeft === 0;
      const atEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth;
      if (atBeginning) {
        setIsScrolled(false);
      }

      if (atEnd) {
        setIsScrolled(false);
      }
    }
  };

  const onMouseHoverVideoPlay = (index) => {
    if (videoRefs.current.length > 0) {
      const video = videoRefs.current[index];
      const duration = 10000; // Set the duration in milliseconds (e.g., 10 seconds)

      // Play the video
      video.play();

      // Stop the video after the specified duration
      setTimeout(() => {
        video.pause();
        video.currentTime = 0; // Reset video to beginning
      }, duration);
    }
  };

  const onMouseHoverVideoStop = (index) => {
    if (videoRefs.current.length > 0) {
      const video = videoRefs.current[index];
      // Set the duration in milliseconds (e.g., 10 seconds)

      // Play the video
      video.currentTime = 0;
      video.pause();
    }
  };

  return (
    <Card className="dark:bg-neutral-800 dark:border-0 rounded-xl mb-3">
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-[16px] font-bold flex justify-between dark:text-neutral-100">
          <div className="flex items-center gap-x-2">
            <Icons.reelsIcon className="h-8 w-8 dark:fill-neutral-100" />
            Reels and Short videos
          </div>
          <ToolTipComp content="Hide">
            <Button
              size="icon"
              variant="ghost"
              className="mr-1 rounded-full dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
            >
              <MoreHorizontal />
            </Button>
          </ToolTipComp>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-2 relative">
        {isScrolled && (
          <Button
            onClick={() => LeftScroll()}
            size="icon"
            variant="ghost"
            className="absolute top-[25vh] left-[2vw] z-50 bg-white dark:bg-neutral-700 dark:hover:bg-neutral-500 h-12 w-12  rounded-full"
          >
            <ChevronLeft className="h-9 w-9 text-neutral-800 dark:text-neutral-300 stroke-[1.6px]" />
          </Button>
        )}
        <div ref={videoContainerRef} className="overflow-x-hidden">
          <div className="flex space-x-2">
            {reels?.map((reel, index) => (
              <Link
                onMouseEnter={() => onMouseHoverVideoPlay(index)}
                onMouseLeave={() => onMouseHoverVideoStop(index)}
                href={`/shortsv/${reel.id}`}
                key={index}
                className="flex-shrink-0 w-[17vw] h-[60vh] hover:opacity-70 cursor-pointer"
              >
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="object-cover w-full h-full rounded-lg z-20"
                  preload="metadata"
                  playsInline
                  loop
                  autoPlay={index === 0 && true}
                  muted
                >
                  <source src={reel.videoUrl} type="video/mp4" />
                </video>
              </Link>
            ))}
          </div>
        </div>
        <Button
          onClick={() => RightScroll()}
          size="icon"
          variant="ghost"
          className="absolute top-[25vh] right-[2vw] z-10 bg-white dark:bg-neutral-700 dark:hover:bg-neutral-500 h-12 w-12  rounded-full"
        >
          <ChevronRight className="h-9 w-9 text-neutral-800 dark:text-neutral-300 stroke-[1.6px]" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReelsHomeCard;
