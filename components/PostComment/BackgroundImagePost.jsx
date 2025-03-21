"use client";

import { useFullScreenImage } from "@/hooks/use-fullscreen-image";
import { Download, Scaling, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const BackgroundImagePost = ({ image, index, setToggleExpand }) => {
  const { isFullScreen, setManualScreen } = useFullScreenImage();
  const router = useRouter();
  const close = () => {
    router.replace("/");
    if (isFullScreen === false) {
      setManualScreen(true);
    } else if (isFullScreen === true) {
      setManualScreen(true);
    }
  };

  return (
    <>
      <div className="absolute top-0 flex justify-between w-full items-center px-5 py-2">
        {/* close button and logo */}
        <div className="flex items-center justify-center gap-2">
          <div
            className="py-4 px-4 cursor-pointer hover:bg-neutral-500/70 rounded-full transition"
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
        <div className="flex">
          <div className="py-4 px-4 cursor-pointer hover:bg-neutral-500/70 rounded-full transition">
            <Download className="text-white" />
          </div>
          <div
            onClick={() => setToggleExpand((prevState) => !prevState)}
            className="py-4 px-4 cursor-pointer hover:bg-neutral-500/70 rounded-full transition"
          >
            <Scaling className="text-white" />
          </div>
        </div>
      </div>

      <img
        sizes="100vw"
        width={0}
        height={0}
        src={image.url || image[0].url}
        alt="profile image"
        referrerPolicy="no-referrer"
        className="object-contain w-auto transition max-h-screen"
      />
    </>
  );
};

export default BackgroundImagePost;
