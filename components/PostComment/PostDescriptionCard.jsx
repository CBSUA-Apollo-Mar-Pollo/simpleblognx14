"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import {
  Dot,
  Forward,
  Globe,
  Maximize2,
  MessageCircle,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import UserAvatar from "../utils/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import PostVote from "../PostVote/PostVote";
import { useSession } from "next-auth/react";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import HeartVote from "../PostVote/HeartVote";
import MultipleImageRender from "../Post/multiple-image-render";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { usePathname } from "next/navigation";
import CreateComment from "./CreateComment";
import { COMMENT_PAGE } from "@/config";
import CommentSectionCard from "./CommentSectionCard";
import { Button } from "../ui/Button";
import { Icons } from "../utils/Icons";
import { useIntersection } from "@mantine/hooks";

const PostDescriptionCard = ({
  blog,
  sharedPost,
  postId,
  initialVote,
  initialVotesAmt,
  sharedAmount,
  setVideoPaused,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  progress,
  setProgress,
}) => {
  const [open, setOpen] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [volume, setVolume] = useState(1);

  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play(); // Automatically play the video if desired
    }
  }, [videoRef.current]);

  const { mutate: getComments, isPending } = useMutation({
    mutationFn: async () => {
      const payload = { postId: blog.id };
      const { data } = await axios.post(
        "/api/posts/postDescriptionComment",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      setComments(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { data: dominantColorPost, isLoading } = useQuery({
    queryKey: ["dominantColorPost", blog.image],
    queryFn: async () => {
      const res = await getDominantColor(blog.image[0].url);
      return res;
    },
  });

  const fetchComments = async ({ pageParam = 1 }) => {
    const query = `/api/posts/fetchNextComments?limit=${COMMENT_PAGE}&page=${pageParam}&postId=${blog.id}`;
    const res = await fetch(query, { cache: "no-store" });
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data;
  };

  const { data, fetchNextPage, refetch, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["viewMoreCommentsPostDescription", blog.id],
      queryFn: fetchComments,
      getNextPageParam: (lastPage, allPages) => {
        // Adjust the logic here based on your API's response
        if (lastPage.length === 0) {
          return undefined; // No more pages
        }
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    });

  // Flatten the data from all pages
  const commentsData = data?.pages.flat() ?? [];

  // CODE BELOW IS FOR VIDEO PLAYER
  // for gettting the duration
  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);

        videoRef.current.currentTime = currentTime;
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

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        getComments(), setVideoPaused((prev) => !prev), setOpen(isOpen);
      }}
    >
      <DialogTrigger>
        <div className="flex items-center gap-2  px-10  py-3 rounded cursor-pointer">
          <MessageCircle className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
          <span className=" font-semibold text-sm text-neutral-800">
            Comment
          </span>
        </div>
      </DialogTrigger>

      <DialogContent className="p-0 min-w-[45rem]  gap-0 bg-neutral-50 dark:bg-neutral-800  border-none dark:text-neutral-50">
        <DialogHeader className="px-4 py-4  border-b-[1px] dark:border-neutral-600 ">
          <DialogTitle className="text-xl text-center font-semibold text-neutral-800 dark:text-white">
            {blog?.author.name.split(" ")[0]}&apos;s Post
          </DialogTitle>
        </DialogHeader>

        {/* user profile */}
        <div className="relative mt-2">
          <SimpleBar style={{ maxHeight: session?.user ? "70vh" : "85vh" }}>
            <div className="flex items-center gap-1 px-5 ">
              <UserAvatar
                className="h-10 w-10 "
                user={{
                  name: blog?.author?.name || null,
                  image: blog?.author?.image || null,
                }}
              />

              <div className="px-2 pt-1 ">
                <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-100">
                  {blog.author?.name}
                </p>
                <div className="flex items-center">
                  <p className=" text-xs  text-neutral-800 dark:text-neutral-50">
                    {formatTimeToNow(new Date(blog?.createdAt))}
                  </p>
                  <Dot className="-mx-1 text-neutral-800 dark:text-neutral-50" />
                  <Icons.earthIcon className="h-3 w-3 text-neutral-800 dark:text-neutral-50 " />
                </div>
              </div>
            </div>

            {/* post description */}
            {blog.description && (
              <div
                style={{
                  backgroundColor:
                    blog?.textBackgroundStyle?.backgroundColorType ===
                      "solid" && blog?.textBackgroundStyle?.color,
                  backgroundImage:
                    blog?.textBackgroundStyle?.backgroundColorType ===
                    "gradient"
                      ? `linear-gradient(to bottom right, ${blog?.textBackgroundStyle?.color.from}, ${blog?.textBackgroundStyle?.color.to})`
                      : `url('${blog?.textBackgroundStyle?.color}') `,
                  color: blog?.textBackgroundStyle ? "white" : "black",
                }}
                className={`${
                  blog?.textBackgroundStyle &&
                  "h-[50vh] flex items-center justify-center"
                }  `}
              >
                <p
                  className={`${
                    blog?.textBackgroundStyle
                      ? "text-2xl font-bold"
                      : "text-[15px] "
                  }  px-5 text-justify leading-snug font-[12px] py-1`}
                >
                  {blog.description}
                </p>
              </div>
            )}

            {blog.image && (
              <MultipleImageRender
                blog={blog.sharedPostId === null ? blog : null}
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
                  onClick={togglePlayPause}
                  className="flex flex-col items-center hover:cursor-pointer"
                >
                  <video
                    ref={videoRef}
                    className="object-cover border-0 max-h-[55vh]"
                    preload="metadata"
                    playsInline
                    loop
                    crossOrigin="anonymous"
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

            {sharedPost && (
              <div className=" ml-3 mr-4 mb-3 mt-2">
                <div className="rounded-2xl border border-neutral-300 dark:border-neutral-700 pt-1">
                  {/* shared post description */}
                  <div className=" gap-1 my-2 ml-6">
                    {/* profile image  */}
                    <Link href={`/user/${sharedPost?.author.id}`}>
                      <div className="flex items-center gap-1">
                        <UserAvatar
                          className="h-10 w-10 "
                          user={{
                            name: sharedPost.author?.name || null,
                            image: sharedPost.author?.image || null,
                          }}
                        />

                        <div className="px-2 pt-1">
                          <p className="font-semibold text-sm">
                            {sharedPost?.author?.name}
                          </p>
                          <div className="flex items-center">
                            <p className=" text-xs text-gray-600 dark:text-white">
                              {formatTimeToNow(new Date(sharedPost?.createdAt))}
                            </p>
                            <Dot className="-mx-1 text-gray-600 dark:text-white" />
                            <Icons.earthIcon className="h-3 w-3 text-gray-600 dark:text-white" />
                          </div>
                        </div>
                      </div>
                    </Link>

                    {sharedPost.description && (
                      <p className=" text-justify py-2 text-sm leading-relaxed mb-1 font-medium">
                        {sharedPost.description}
                      </p>
                    )}
                  </div>

                  {/* images for shared post */}
                  {sharedPost.image && (
                    <MultipleImageRender
                      blog={blog.sharedPostId ? sharedPost : null}
                      dominantColorPost={dominantColorPost}
                      isLoading={isLoading}
                    />
                  )}

                  {sharedPost.video && (
                    <div className="bg-neutral-950 relative rounded-b-2xl">
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
                        onClick={togglePlayPause}
                        className="flex flex-col items-center hover:cursor-pointer"
                      >
                        <video
                          ref={videoRef}
                          className="object-cover border-0 max-h-[55vh]"
                          preload="metadata"
                          playsInline
                          loop
                          crossOrigin="anonymous"
                          onTimeUpdate={handleTimeUpdate}
                          src={sharedPost.video[0].url}
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
                                    }%, #7a7a7a ${
                                      volume * 100
                                    }%, #7a7a7a 100%)`,
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
              </div>
            )}

            <div className="flex items-center justify-end ">
              {blog.comments.length !== 0 && (
                <div className=" flex items-center justify-end mr-3 text-xs hover:underline">
                  {blog.comments.length}{" "}
                  {blog.comments.length === 1 ? "Comment" : "Comments"}
                </div>
              )}

              {/* amount of shares  */}
              {sharedAmount !== 0 && (
                <div className="py-1 flex items-center justify-end mr-3 text-xs">
                  {sharedAmount} {sharedAmount === 1 ? "Share" : "Shared"}
                </div>
              )}
            </div>

            {/* home post vote comment and share */}
            <div className="grid grid-cols-3 gap-x-2 border-y-[1px] border-neutral-300  dark:border-neutral-600">
              {/* vote */}
              <PostVote
                postId={postId}
                initialVote={initialVote}
                initialVotesAmt={initialVotesAmt}
              />
              {/* comment button */}
              <div className="flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-500 px-5 rounded cursor-pointer">
                <MessageCircle className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
                <span className=" font-medium text-sm dark:text-white">
                  Comment
                </span>
              </div>
              {/* share */}
              <div className="flex items-center justify-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-500 px-5  rounded cursor-pointer">
                <Forward className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
                <span className=" font-medium text-sm dark:text-neutral-200">
                  Share
                </span>
              </div>
            </div>

            {/* comment section */}
            <div className="mt-2 pl-4 pr-4 overflow-auto">
              <div className="text-end py-2">
                <p className="text-neutral-800 dark:text-neutral-300 text-sm font-medium">
                  <span className="px-2 cursor-pointer">Top comments</span>
                </p>
              </div>
              {/* comments */}
              {commentsData
                .filter((comment) => !comment.replyToId)
                .map((topLevelComment, index) => {
                  // const divRefs = Array(topLevelComment.replies.length)
                  //   .fill(null)
                  //   .map(() => useRef(null));
                  return (
                    <div className="flex flex-col relative" key={index}>
                      {topLevelComment.replies.length !== 0 && (
                        <div
                          // className={`absolute left-4 border-l-2 border-neutral-600 h-[calc(100%-${
                          //   divRefs[divRefs.length - 1].current?.offsetHeight
                          // }px)] `}
                          className={`absolute left-4 border-l-2 border-neutral-600 h-[90%]`}
                        />
                      )}
                      <CommentSectionCard
                        comment={topLevelComment}
                        session={session}
                        index={index}
                        getComments={getComments}
                        refetch={refetch}
                        post={blog}
                      />

                      {/* replies */}
                      {topLevelComment.replies.map((reply, index) => {
                        return (
                          <div
                            key={reply.id}
                            className="pl-4 relative"
                            // ref={divRefs[index]}
                          >
                            <div className="absolute left-4 rounded-es-2xl border-l-2 w-6 border-b-2 border-neutral-600 h-6" />
                            <div className="ml-8 mt-2">
                              <CommentSectionCard
                                comment={reply}
                                session={session}
                                index={index}
                                getComments={getComments}
                                refetch={refetch}
                                post={blog}
                                classNameForUserAvatarReplies="h-7 w-7"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>

            {isMounted && hasNextPage && session?.user && (
              <Button
                variant="ghost"
                className="dark:text-white text-neutral-100 hover:underline hover:bg-neutral-800 dark:hover:text-neutral-300 focus:ring-0 focus:outline-none"
                onClick={() => fetchNextPage()}
              >
                {commentsData.length < COMMENT_PAGE - 1
                  ? ""
                  : "View more comments"}
              </Button>
            )}
          </SimpleBar>
        </div>

        {isMounted && session?.user && (
          <div>
            <CreateComment
              session={session}
              postId={blog.id}
              getComments={getComments}
              refetch={refetch}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostDescriptionCard;
