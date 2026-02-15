"use client";

import { ChevronDown, Home, Loader2, Plus } from "lucide-react";
import React, { Suspense, useRef, useState } from "react";
import { Icons } from "../Icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import AddPostModal from "@/components/Post/AddPostModal";
import { Separator } from "@/components/ui/Separator";
import Image from "next/image";
import HomePageStoryCards from "@/components/stories/homepage-story-cards";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import Posts from "@/components/Post/Posts";
import { Skeleton } from "@/components/ui/Skeleton";
import liveIcon from "@/public/ImageIcons/live.png";
import smileIcon from "@/public/ImageIcons/smile.png";
import HomeFeedLoader from "@/components/Loaders/home-feed-loader";
import galleryIcon from "@/public/ImageIcons/gallery.png";

const HomeFeed = ({ sortedData }) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const fileInputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  const onFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    const images = [];
    const videos = [];

    fileArray.forEach((file) => {
      // Check if the file type is an image or video
      if (file.type.startsWith("image/")) {
        images.push(file);
      } else if (file.type.startsWith("video/")) {
        videos.push(file);
      }
    });

    // Set selected files (you can customize how you want to store images and videos)
    setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);

    // Preview images or videos (modify the function to handle previews as needed)
    previewImages(images);
    previewVideos(videos); // Assuming you have a separate function for video previews

    setOpen(true);
  };

  const previewImages = (files) => {
    const promises = [];
    files.forEach((file) => {
      const reader = new FileReader();
      promises.push(
        new Promise((resolve, reject) => {
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        }),
      );
    });

    Promise.all(promises)
      .then((imageUrls) => {
        setImagePreviews([...imagePreviews, ...imageUrls]);
      })
      .catch((error) => console.error("Error loading images:", error));
  };

  const previewVideos = (files) => {
    const videoUrls = files.map((file) => URL.createObjectURL(file));
    setVideoPreviews([...videoPreviews, ...videoUrls]);
  };
  return (
    <div className="xl:mt-5 2xl:mx-[5vw] xl:mx-[4vw]">
      {/*  ----------------------------------- show in mobile ------------------------------------------------ */}
      <div className="xl:hidden ">
        <div className="xl:bg-neutral-200 xl:dark:bg-neutral-900 bg-white dark:bg-neutral-800 xl:border-none border-b grid grid-cols-5">
          <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
            <Home className="  h-6 w-6 dark:text-neutral-100 text-neutral-700" />
          </div>
          <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
            <Icons.Play className="fill-neutral-600 dark:fill-neutral-300 h-7 w-7 " />
          </div>
          <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
            <Icons.Group className="fill-neutral-600 dark:fill-neutral-300 h-7 w-7 " />
          </div>
          <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
            <Icons.Messager className="h-5 w-5 fill-neutral-600 dark:fill-neutral-50" />
          </div>
          <div className="flex items-center justify-center  py-3">
            <Icons.bell className="fill-neutral-600 dark:fill-neutral-300 dark:text-neutral-50 text-neutral-600 h-6 w-6 " />
          </div>
        </div>
      </div>

      {status === "authenticated" && (
        <>
          <div className=" lg:pt-3 lg:pb-1 lg:px-5 lg:rounded-2xl shadow rounded-none bg-white border-t border-neutral-200 dark:bg-neutral-800 drop-shadow dark:border-0">
            <div className="flex flex-row items-center lg:space-x-2 lg:px-0 lg:py-0 px-2 py-3">
              <Link href={`/user/${session?.user.id}`}>
                <UserAvatar
                  className="h-10 w-10 "
                  user={{
                    name: session?.user.name || null,
                    image: session?.user.image || null,
                  }}
                />
              </Link>
              <AddPostModal
                openPostModal={open}
                setOpenPostModal={setOpen}
                parentSelectedFiles={selectedFiles}
                setParentSelectedFiles={setSelectedFiles}
                parentImagePreviews={imagePreviews}
                setParentImagePreviews={setImagePreviews}
              />
            </div>

            <Separator className="mt-3 dark:bg-neutral-700 lg:block hidden" />

            <div className="flex items-center justify-center my-1">
              <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
                <Image
                  src={liveIcon}
                  className="h-8 w-8"
                  alt="Live video icon"
                />
                <span className="dark:text-neutral-100 text-sm">
                  Live video
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFileChange}
                  style={{ display: "none" }}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-x-3 cursor-pointer"
                >
                  <Image
                    src={galleryIcon}
                    className="h-8 w-8"
                    alt="Gallery icon"
                    width={32}
                    height={32}
                  />
                  <span className="dark:text-neutral-100 text-sm lg:block hidden">
                    Photo/Video
                  </span>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center space-x-3 py-2 dark:hover:bg-neutral-700 rounded-md">
                <Image
                  src={smileIcon}
                  className="h-7 w-7"
                  alt="Feeling or activity icon"
                />
                <span className="dark:text-neutral-100 text-sm">
                  Feeling/Activity
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {status === "loading" && (
        <Skeleton className="h-[120px] bg-neutral-200 rounded-xl p-4">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-10 w-10 rounded-full bg-neutral-400" />
            <Skeleton className="h-10 w-full rounded-full bg-neutral-400" />
          </div>
          <Skeleton className="h-[0.8px] w-full bg-neutral-400 mt-2" />
          <div className="grid grid-cols-3 mt-2 gap-x-10 px-10">
            <Skeleton className="h-9 rounded-xl bg-neutral-400" />
            <Skeleton className="h-9 rounded-xl bg-neutral-400" />
            <Skeleton className="h-9 rounded-xl bg-neutral-400" />
          </div>
        </Skeleton>
      )}

      <div className="my-3">
        <Suspense
          fallback={
            <div className="overflow-x-hidden  flex items-center gap-x-2 xl:pl-0 xl:py-0 pl-2 py-2">
              <button
                onClick={() => handleNavigate()}
                className="relative bg-white border dark:border-0 xl:rounded-2xl rounded-xl  dark:bg-neutral-800 xl:drop-shadow hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:opacity-85 hover:cursor-pointer ease-in-out duration-100"
              >
                {/* create story */}
                <div className="relative md:w-32 md:h-[18vh] w-28 h-28 overflow-hidden rounded-t-2xl bg-white dark:bg-neutral-900">
                  {session?.user.image && (
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      src={session?.user.image}
                      alt="profile image"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {!session?.user.image && (
                    <p className="flex justify-center items-center text-[8em] font-semibold bg-yellow-500 text-yellow-800 px-2 h-full">
                      {session?.user?.name[0].toUpperCase()}
                    </p>
                  )}
                </div>

                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Plus className="bg-blue-700 text-white h-10 w-10 rounded-full border-4 dark:border-neutral-800" />
                </div>

                <div className="pt-4 pb-2 border-t dark:border-neutral-700">
                  <p className="text-[14px] font-semibold text-center xl:dark:text-white  ">
                    Create story
                  </p>
                </div>
              </button>
              {[...Array(7)].map((_, index) => (
                <div key={index}>
                  <Skeleton className="md:w-32 md:h-[23vh] w-40 h-40 bg-neutral-400 rounded-2xl" />
                </div>
              ))}
            </div>
          }
        >
          {session?.user && <HomePageStoryCards session={session} />}
        </Suspense>
      </div>

      {!session?.user && (
        <DropdownMenu className="dark:border-none">
          <DropdownMenuTrigger className="flex items-center gap-x-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-3 py-2 rounded-full">
            <span className="text-xs font-medium text-neutral-700 dark:text-white">
              Best
            </span>
            <ChevronDown className="h-3 w-3 dark:text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[5vw] space-y-2 p-0 pb-2 dark:bg-neutral-800 dark:border-none">
            <div className="px-3 pt-2">
              <p className="text-[13px] dark:text-white">Sort by</p>
            </div>
            <DropdownMenuItem className="px-3 cursor-pointer">
              <span className="dark:text-white">Best</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 cursor-pointer">
              <span className="dark:text-white">Hot</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 cursor-pointer">
              <span className="dark:text-white">New</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 cursor-pointer">
              <span className="dark:text-white">Top</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-3 cursor-pointer">
              <span className="dark:text-white">Rising</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!session?.user && <Separator className="mb-4 mt-1 bg-neutral-300" />}

      {/* all post cards */}

      <Suspense fallback={<HomeFeedLoader />}>
        <Posts initialPosts={sortedData} />
      </Suspense>
    </div>
  );
};

export default HomeFeed;
