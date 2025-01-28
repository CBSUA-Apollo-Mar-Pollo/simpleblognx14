"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HomePageStoryCards = ({ session }) => {
  const [scale, setScale] = useState(1);
  const router = useRouter();

  const handleNavigate = () => {
    return router.push("/stories/create");
  };

  const handleMouseHover = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const handleMouseLeave = () => {
    setScale((prevScale) => (prevScale > 0.1 ? prevScale - 0.1 : prevScale));
  };

  return (
    <div className="overflow-x-hidden pb-1">
      <button
        onClick={() => handleNavigate()}
        onMouseEnter={() => handleMouseHover()}
        onMouseLeave={() => handleMouseLeave()}
        className="relative border dark:border-0 w-44 rounded-2xl bg-white dark:bg-neutral-800 drop-shadow hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:opacity-85 hover:cursor-pointer ease-in-out duration-100"
      >
        {/* Wrapper for image with overflow hidden to clip any zoomed-out content */}
        <div className="relative md:w-44 md:h-52 w-40 h-40 overflow-hidden rounded-t-2xl bg-white dark:bg-neutral-900">
          <Image
            sizes="100vw"
            width={0}
            height={0}
            src={session?.user.image}
            alt="profile image"
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${scale})`, // Apply zoom effect to the image itself
              transformOrigin: "center", // Keep the zoom centered
              transition: "transform 0.3s ease", // Smooth transition for zoom effect
            }}
          />
        </div>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Plus className="bg-blue-700 text-white h-10 w-10 rounded-full border-4 dark:border-neutral-800" />
        </div>

        <div className="pt-8 pb-2 border-t dark:border-neutral-700">
          <p className="text-[14px] font-semibold text-center dark:text-white">
            Create story
          </p>
        </div>
      </button>
    </div>
  );
};

export default HomePageStoryCards;
