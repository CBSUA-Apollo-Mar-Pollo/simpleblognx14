"use client";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import {
  Archive,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CircleEllipsisIcon,
  List,
  MoreHorizontal,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/Button";

const AllActivitySideBar = () => {
  const pathname = usePathname();
  const [toggleArchive, setToggleArchive] = useState(false);

  return (
    <div className="w-[30vw] border-r dark:border-neutral-800 p-3 min-h-svh">
      <div>
        {pathname === "/allactivity/trash" && (
          <h1 className="text-2xl font-bold pl-2 dark:text-neutral-200">
            Trash
          </h1>
        )}
        {pathname === "/allactivity/archive" && (
          <h1 className="text-2xl font-bold pl-2 dark:text-neutral-200">
            Archive
          </h1>
        )}

        <div className="relative   items-center hidden xl:flex mt-3">
          <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
          <Input
            placeholder="Search activity log"
            className="pl-12 w-full focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-200/50 font-light rounded-full  text-sm dark:placeholder:text-neutral-200"
          />
        </div>
      </div>

      <Separator className="my-3 bg-gray-300 dark:bg-neutral-700" />

      {pathname === "/allactivity/archive" && (
        <>
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
        </>
      )}

      <div className="">
        <div className="flex items-center gap-x-3 mt-2 pl-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 p-1 rounded-md cursor-pointer">
          <div
            className="bg-neutral-200 dark:bg-neutral-800
           p-2 rounded-full"
          >
            <List className="h-6 w-6 dark:text-neutral-200" />
          </div>
          <div className="relative flex flex-col gap-0.2">
            <p className="font-semibold m-0 dark:text-neutral-200">
              Activity log
            </p>
          </div>
        </div>

        <div className="mt-1">
          <Button
            onClick={() => setToggleArchive((prev) => !prev)}
            variant="ghost"
            className="flex items-center justify-between gap-x-3 py-6 pr-4 pl-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md  cursor-pointer w-full"
          >
            <div className="flex items-center gap-x-3">
              <div className="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-full">
                <MoreHorizontal className="h-6 w-6 dark:text-neutral-200" />
              </div>
              <div className="relative flex flex-col gap-0.2">
                <p className="font-semibold m-0 text-base dark:text-neutral-200">
                  Archive
                </p>
              </div>
            </div>
            {toggleArchive ? (
              <ChevronUp
                className="h-5 w-5 stroke-[3px] text-neutral-800 dark:text-neutral-200
              "
              />
            ) : (
              <ChevronDown
                className="h-5 w-5 stroke-[3px] text-neutral-800 dark:text-neutral-200
              "
              />
            )}
          </Button>
          {/* sub buttons */}
          {toggleArchive && (
            <div className="ml-8">
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-x-3 mt-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md cursor-pointer w-full py-6"
              >
                <div className="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-full">
                  <Archive className="h-5 w-5 text-neutral-200" />
                </div>
                <div className="relative flex flex-col gap-0.2">
                  <p className="font-semibold m-0 dark:text-neutral-200">
                    Post archive
                  </p>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-x-3 mt-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md cursor-pointer w-full py-6"
              >
                <div className="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-full">
                  <RotateCcw className="h-5 w-5 text-neutral-200" />
                </div>
                <div className="relative flex flex-col gap-0.2">
                  <p className="font-semibold m-0 dark:text-neutral-200">
                    Story archive
                  </p>
                </div>
              </Button>
            </div>
          )}
        </div>

        {pathname !== "/allactivity/trash" && (
          <Link
            href="/allactivity/trash"
            className="flex items-center gap-x-3 mt-2 pl-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 p-1 rounded-md cursor-pointer"
          >
            <div className="bg-neutral-200 p-2 rounded-full">
              <Trash2 className="h-6 w-6" />
            </div>
            <div className="relative flex flex-col gap-0.2">
              <p className="font-semibold m-0">Trash</p>
            </div>
          </Link>
        )}

        <div className="flex items-center gap-x-3 mt-2 pl-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 p-1 rounded-md cursor-pointer">
          <div className="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-full">
            <List
              className="h-6 w-6 dark:text-neutral-200
            "
            />
          </div>
          <div className="relative flex flex-col gap-0.2">
            <p className="font-semibold m-0 dark:text-neutral-200">
              Activity history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllActivitySideBar;
