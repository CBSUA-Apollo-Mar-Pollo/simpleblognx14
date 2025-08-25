"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import SearchVideoInput from "./search-video-input";
import { Separator } from "../ui/Separator";
import { useIntersection } from "@mantine/hooks";
import { Button } from "../ui/Button";
import { Dot, Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Icons } from "../utils/Icons";
import UserAvatar from "../utils/UserAvatar";

const WatchPageSingleVideo = ({ video }) => {
  const [isVideoPaused, setVideoPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(1);

  const [isVolumeHovered, setIsVolumeHovered] = useState(false);

  const { ref, entry } = useIntersection({
    threshold: 1, // Adjust this value as needed
  });

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

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.currentTime = currentTime;
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

  const handleClickMute = () => {
    const video = videoRef.current;
    if (video.volume === 0) {
      video.volume = 1;
      setVolume(1);
    } else {
      video.volume = 0;
      setVolume(0);
    }
  };

  const date = new Date(video?.createdAt);

  const options = {
    month: "long", // "August"
    day: "numeric", // "12"
    hour: "numeric", // "3"
    minute: "2-digit", // "09"
    hour12: true, // "PM"
  };

  const formatted = date.toLocaleString("en-US", options);
  return (
    <>
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <div className="flex items-center gap-x-5 ">
          <h1 className="text-2xl font-bold">Video</h1>
          <div className="flex items-center gap-x-2">
            <Link
              href="/watch"
              className="bg-neutral-200 px-3 py-2 rounded-full font-medium text-[15px] hover:bg-neutral-300"
            >
              Home
            </Link>
            <Link
              href="/watch"
              className="bg-neutral-200 px-3 py-2 rounded-full font-medium text-[15px] hover:bg-neutral-300"
            >
              Shortsv
            </Link>
            <Link
              href="/watch"
              className="bg-neutral-200 px-3 py-2 rounded-full font-medium text-[15px] hover:bg-neutral-300"
            >
              Explore
            </Link>
            <Link
              href="/watch"
              className="bg-neutral-200 px-3 py-2 rounded-full font-medium text-[15px] hover:bg-neutral-300"
            >
              Saved videos
            </Link>
            <Link
              href="/watch"
              className="bg-neutral-200 px-3 py-2 rounded-full font-medium text-[15px] hover:bg-neutral-300"
            >
              Following
            </Link>
          </div>
        </div>

        <>
          <SearchVideoInput />
        </>
      </div>

      <Separator />

      {/* main content */}
      <div className="mx-20">
        <div className="flex ">
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
                className="object-fit border-0 min-h-[55vh] max-h-[55vh]"
                preload="metadata"
                playsInline
                crossOrigin="anonymous"
                loop
                onTimeUpdate={handleTimeUpdate}
                src={video.video[0].url}
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
                    {volume === 0 ? (
                      <VolumeX
                        onClick={() => handleClickMute()}
                        className="text-white h-7 w-7 cursor-pointer"
                      />
                    ) : (
                      <Volume2
                        onClick={() => handleClickMute()}
                        className="text-white h-7 w-7 cursor-pointer"
                      />
                    )}

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
          <div className="p-2">
            <div className="flex items-center">
              <UserAvatar
                className="h-10 w-10 mb-1 mr-2 mt-1"
                user={{
                  name: video.author.name || null,
                  image: video.author.image || null,
                }}
              />

              <div>
                <p className="text-[15px] font-medium">{video.author.name}</p>
                <div className="flex items-center text-[12px] -mt-1">
                  <p className="font-semibold text-neutral-600">{formatted}</p>
                  <Dot className="h-4 w-4" />
                  <Icons.earthIcon className="h-3.5 w-3.5 fill-neutral-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchPageSingleVideo;
