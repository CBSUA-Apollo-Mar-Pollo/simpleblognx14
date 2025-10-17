"use client";

import { getDominantColor } from "@/data/getDominantColor";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import MultipleImageRender from "../multiple-image-render";
import {
  Loader2,
  Maximize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/utils/Icons";
import { useIntersection } from "@mantine/hooks";
import Link from "next/link";

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
  const [isWaiting, setIsWaiting] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [toggleVideoButton, setToggleVideoButton] = useState(false);
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
  }, []); // ✅ Runs only once when the component mounts

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.currentTime = currentTime;
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => console.error(error));
      }
    }
  }, [isVideoPaused, videoRef.current]);

  // handles autoplay when the video enters/exits the viewport
  useEffect(() => {
    if (videoRef.current) {
      if (entry?.isIntersecting) {
        let playPromise = videoRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        setIsVolumeHovered(false);
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [entry]);

  useEffect(() => {
    if (!videoRef.current) return;

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

    const element = videoRef.current;

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
  }, [videoRef.current]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (isWaiting) setIsWaiting(false);
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

  return (
    <div>
      {/* Description */}
      {blog.description && (
        <div
          style={{
            backgroundColor:
              blog?.textBackgroundStyle?.backgroundColorType === "solid" &&
              blog?.textBackgroundStyle?.color,
            backgroundImage:
              blog?.textBackgroundStyle?.backgroundColorType === "gradient"
                ? `linear-gradient(to bottom right, ${blog?.textBackgroundStyle?.color.from}, ${blog?.textBackgroundStyle?.color.to})`
                : `url('${blog?.textBackgroundStyle?.color}') `,
            color: blog?.textBackgroundStyle ? "white" : "black",
          }}
          className={`${
            blog?.textBackgroundStyle &&
            "h-[40vh] flex items-center justify-center"
          }  `}
        >
          <p
            className={`${
              blog?.textBackgroundStyle
                ? "text-2xl font-bold"
                : "text-[15px] mt-1 mb-2 dark:text-white "
            }  px-5 text-justify leading-snug font-[12px] py-1`}
          >
            {blog.description}
          </p>
        </div>
      )}

      {/* if image render this  */}
      {blog.image && (
        <MultipleImageRender
          blog={blog}
          dominantColorPost={dominantColorPost}
          isLoading={isLoading}
        />
      )}

      {/* if video render this */}
      {blog.video && (
        <>
          <div
            onMouseLeave={() => setToggleVideoButton(false)}
            onMouseEnter={() => setToggleVideoButton(true)}
            className="bg-neutral-950 relative "
          >
            {isPlaying === false && progress === 0 && (
              <Button
                onClick={() => togglePlayPause()}
                variant="ghost"
                className="hover:cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-[4px] rounded-full h-24 w-28 px-[10px] py-[50px] bg-neutral-900/60 hover:bg-neutral-900/60 z-40"
              >
                <Play className="h-16 w-16 text-neutral-50 fill-white ml-2" />
              </Button>
            )}

            {isWaiting && (
              <Loader2 className="absolute top-1/2 left-1/2  h-10 w-10 text-neutral-200 animate-spin my-4 " />
            )}

            <div
              ref={ref}
              onClick={togglePlayPause}
              className="flex flex-col items-center hover:cursor-pointer "
            >
              <video
                ref={videoRef}
                className="object-fit border-0 max-h-[60vh] h-[40vh]"
                playsInline
                loop
                crossOrigin="anonymous"
                onTimeUpdate={handleTimeUpdate}
                src={blog?.video[0]?.url}
              />
            </div>

            {/* custom control buttons */}

            {progress !== 0 && toggleVideoButton === true && (
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

                <div className="relative flex-1 flex items-center">
                  {/* Blue Progress Bar (Behind) */}
                  <input
                    id="video-progress"
                    type="range"
                    value={progress}
                    onChange={handleSeek}
                    style={{
                      background: `linear-gradient(to right, #4a90e2 0%, #4a90e2 ${progress}%, #7a7a7a ${progress}%, #7a7a7a 100%)`,
                      transition: "height 1s linear",
                    }}
                    className="hover:cursor-pointer flex-1 transition-all duration-300 ease-in-out"
                  />

                  {/* White Progress Bar (On top of blue progress) */}
                  {/* <div className="absolute bg-white h-full z-10 w-20" /> */}
                </div>

                <div className="flex items-center gap-x-4 pl-4">
                  <Icons.SettingIcon className="h-5 w-5 fill-white" />

                  <Link
                    href={`/${blog.author.name
                      .replace(/\s+/g, "")
                      .toLowerCase()}/videos/${blog.id}/0`}
                  >
                    <Maximize2 className="text-white  h-5 w-5" />
                  </Link>

                  <Icons.Minimize className="h-7 w-7 fill-white text-white" />

                  <div
                    onMouseEnter={handleVolumeHovered}
                    className="flex items-center relative space-y-2"
                  >
                    {volume === 0 ? (
                      <VolumeX
                        onClick={() => handleClickMute()}
                        className="text-white h-7 w-7 cursor-pointer"
                      />
                    ) : (
                      <Volume2
                        onMouseLeave={handleVolumeUnhovered}
                        onMouseEnter={handleVolumeHovered}
                        onClick={() => handleClickMute()}
                        className="text-white h-7 w-7 cursor-pointer my-1"
                      />
                    )}

                    {isVolumeHovered && (
                      <div
                        onMouseLeave={handleVolumeUnhovered}
                        onMouseEnter={handleVolumeHovered}
                        className="transform -rotate-90  cursor-pointer absolute bottom-[8vh] -right-14 rounded-full mx-6"
                      >
                        <input
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
                          className=""
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {volume === 0 && toggleVideoButton === false && (
              <div className="absolute bottom-2 right-4">
                <VolumeX
                  onClick={() => handleClickMute()}
                  className="text-white h-7 w-7 cursor-pointer"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StandardPostCard;
