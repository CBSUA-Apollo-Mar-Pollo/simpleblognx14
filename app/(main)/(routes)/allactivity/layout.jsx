import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import {
  CalendarDays,
  CircleEllipsis,
  CircleEllipsisIcon,
  List,
  Search,
  Trash2,
} from "lucide-react";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex2 w-[20vw] border-r p-3 min-h-svh">
        <div>
          <h1 className="text-2xl font-bold pl-2">Archive</h1>
          <div className="relative   items-center hidden xl:flex mt-3">
            <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
            <Input
              placeholder="Search activity log"
              className="pl-12 w-full focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-200/50 font-light rounded-full  text-sm dark:placeholder:text-white"
            />
          </div>
        </div>

        <Separator className="my-3 bg-gray-300 dark:bg-neutral-700" />

        <div className="">
          <h1 className="text-xl font-bold pl-2">Filters</h1>
          <div className="flex items-center gap-x-3 mt-2 pl-2 hover:bg-neutral-100 p-1 rounded-md cursor-pointer">
            <div className="bg-neutral-200 p-2 rounded-full">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div className="relative flex flex-col gap-0.2">
              <p className="font-semibold m-0">Date</p>
              <span className="text-xs m-0">All</span>
            </div>
          </div>
        </div>

        <Separator className="my-3 bg-gray-300 dark:bg-neutral-700" />

        <div className="">
          <div className="flex items-center gap-x-3 mt-2 pl-2 hover:bg-neutral-100 p-1 rounded-md cursor-pointer">
            <div className="bg-neutral-200 p-2 rounded-full">
              <List className="h-6 w-6" />
            </div>
            <div className="relative flex flex-col gap-0.2">
              <p className="font-semibold m-0">Activity log</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 mt-2 pl-2 hover:bg-neutral-100 p-1 rounded-md cursor-pointer">
            <div className="bg-neutral-200 p-2 rounded-full">
              <CircleEllipsisIcon className="h-6 w-6" />
            </div>
            <div className="relative flex flex-col gap-0.2">
              <p className="font-semibold m-0">Archive</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 mt-2 pl-2 hover:bg-neutral-100 p-1 rounded-md cursor-pointer">
            <div className="bg-neutral-200 p-2 rounded-full">
              <Trash2 className="h-6 w-6" />
            </div>
            <div className="relative flex flex-col gap-0.2">
              <p className="font-semibold m-0">Trash</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 mt-2 pl-2 hover:bg-neutral-100 p-1 rounded-md cursor-pointer">
            <div className="bg-neutral-200 p-2 rounded-full">
              <List className="h-6 w-6" />
            </div>
            <div className="relative flex flex-col gap-0.2">
              <p className="font-semibold m-0">Activity history</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 ">{children}</div>
    </div>
  );
};

export default Layout;
