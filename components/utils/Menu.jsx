"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/Dropdown-menu";
import { Icons } from "../utils/Icons";
import {
  BookOpen,
  CalendarPlus,
  Clapperboard,
  Flag,
  Grip,
  MoreHorizontal,
  PenSquare,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/Button";
import ToolTipComp from "../utils/ToolTipComp";
import { Input } from "../ui/Input";

const Menu = ({ contentClassName }) => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger className="focus-visible:outline-none drop-shadow xl:block hidden">
        <ToolTipComp content="Menu">
          <div
            className={`  ${
              open
                ? "bg-blue-100 hover:bg-blue-200 dark:hover:bg-blue-300 dark:bg-blue-300"
                : "bg-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-500"
            } dark:bg-neutral-600 p-2 rounded-full cursor-pointer `}
          >
            <Grip
              className={` ${
                open
                  ? "fill-blue-600 text-blue-600 dark:fill-blue-600"
                  : "fill-neutral-800"
              } dark:text-neutral-100`}
            />
          </div>
        </ToolTipComp>
      </DropdownMenuTrigger>

      {/* drop down menu content */}
      <DropdownMenuContent
        className={`bg-neutral-50 dark:bg-[#363636] dark:border-0 drop-shadow-lg dark:drop-shadow-[0px_0px_7px_rgba(0,0,0,0.20)]  min-w-[39vw] max-w-[39vw]  relative ${contentClassName}`}
        align="end"
      >
        <DropdownMenuLabel className="text-2xl font-bold ml-2 dark:text-neutral-100 py-2">
          Menu
        </DropdownMenuLabel>

        <div className=" relative grid grid-cols-3 gap-x-2 w-full max-h-[80vh] overflow-auto pb-2">
          {/* all menu */}
          <div className="bg-white dark:bg-[#212121] dark:text-neutral-100 drop-shadow-md rounded-lg px-2 col-span-2  py-2 ml-3 mr-2">
            {/* search input */}
            <div className="relative flex items-center justify-center mt-2 mx-2">
              <Search className="absolute left-3 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
              <Input
                placeholder="Search Menu"
                className="h-9 pl-10 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700  border-0 bg-gray-100 font-light rounded-full  text-sm "
              />
            </div>

            {/* social */}
            <div className="mt-4">
              <h1 className="font-semibold text-neutral-800 dark:text-neutral-100 text-base ml-4">
                Social
              </h1>

              <div className="mt-2">
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <Image
                    src="/ImageIcons/event.png"
                    className="h-7 w-7 mt-1"
                    alt="Event icon"
                    width={32}
                    height={32}
                  />
                  <div>
                    <h3 className="font-semibold">Events</h3>
                    <p className="text-[13px] font-light">
                      Find events and other things to do online.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700  px-4 py-2 cursor-pointer rounded-md">
                  <img
                    src="/ImageIcons/FindFriends.png"
                    className="h-8 w-8 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold">Find Friends</h3>
                    <p className="text-[13px] font-light">
                      Explore friends and discover potential connections.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <img
                    src="/ImageIcons/FindGroup.png"
                    className="h-8 w-8 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold">Groups</h3>
                    <p className="text-[13px] font-light">
                      Engage with individuals who have similar interests.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <Image
                    src="/ImageIcons/post.png"
                    className="h-8 w-8 mt-1"
                    alt="Post icon"
                    width={32}
                    height={32}
                  />
                  <div>
                    <h3 className="font-semibold">News Feeds</h3>
                    <p className="text-[13px] font-light">
                      Discover relevant posts from the people and pages
                      you&apos;re connected with.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <img
                    src="/ImageIcons/postFeeds.png"
                    className="h-8 w-8 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold">Post Feeds</h3>
                    <p className="text-[13px] font-light">
                      See the most recent posts from your friend, pages and
                      group.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <Image
                    src="/ImageIcons/pages.png"
                    className="h-8 w-8 mt-1"
                    alt="Pages icon"
                    width={32}
                    height={32}
                  />
                  <div>
                    <h3 className="font-semibold">Pages</h3>
                    <p className="text-[13px] font-light">
                      Discover and connect with businesses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator className="my-4 mx-2 bg-neutral-400 dark:bg-neutral-600" />

            {/* entertainment */}
            <div className="mt-2">
              <h1 className="font-semibold text-neutral-800 dark:text-neutral-100 text-base ml-4">
                Entertainment
              </h1>

              <div className="mt-2">
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <img
                    src="/ImageIcons/Streamer.png"
                    className="h-9 w-9 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold">Gaming Videos</h3>
                    <p className="text-[13px] font-light">
                      Explore and engage with your favorite games and streamers.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <img
                    src="/ImageIcons/game-console.png"
                    className="h-9 w-9 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold">Play Games</h3>
                    <p className="text-[13px] font-light">
                      Play your favourite games
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <Image
                    src="/ImageIcons/play.png"
                    className="h-9 w-9 mt-1"
                    alt="Play icon"
                    width={36}
                    height={36}
                  />
                  <div>
                    <h3 className="font-semibold">Video</h3>
                    <p className="text-[13px] font-light">
                      Discover videos based on your interests and preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator className="my-4 mx-2 bg-neutral-400 dark:bg-neutral-600" />

            {/* Personal */}
            <div className="mt-2">
              <h1 className="font-semibold text-neutral-800 dark:text-neutral-100 text-base ml-4">
                Personal
              </h1>

              <div className="mt-2">
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <Image
                    src="/ImageIcons/refresh.png"
                    className="h-8 w-8 mt-1"
                    alt="Refresh icon"
                    width={32}
                    height={32}
                  />
                  <div>
                    <h3 className="font-semibold">Memories</h3>
                    <p className="text-[13px] font-light">
                      Browse old photos,videos and posts.
                    </p>
                  </div>
                </div>
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <img
                    src="/ImageIcons/bookmark.png"
                    className="h-7 w-7 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold">Saved</h3>
                    <p className="text-[13px] font-light">
                      Find posts, photos and videos that you saved for later.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator className="my-4 mx-2 bg-neutral-400 dark:bg-neutral-600" />

            {/* More */}
            <div className="mt-2">
              <h1 className="font-semibold text-neutral-800 dark:text-neutral-100 text-base ml-4">
                More from our app
              </h1>

              <div className="mt-2">
                <div className="flex gap-x-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-4 py-2 cursor-pointer rounded-md">
                  <Image
                    src="/ImageIcons/message.png"
                    className="h-8 w-8 mt-1"
                    alt="Message icon"
                    width={32}
                    height={32}
                  />
                  <div>
                    <h3 className="font-semibold">Message</h3>
                    <p className="text-[13px] font-light">
                      Privately message and call people from your computer or
                      mobile device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* create menu */}
          <div className="col-span-1 sticky top-0 h-[70vh] max-h-[70vh]  mr-2">
            <div className="bg-white dark:bg-[#212121] dark:text-neutral-100 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.15)]  dark:drop-shadow-[0px_0px_10px_rgba(0,0,0,0.25)] rounded-md  pb-2">
              <h1 className="font-bold text-xl px-4 py-3">Create</h1>

              <div className="px-1">
                <div className="flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-2 py-2 cursor-pointer rounded-md">
                  <div className=" bg-gray-200 dark:bg-neutral-600 p-2.5 rounded-full cursor-pointer ">
                    <PenSquare className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-[15px]">Post</h3>
                </div>
                <div className="flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-2 py-2 cursor-pointer rounded-md">
                  <div className=" bg-gray-200 dark:bg-neutral-600 p-2.5 rounded-full cursor-pointer ">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-[15px]">Story</h3>
                </div>
                <div className="flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-2 py-2 cursor-pointer rounded-md">
                  <div className=" bg-gray-200 dark:bg-neutral-600 p-2.5 rounded-full cursor-pointer ">
                    <Clapperboard className="h-5 w-5 text-neutral-800 dark:text-neutral-100" />
                  </div>
                  <h3 className="font-semibold text-[15px]">Reel</h3>
                </div>
                <div className="flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-2 py-2 cursor-pointer rounded-md">
                  <div className=" bg-gray-200 dark:bg-neutral-600 p-2.5 rounded-full cursor-pointer ">
                    <Sparkles className="h-5 w-5 text-neutral-800  dark:text-neutral-100" />
                  </div>
                  <h3 className="font-semibold text-[15px]">Life event</h3>
                </div>
              </div>

              <DropdownMenuSeparator className="my-2 mx-2 bg-neutral-400 dark:bg-neutral-600" />

              <div className="px-1">
                <div className="flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-2 py-2 cursor-pointer rounded-md">
                  <div className=" bg-gray-200 dark:bg-neutral-600 p-2.5 rounded-full cursor-pointer ">
                    <Flag className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-[15px]">Page</h3>
                </div>
                <div className="flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-2 py-2 cursor-pointer rounded-md">
                  <div className=" bg-gray-200 dark:bg-neutral-600 p-2.5 rounded-full cursor-pointer ">
                    <Icons.Group className="h-5 w-5 fill-neutral-800 dark:fill-neutral-300" />
                  </div>
                  <h3 className="font-semibold text-[15px]">Group</h3>
                </div>
                <div className="flex items-center gap-x-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-2 py-2 cursor-pointer rounded-md">
                  <div className=" bg-gray-200 dark:bg-neutral-600 p-2.5 rounded-full cursor-pointer ">
                    <CalendarPlus className="h-5 w-5 text-neutral-800  dark:text-neutral-100" />
                  </div>
                  <h3 className="font-semibold text-[15px]">Event</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
