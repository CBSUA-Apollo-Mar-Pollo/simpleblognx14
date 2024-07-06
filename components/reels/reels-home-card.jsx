"use client";

import { getAllReels } from "@/actions/getAllReels";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { ChevronRight, Film, Play, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Icons } from "../utils/Icons";
import ToolTipComp from "../utils/ToolTipComp";

const ReelsHomeCard = () => {
  const videoRefs = useRef([]);
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
              <X />
            </Button>
          </ToolTipComp>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-2 relative">
        <div className="overflow-x-hidden ">
          <div className="flex space-x-2">
            {reels?.map((reel, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[17vw] h-[60vh] hover:opacity-60 cursor-pointer"
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
              </div>
            ))}
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-[25vh] right-[2vw] z-50 bg-white dark:bg-neutral-700 dark:hover:bg-neutral-500 h-12 w-12  rounded-full"
        >
          <ChevronRight className="h-9 w-9 text-neutral-800 dark:text-neutral-300 stroke-[1.6px]" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReelsHomeCard;
