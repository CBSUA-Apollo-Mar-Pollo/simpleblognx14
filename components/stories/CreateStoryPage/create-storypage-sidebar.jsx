"use client";

import { Button } from "@/components/ui/Button";
import UserAvatar from "@/components/utils/UserAvatar";
import { Settings, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateStoryPageSidebar = ({ session }) => {
  return (
    <div>
      <div className="flex items-center justify-start mt-2 pl-4 pb-2 gap-2 border-b">
        <div className="p-[8px] cursor-pointer bg-neutral-700/50 hover:bg-neutral-500/70 rounded-full transition">
          <X className=" text-neutral-200 h-8 w-8" />
        </div>
        <Link href="/" className="font-bold">
          <span className="py-[2px] px-4 rounded-full bg-yellow-400 text-3xl">
            E
          </span>
        </Link>
      </div>

      <div className="mx-4">
        <div className="flex items-center justify-between  mt-3">
          <h1 className="text-2xl font-bold">Your Story</h1>
          <Button
            size="icon"
            className="bg-neutral-200 rounded-full hover:bg-neutral-300"
          >
            <Settings className="text-neutral-200 hover:text-neutral-300 fill-neutral-700 w-7 h-7 " />
          </Button>
        </div>

        <div className="flex items-center gap-x-3 mt-2">
          <UserAvatar
            className="h-16 w-16 border"
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />

          <span className="font-semibold text-lg text-neutral-800">
            {session.user.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryPageSidebar;
