"use client";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
import { ALargeSmall, Settings, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const CreateStoryPageSidebar = ({ session, setToggleAddText, image }) => {
  const router = useRouter();

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent the event from propagating to the document
    setToggleAddText(true);
  };

  return (
    <div className="relative h-full">
      <div>
        <div className="flex items-center justify-start mt-2 pl-4 pb-2 gap-2 border-b">
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

        <div className="px-4">
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
              className="h-12 w-12 border"
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

      <Separator className="mt-4" />

      {image && (
        <div className="mx-2">
          <Button
            onClick={handleButtonClick}
            size="icon"
            className="w-full bg-neutral-50 hover:bg-neutral-300 flex justify-start pl-6 py-7 gap-x-3 mt-2"
          >
            <ALargeSmall className="text-neutral-700 h-10 w-10 p-2 bg-neutral-200 rounded-full" />
            <span className="text-neutral-700 font-semibold">Add text</span>
          </Button>
        </div>
      )}

      <div className="absolute bottom-0 pb-4 w-full">
        <div className="flex justify-center gap-x-2 mx-4">
          <Button className="w-full bg-neutral-200 text-black">Discard</Button>
          <Button className="w-full bg-blue-600">Share to story</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryPageSidebar;
