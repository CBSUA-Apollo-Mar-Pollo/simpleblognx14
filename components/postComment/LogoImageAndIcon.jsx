"use client";

import { Scaling, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LogoImageAndIcon = ({ image }) => {
  const router = useRouter();
  const close = () => {
    router.back();
  };
  return (
    <>
      <div className="absolute top-0 flex justify-between w-full items-center px-5 py-2">
        {/* close button and logo */}
        <div className="flex items-center justify-center gap-2">
          <div
            className="py-2 px-2 cursor-pointer hover:bg-gray-800 rounded-full transition"
            onClick={close}
          >
            <X className="w-7 h-7 text-white" />
          </div>
          <Link href="/" className="font-bold">
            <span className="py-[2px] px-4 rounded-full bg-yellow-400 text-3xl">
              E
            </span>
          </Link>
        </div>
        {/* enter fullscreen */}
        <div className="py-4 px-4 cursor-pointer hover:bg-gray-800 rounded-full transition">
          <Scaling className="text-white" />
        </div>
      </div>

      <Image
        sizes="100vw"
        width={0}
        height={0}
        src={image}
        alt="profile image"
        referrerPolicy="no-referrer"
        className="object-contain w-auto transition max-h-screen"
      />
    </>
  );
};

export default LogoImageAndIcon;
