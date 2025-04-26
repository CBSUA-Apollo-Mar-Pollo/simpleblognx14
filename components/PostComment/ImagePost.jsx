"use client";

import { useFullScreenImage } from "@/hooks/use-fullscreen-image";
import { ChevronLeft, ChevronRight, Download, Scaling, X } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const ImagePost = ({ image, index, postId, setToggleExpand }) => {
  const { isFullScreen, setManualScreen } = useFullScreenImage();
  const router = useRouter();
  const close = () => {
    router.push("/");
    if (isFullScreen === false) {
      setManualScreen(true);
    } else if (isFullScreen === true) {
      setManualScreen(true);
    }
  };

  const [imageCounter, setImageCounter] = useState(parseInt(index));

  const handleClickForward = () => {
    if (imageCounter === image.length - 1) {
      router.push(`/postComment/${postId}/${0}`);
    } else {
      router.push(`/postComment/${postId}/${parseInt(index) + 1}`);
    }
  };

  const handleClickBack = () => {
    if (imageCounter === 0) {
      router.push(`/postComment/${postId}/${image.length - 1}`);
    } else {
      router.push(`/postComment/${postId}/${index - 1}`);
    }
  };

  return (
    <>
      {image.length > 1 && (
        <button
          onClick={handleClickBack}
          className="absolute left-0 bg-neutral-800 h-full  px-4 flex justify-center items-center bg-opacity-20 hover:bg-opacity-35 pl-1 hover:pl-2"
        >
          <div className="rounded-full bg-neutral-500 bg-opacity-10 py-[8px] px-[7px] ml-2 hover:bg-neutral-700">
            <ChevronLeft className="h-9 w-9 stroke-[1.5px] text-neutral-50" />
          </div>
        </button>
      )}
      <div className="absolute top-0 flex justify-between w-full items-center px-5 py-2">
        {/* close button and logo */}
        <div className="flex items-center justify-center gap-2">
          <div
            className="py-4 px-4 cursor-pointer hover:bg-gray-600 rounded-full transition"
            onClick={close}
          >
            <X className=" text-white" />
          </div>
          <Link href="/" className="font-bold">
            <span className="py-[2px] px-4 rounded-full bg-yellow-400 text-3xl">
              E
            </span>
          </Link>
        </div>
        {/* enter fullscreen */}
        <div className="flex z-20">
          <div className="py-4 px-4 cursor-pointer hover:bg-gray-600 hover:bg-opacity-40 rounded-full transition">
            <Download className="text-white " />
          </div>
          <div
            onClick={() => setToggleExpand((prevState) => !prevState)}
            className="py-4 px-4 cursor-pointer hover:bg-gray-600 hover:bg-opacity-40  rounded-full transition"
          >
            <Scaling className="text-white" />
          </div>
        </div>
      </div>

      <img
        sizes="100vw"
        width={0}
        height={0}
        src={image[parseInt(index)]?.url}
        alt="profile image"
        referrerPolicy="no-referrer"
        className="object-fill w-auto transition max-h-screen"
      />

      {image.length > 1 && (
        <button
          onClick={handleClickForward}
          className="absolute right-0 bg-neutral-800 h-full  px-4 flex justify-center items-center bg-opacity-20 hover:bg-opacity-35 pr-1 hover:pr-2"
        >
          <div className="rounded-full bg-neutral-500 bg-opacity-10 py-[8px] px-[7px] mr-2 hover:bg-neutral-700">
            <ChevronRight className="h-9 w-9 stroke-[1.5px] text-neutral-50" />
          </div>
        </button>
      )}
    </>
  );
};

export default ImagePost;
