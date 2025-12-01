"use client";

import { getStoryData } from "@/data/getStoryData";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Button } from "../ui/Button";
import UserAvatar from "../utils/UserAvatar";
import { Skeleton } from "../ui/Skeleton";
import { useSession } from "next-auth/react";

const HomePageStoryCards = () => {
  const { data: session } = useSession();
  const storyCardContainer = useRef(null);
  const [scale, setScale] = useState(1);
  const [hoveredStory, setHoveredStory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtTheEndOfScrolled, setIsAtTheEndOfScrolled] = useState(true);

  const router = useRouter();

  const RightScroll = () => {
    if (storyCardContainer.current) {
      storyCardContainer.current.scrollBy({
        left: 230,
        behavior: "smooth",
      });
      setIsScrolled(true);

      const container = storyCardContainer.current;
      const atBeginning = container.scrollLeft === 0;
      const atEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth;

      if (atBeginning) {
        setIsAtTheEndOfScrolled(true); // Correcting the state update to indicate it's at the end
      }

      if (atEnd) {
        setIsAtTheEndOfScrolled(false); // Set false if not at the end
      }
    }
  };

  const LeftScroll = () => {
    if (storyCardContainer.current) {
      storyCardContainer.current.scrollBy({
        left: -230,
        behavior: "smooth",
      });

      setIsAtTheEndOfScrolled(true);

      const container = storyCardContainer.current;
      const atBeginning = container.scrollLeft === 0;
      const atEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth;
      if (atBeginning) {
        setIsScrolled(false);
      }

      if (atEnd) {
        setIsScrolled(false);
      }
    }
  };

  const handleNavigate = () => {
    return router.push("/stories/create");
  };

  const handleMouseHover = (id) => {
    console.log(id);
    if (id) {
      setHoveredStory(id);
      setScale((prevScale) => prevScale + 0.1);
    }
  };

  const handleMouseLeave = (id) => {
    setHoveredStory(null);
    setScale((prevScale) => (prevScale > 0.1 ? prevScale - 0.1 : prevScale));
  };

  const handleNavigateToStoryPage = (id) => {
    return router.push(`/stories/${id}`);
  };

  const {
    data: stories,
    status,
    isPending,
  } = useQuery({
    queryKey: ["stories", session?.user?.id],
    queryFn: async () => {
      const res = await getStoryData(session.user.id);
      return res;
    },
    enabled: !!session?.user?.id,
    staleTime: 60 * 1000, // 1 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className=" flex items-center relative xl:bg-none bg-white dark:bg-neutral-900 xl:my-3 my-1">
      {isScrolled && (
        <div className="absolute left-4 z-20">
          <Button
            onClick={() => LeftScroll()}
            className="rounded-full py-6 px-1 bg-white hover:bg-neutral-200"
          >
            <ChevronLeft className="h-10 w-10 text-black" />
          </Button>
        </div>
      )}
      <div
        ref={storyCardContainer}
        className="overflow-x-hidden  flex items-center gap-x-2 xl:pl-0 xl:py-0 pl-2 py-2 "
      >
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

        {isPending &&
          [...Array(7)].map((_, index) => (
            <div key={index}>
              <Skeleton className="md:w-32 md:h-[23vh] w-40 h-40 bg-neutral-400 rounded-2xl" />
            </div>
          ))}

        {/* stories */}
        <div className="flex items-center gap-x-2 ">
          {!isPending &&
            stories?.map((story, index) => (
              <button
                key={index}
                onClick={() => handleNavigateToStoryPage(story.authorId)}
                onMouseEnter={() => handleMouseHover(story.id)}
                onMouseLeave={() => handleMouseLeave(story.id)}
                className="relative border dark:border-0 rounded-2xl  dark:bg-neutral-800 drop-shadow hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:opacity-85 hover:cursor-pointer ease-in-out duration-100"
              >
                {/* Wrapper for image with overflow hidden to clip any zoomed-out content */}
                <div className="relative md:w-32 md:h-52 w-40 h-40 overflow-hidden rounded-2xl bg-white dark:bg-neutral-900">
                  <div className="absolute top-3 left-2 z-10">
                    <UserAvatar
                      className="h-10 w-10 border-[3px] border-blue-600"
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
                      src={story?.images[0].img}
                      alt="profile image"
                      className="w-full h-full object-cover"
                      style={{
                        transform:
                          hoveredStory === story.id ? `scale(${scale})` : null, // Apply zoom effect to the image itself
                        transformOrigin: "center", // Keep the zoom centered
                        transition: "transform 0.3s ease", // Smooth transition for zoom effect
                      }}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent"></div>
                  </div>

                  <div className="absolute bottom-4 left-2 z-10">
                    <p className="text-white font-medium text-sm">
                      {story.author.name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>

      {stories?.length >= 3 && isAtTheEndOfScrolled && (
        <div className="absolute right-4 z-20">
          <Button
            onClick={() => RightScroll()}
            className="rounded-full py-6 px-1 bg-white hover:bg-neutral-200"
          >
            <ChevronRight className="h-10 w-10 text-black" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePageStoryCards;
