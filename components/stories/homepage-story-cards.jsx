"use client";

import { getStoryData } from "@/actions/getStoryData";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import UserAvatar from "../utils/UserAvatar";

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

  const {
    data: stories,
    status,
    isLoading,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await getStoryData(session.user.id);
      return res;
    },
  });

  console.log(stories, "stories");

  return (
    <div className="overflow-x-hidden pb-1 flex items-center gap-x-2 relative">
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

      {stories?.map((story) => (
        <button
          onClick={() => handleNavigate()}
          className="relative border dark:border-0 w-44 rounded-2xl bg-white dark:bg-neutral-800 drop-shadow hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:opacity-85 hover:cursor-pointer ease-in-out duration-100"
        >
          {/* Wrapper for image with overflow hidden to clip any zoomed-out content */}
          <div className="relative md:w-44 md:h-[31.5vh] w-40 h-40 overflow-hidden rounded-2xl bg-white dark:bg-neutral-900">
            <div className="absolute top-3 left-2 z-10">
              <UserAvatar
                className="h-12 w-12 border-[3px] border-blue-600"
                user={{
                  name: story.author.name || null,
                  image: story.author?.image || null,
                }}
              />
            </div>

            <div className="relative w-full h-full">
              <Image
                sizes="100vw"
                width={0}
                height={0}
                src={story?.image}
                alt="profile image"
                className="w-full h-full object-cover"
                style={{
                  transform: `scale(${scale})`, // Apply zoom effect to the image itself
                  transformOrigin: "center", // Keep the zoom centered
                  transition: "transform 0.3s ease", // Smooth transition for zoom effect
                }}
              />
              <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="absolute bottom-4 left-2 z-10">
              <p className="text-white font-semibold">{story.author.name}</p>
            </div>
          </div>
        </button>
      ))}

      {stories?.length === 4 && (
        <div className="absolute right-4">
          <Button className="rounded-full py-6 px-1 bg-white">
            <ChevronRight className="h-10 w-10 text-black" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePageStoryCards;
