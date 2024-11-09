import { AppWindow, Plus, Search, Settings, UsersRound } from "lucide-react";
import React from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";
import Image from "next/image";
import CreateCommunityModal from "./create-community-modal";

const CommunitySideBar = () => {
  return (
    <div className="border-r border-neutral-300 dark:border-neutral-800 h-screen">
      <div className="pt-2">
        <div className="flex items-center justify-between px-3 p-2">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">
            Communities
          </h1>
          <Settings className="dark:text-white" />
        </div>

        <div className="mx-3 my-1">
          <CreateCommunityModal />
        </div>

        <div className="px-3 mt-3 space-y-1">
          <div className="flex items-center gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 py-1 pl-2 rounded-xl cursor-pointer">
            <AppWindow className="bg-neutral-100 dark:bg-neutral-700 p-2 h-9 w-9 rounded-full text-neutral-800 dark:text-white" />
            <p className="font-medium text-[14px] dark:text-white">
              Community posts
            </p>
          </div>
          <div className="flex items-center gap-x-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 py-1 pl-2 rounded-xl cursor-pointer">
            <UsersRound className="bg-neutral-100 dark:bg-neutral-700 p-2 h-9 w-9 rounded-full text-neutral-800 dark:text-white" />
            <p className="font-medium text-[14px] dark:text-white">Explore</p>
          </div>
        </div>

        <div className="mx-3">
          <Separator className="my-3 bg-gray-300 dark:bg-neutral-700" />
        </div>

        <div className="mx-3">
          <h1 className=" text-neutral-800 font-medium dark:text-white">
            Communities you've joined
          </h1>
        </div>

        {/* render when user is not yet a part of any community */}
        <div className="flex flex-col items-center mt-4">
          <Image
            src="/creativity.png"
            width={800}
            height={800}
            className="h-72 w-72 rounded-3xl"
          />
          <p className="mt-3 text-sm mx-10 text-justify dark:text-white">
            "Ready to make a difference? Join or start a community that inspires
            and empowers".
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunitySideBar;
