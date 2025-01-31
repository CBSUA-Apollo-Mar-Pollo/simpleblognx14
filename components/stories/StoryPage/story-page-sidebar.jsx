"use client";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
import { Dot, Plus, Settings, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const StoryPageSidebar = ({ session }) => {
  const router = useRouter();
  return (
    <div className="relative">
      <div>
        <div className="flex items-center justify-start mt-2 pl-4 pb-2 gap-2">
          <button
            onClick={() => router.push("/")}
            className="p-[8px] cursor-pointer bg-neutral-700/50 rounded-full transition hover:bg-neutral-300"
          >
            <X className=" text-neutral-200 h-8 w-8" />
          </button>
          <Link href="/" className="font-bold">
            <span className="py-[2px] px-4 rounded-full bg-yellow-400 text-3xl">
              E
            </span>
          </Link>
        </div>

        <Separator className=" dark:bg-neutral-700" />

        <div className="px-4">
          <div className="flex flex-col mt-3">
            <h1 className="text-2xl font-bold dark:text-white ">Stories</h1>

            <div className="flex items-center mt-3">
              <p className="text-blue-600">Archive</p>
              <Dot className="text-blue-600" />
              <p className="text-blue-600">Settings</p>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold text-lg">Your Story</h2>

            <div className="flex items-center  w-full gap-x-3 mt-3">
              <div className="">
                <Plus className="text-blue-600 bg-neutral-100 p-5 h-16 w-16 rounded-full" />
              </div>

              <div className="flex flex-col">
                <h3 className="font-semibold">Create a story</h3>
                <span className="text-xs text-neutral-600">
                  Share a photo or write something.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-semibold text-lg">All Stories</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPageSidebar;
