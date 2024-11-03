import {
  Bookmark,
  Play,
  Rocket,
  RocketIcon,
  Search,
  Settings,
} from "lucide-react";
import React from "react";
import { Input } from "../ui/Input";
import { Icons } from "../utils/Icons";
import Link from "next/link";

const WatchPageSideBar = () => {
  return (
    <div className="sticky top-[8vh]">
      <div className="px-2 mt-3">
        <div className="px-2 flex items-center justify-between ">
          <h1 className="font-bold text-2xl text-neutral-800 dark:text-white">
            Video
          </h1>
          <div className="p-2 bg-neutral-100 rounded-full dark:bg-neutral-700">
            <Settings className=" dark:text-white" />
          </div>
        </div>
        <div className="relative flex items-center mt-2">
          <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
          <Input
            placeholder="Search video"
            className="w-full pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-200/50 font-light rounded-full  text-sm dark:placeholder:text-white"
          />
        </div>
      </div>

      <div className="mx-2 mt-4 space-y-2 ">
        <div className="flex items-center gap-x-3 bg-neutral-100 dark:bg-neutral-700 p-2 rounded-lg pl-4">
          <div className="p-2 bg-blue-500 rounded-full">
            <Play className="text-white pl-1 fill-white h-5 w-5" />
          </div>
          <span className="font-semibold text-sm dark:text-white">Home</span>
        </div>
        <Link
          href="/shortsv"
          className="flex items-center gap-x-3  p-2 rounded-lg pl-4 dark:hover:bg-neutral-700"
        >
          <div className="p-2 bg-neutral-200 rounded-full">
            <Icons.reelsIcon className="text-white  h-6 w-6" />
          </div>
          <span className="font-semibold text-sm dark:text-white">Shortsv</span>
        </Link>
        <div className="flex items-center gap-x-3  p-2 rounded-lg pl-4 dark:hover:bg-neutral-700">
          <div className="p-2 bg-neutral-200 rounded-full">
            <RocketIcon className="fill-neutral-500 text-neutral-800/80  h-6 w-6" />
          </div>
          <span className="font-semibold text-sm dark:text-white">Explore</span>
        </div>
        <div className="flex items-center gap-x-3  p-2 rounded-lg pl-4 dark:hover:bg-neutral-700">
          <div className="p-2 bg-neutral-200 rounded-full">
            <Bookmark className="fill-black  h-6 w-6" />
          </div>
          <span className="font-semibold text-sm dark:text-white">
            Save videos
          </span>
        </div>
      </div>
    </div>
  );
};

export default WatchPageSideBar;
