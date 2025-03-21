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
import { Skeleton } from "../ui/Skeleton";

const ReelsHomeCard = () => {
  const videoContainerRef = useRef(null);
  const videoRefs = useRef([]);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const { data: reels, isLoading } = useQuery({
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
      const container = videoContainerRef.current;

      // Scroll to the right by 230px
      container.scrollBy({
        left: 240,
        behavior: "smooth",
      });

      // Check if the container is scrolled to the end
      const atBeginning = container.scrollLeft === 0;
      const atEnd =
        Math.round(container.scrollLeft + container.clientWidth) >=
        container.scrollWidth;

      // Hide the right scroll button if we're at the end
      if (atEnd) {
        setShowRightScroll(false);
      } else {
        setShowRightScroll(true); // Show the button if we are not at the end
      }

      // Always show the left button unless we're at the beginning
      if (atBeginning) {
        setShowLeftScroll(false);
      } else {
        setShowLeftScroll(true);
      }
    }
  };

  const LeftScroll = () => {
    if (videoContainerRef.current) {
      const container = videoContainerRef.current;

      // Scroll to the left by 230px
      container.scrollBy({
        left: -230,
        behavior: "smooth",
      });

      // Check if the container is scrolled to the beginning
      const atBeginning = container.scrollLeft === 0;
      const atEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth;

      // Hide the left scroll button if we're at the beginning
      if (atBeginning) {
        setShowLeftScroll(false);
      } else {
        setShowLeftScroll(true); // Show the button if we are not at the beginning
      }

      // Always show the right button unless we're at the end
      if (atEnd) {
        setShowRightScroll(false);
      } else {
        setShowRightScroll(true);
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
    <Card className="dark:bg-neutral-800 dark:border-0 xl:rounded-xl rounded-none mb-3  ">
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
        {showLeftScroll && (
          <Button
            onClick={() => LeftScroll()}
            size="icon"
            variant="ghost"
            className="absolute top-[25vh] left-[2vw] z-50 bg-white dark:bg-neutral-700 dark:hover:bg-neutral-500 h-12 w-12  rounded-full"
          >
            <ChevronLeft className="h-9 w-9 text-neutral-800 dark:text-neutral-300 stroke-[1.6px]" />
          </Button>
        )}

        {isLoading && (
          <div className="overflow-x-hidden pb-1 flex items-center gap-x-2">
            {[...Array(7)].map((_, index) => (
              <div key={index}>
                <Skeleton className="flex-shrink-0 w-[17vw] h-[60vh] bg-neutral-400 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        <div ref={videoContainerRef} className="overflow-x-hidden">
          <div className="flex space-x-2">
            {!isLoading &&
              reels?.map((reel, index) => (
                <Link
                  onMouseEnter={() => onMouseHoverVideoPlay(index)}
                  onMouseLeave={() => onMouseHoverVideoStop(index)}
                  href={`/shortsv/${reel.id}`}
                  key={index}
                  className="flex-shrink-0 xl:w-[17vw] xl:h-[60vh] xl:max-h-[60vh] h-[40vh] max-h-[40vh] w-[45vw]  hover:opacity-70 cursor-pointer"
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="object-cover w-full h-full rounded-lg z-20"
                    preload="metadata"
                    playsInline
                    loop
                    crossOrigin="anonymous"
                    autoPlay={index === 0 && true}
                    muted
                  >
                    <source src={reel.videoUrl} type="video/mp4" />
                  </video>
                </Link>
              ))}
          </div>
        </div>
        {showRightScroll && (
          <Button
            onClick={() => RightScroll()}
            size="icon"
            variant="ghost"
            className="absolute top-[25vh] right-[2vw] z-10 bg-white dark:bg-neutral-700 dark:hover:bg-neutral-500 h-12 w-12  rounded-full"
          >
            <ChevronRight className="h-9 w-9 text-neutral-800 dark:text-neutral-300 stroke-[1.6px]" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ReelsHomeCard;
