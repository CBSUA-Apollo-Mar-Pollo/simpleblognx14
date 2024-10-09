"use client";

import { getDominantColor } from "@/actions/getDominantColor";
import { storeToRecentPosts } from "@/actions/storeToRecentPosts";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import MultipleImageRender from "../multiple-image-render";
import {
  Maximize,
  Maximize2,
  Pause,
  Play,
  Settings,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/utils/Icons";
import { useIntersection } from "@mantine/hooks";

const StandardPostCard = ({
  blog,
  isVideoPaused,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  progress,
  setProgress,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(1);

  const [isVolumeHovered, setIsVolumeHovered] = useState(false);

  const { ref, entry } = useIntersection({
    threshold: 1, // Adjust this value as needed
  });

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isVideoPaused]);

  useEffect(() => {
    if (videoRef.current) {
      if (entry?.isIntersecting) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        setIsVolumeHovered(false);
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [entry]);

  // for gettting the duration
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
    const newVolume = parseFloat(e.target.value);
    const video = videoRef.current;
    video.volume = newVolume; // Set the video volume
    setVolume(newVolume); // Update state
  };

  const { data: dominantColorPost, isLoading } = useQuery({
    queryKey: ["dominantColorPost", blog.image],
    queryFn: async () => {
      const res = await getDominantColor(blog.image[0].url);
      return res;
    },
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  const handleVolumeHovered = () => {
    setIsVolumeHovered(true);
  };

  const handleVolumeUnhovered = () => {
    setIsVolumeHovered(false);
  };

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
          {isPlaying === false && progress === 0 && (
            <Button
              onClick={() => togglePlayPause()}
              variant="ghost"
              className="hover:cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-[4px] rounded-full h-24 w-28 px-[10px] py-[50px] bg-neutral-900/60 hover:bg-neutral-900/60 z-40"
            >
              <Play className="h-16 w-16 text-neutral-50 fill-white ml-2" />
            </Button>
          )}

          <div
            ref={ref}
            onClick={togglePlayPause}
            className="flex flex-col items-center hover:cursor-pointer"
          >
            <video
              ref={videoRef}
              className="object-cover border-0 max-h-[55vh]"
              preload="metadata"
              playsInline
              loop
              onTimeUpdate={handleTimeUpdate}
              src={blog.video[0].url}
            />
          </div>

          {/* custom control buttons */}

          {progress !== 0 && (
            <div className="flex items-center space-x-2 absolute bottom-2  w-full px-4 ">
              <div className="flex items-center">
                <button
                  onClick={togglePlayPause}
                  className=" text-white p-2 rounded"
                >
                  {isPlaying ? (
                    <Pause className="fill-white h-5 w-5" />
                  ) : (
                    <Play className="fill-white h-5 w-5" />
                  )}
                </button>
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* video progress bar */}
              <input
                id="video-progress"
                type="range"
                value={progress}
                onChange={handleSeek}
                style={{
                  background: `linear-gradient(to right, #4a90e2 0%, #4a90e2 ${progress}%, #7a7a7a ${progress}%, #7a7a7a 100%)`,
                }}
                className="hover:cursor-pointer flex-1"
              />

              <div className="flex items-center gap-x-4 pl-4">
                <Icons.SettingIcon className="h-5 w-5 fill-white" />

                <Maximize2 className="text-white  h-5 w-5" />

                <Icons.Minimize className="h-7 w-7 fill-white text-white" />
                {/* volume slider */}
                <div
                  onMouseEnter={handleVolumeHovered}
                  className="flex items-center relative"
                >
                  <Volume2 className="text-white h-7 w-7" />
                  {isVolumeHovered && (
                    <input
                      onMouseEnter={handleVolumeHovered}
                      onMouseLeave={handleVolumeUnhovered}
                      id="volume-slider"
                      type="range"
                      value={volume}
                      min="0"
                      max="1"
                      step="0.05"
                      onChange={handleVolumeChange}
                      style={{
                        background: `linear-gradient(to right, #4a90e2 0%, #4a90e2 ${
                          volume * 100
                        }%, #7a7a7a ${volume * 100}%, #7a7a7a 100%)`,
                      }}
                      className="transform -rotate-90  cursor-pointer absolute bottom-20 -right-9 rounded-full"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StandardPostCard;
