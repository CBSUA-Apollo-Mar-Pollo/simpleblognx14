"use client";

import { getDominantColor } from "@/actions/getDominantColor";
import { storeToRecentPosts } from "@/actions/storeToRecentPosts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import MultipleImageRender from "../multiple-image-render";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

const StandardPostCard = ({ blog }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, [videoRef.current]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
    setProgress((video.currentTime / video.duration) * 100);
    setCurrentTime(video.currentTime);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    video.currentTime = (e.target.value / 100) * video.duration;
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    video.volume = e.target.value;
    setVolume(e.target.value);
  };

  const { data: dominantColorPost, isLoading } = useQuery({
    queryKey: ["dominantColorPost", blog.image],
    queryFn: async () => {
      const res = await getDominantColor(blog.image[0].url);
      return res;
    },
  });

  return (
    <div>
      {blog.description && (
        <p className="px-5 text-justify leading-snug text-[15px] font-[12px] py-1">
          {blog.description}
        </p>
      )}

      {blog.image && (
        <MultipleImageRender
          blog={blog}
          dominantColorPost={dominantColorPost}
          isLoading={isLoading}
        />
      )}

      {blog.video && (
        <div className="bg-neutral-950 relative">
          {isPlaying === false && (
            <Button
              onClick={() => togglePlayPause()}
              variant="ghost"
              className="hover:cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-[4px] rounded-full h-24 w-28 px-[10px] py-[50px] bg-neutral-900/60 hover:bg-neutral-900/60 z-40"
            >
              <Play className="h-16 w-16 text-neutral-50 fill-white ml-2" />
            </Button>
          )}
          <div
            onClick={togglePlayPause}
            className="flex flex-col items-center hover:cursor-pointer"
          >
            <video
              ref={videoRef}
              className="object-cover border-0 max-h-[55vh]"
              preload="metadata"
              playsInline
              loop
              muted
              onTimeUpdate={handleTimeUpdate}
              src={blog.video[0].url}
            />
          </div>

          {isPlaying === true && (
            <div className="flex items-center space-x-2 absolute bottom-2  w-full px-4">
              <button
                onClick={togglePlayPause}
                className=" text-white p-2 rounded"
              >
                {isPlaying ? (
                  <Pause className="fill-white" />
                ) : (
                  <Play className="fill-white" />
                )}
              </button>
              <span className="text-white">
                {Math.floor(currentTime)} / {Math.floor(duration)}
              </span>
              <input
                type="range"
                value={progress}
                onChange={handleSeek}
                className="flex-1 "
              />

              <input
                type="range"
                value={volume}
                min="0"
                max="1"
                step="0.1"
                onChange={handleVolumeChange}
                className="w-24"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StandardPostCard;
