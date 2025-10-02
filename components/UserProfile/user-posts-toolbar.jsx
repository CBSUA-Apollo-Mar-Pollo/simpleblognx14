"use client";

import {
  AlignJustify,
  LayoutGrid,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";

const UserPostsToolBar = () => {
  return (
    <div className=" border pt-3 rounded-lg bg-white dark:bg-neutral-800 dark:border-0">
      <div className="flex items-center justify-between pl-5 pr-2">
        <h1 className="font-bold text-xl">Posts</h1>
        <div className="flex items-center gap-x-2">
          <Button className="flex gap-x-2 px-4 bg-neutral-300 hover:bg-neutral-400 h-9">
            <SlidersHorizontal className="h-4 w-4 text-black" />
            <p className="text-black font-semibold text-md">Filters</p>
          </Button>
          <Button className="flex gap-x-2 px-4 bg-neutral-300 hover:bg-neutral-400 h-9">
            <Settings className="h-5 w-5 text-black" />
            <p className="text-black font-semibold text-md">Manage posts</p>
          </Button>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="flex items-center px-3">
        <Button className="flex gap-x-2 px-4  bg-transparent hover:bg-transparent h-9 w-full border-b-4 border-blue-600 rounded-none">
          <AlignJustify className="h-4 w-4 text-blue-500" />
          <p className="text-blue-600 font-semibold text-md">List view</p>
        </Button>
        <Button className="flex gap-x-2 px-4 bg-transparent hover:bg-neutral-200 h-9 w-full ">
          <LayoutGrid className="h-5 w-5 text-black" />
          <p className="text-black font-semibold text-md">Grid view</p>
        </Button>
      </div>
    </div>
  );
};

export default UserPostsToolBar;
