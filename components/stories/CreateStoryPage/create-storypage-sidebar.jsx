"use client";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { Icons } from "@/components/utils/Icons";
import UserAvatar from "@/components/utils/UserAvatar";
import { ALargeSmall, Loader2, Settings, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const CreateStoryPageSidebar = ({
  session,
  setToggleAddText,
  image,
  setIsDiscarding,
  storyPreview,
  createStory,
  isLoading,
}) => {
  const router = useRouter();

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent the event from propagating to the document
    setToggleAddText(true);
  };

  console.log(isLoading);

  return (
    <div className="relative h-screen">
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
          <div className="flex items-center justify-between  mt-3">
            <h1 className="text-2xl font-bold dark:text-white ">Your Story</h1>
            <Button
              size="icon"
              className="bg-neutral-200 dark:bg-neutral-800 rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-700"
            >
              <Icons.SettingIcon className="h-5 w-5 fill-neutral-800  border-neutral-800 dark:fill-neutral-200" />
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

            <span className="font-semibold text-lg text-neutral-800 dark:text-white">
              {session?.user.name}
            </span>
          </div>
        </div>
      </div>

      <Separator className="mt-4 dark:bg-neutral-700" />

      {image && (
        <div className="mx-2">
          <Button
            onClick={handleButtonClick}
            size="icon"
            className="w-full bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-300 dark:hover:bg-neutral-800 flex justify-start pl-6 py-7 gap-x-3 mt-2"
          >
            <ALargeSmall className="text-neutral-700 h-10 w-10 p-2 bg-neutral-200 dark:bg-neutral-800 dark:text-white rounded-full" />
            <span className="text-neutral-700 font-semibold dark:text-white">
              Add text
            </span>
          </Button>
        </div>
      )}

      {storyPreview && (
        <div className="absolute bottom-0 pb-4 w-full">
          <div className="flex justify-center gap-x-2 mx-4">
            <Button
              disabled={isLoading}
              onClick={() => setIsDiscarding(true)}
              className={`w-full bg-neutral-200 text-black ${
                isLoading && "cursor-not-allowed"
              } `}
            >
              Discard
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => createStory()}
              className={`w-full bg-blue-600 flex items-center gap-x-2 ${
                isLoading && "cursor-not-allowed"
              }`}
            >
              {isLoading && (
                <span>
                  {" "}
                  <Loader2 className="h-5 w-5 text-whit5 animate-spin my-4" />
                </span>
              )}
              Share to story
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStoryPageSidebar;
