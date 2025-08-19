import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
import { getAuthSession } from "@/lib/auth";
import { ArrowLeft, ChevronDown, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileMenu = async () => {
  const session = await getAuthSession();

  return (
    <div className="px-3 bg-gray-100 h-screen">
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center">
          <Link href="/" className="bg-gray-100 mr-5">
            <ArrowLeft className="text-black" />
          </Link>
          <h1 className="text-2xl font-bold">Menu</h1>
        </div>

        <Button className="bg-gray-200 hover:bg-white rounded-full p-2 mr-2">
          <Search className="text-black h-6 w-6" />
        </Button>
      </div>

      <Button className="bg-white border border-neutral-200 w-full flex items-center justify-between mt-4 py-8 ">
        <div className="flex items-center gap-x-2">
          <UserAvatar
            className="h-10 w-10"
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />
          <div className="flex flex-col items-start relative">
            <h3 className="text-black text-[16px]">{session?.user.name}</h3>
            <span className="text-neutral-600 text-light -mt-0.5">
              View your profile
            </span>
          </div>
        </div>

        <Button className="bg-gray-200 rounded-full p-1.5">
          <ChevronDown className="text-black w-7 h-7" />
        </Button>
      </Button>

      <div className="grid grid-cols-2 pt-4 gap-x-2 gap-y-3">
        <Button className="flex flex-col justify-start items-start h-full bg-white text-neutral-800 border border-neutral-200 gap-y-1 font-normal">
          <Image
            sizes="100vw"
            src={"/ImageIcons/clapper.png"}
            width="0"
            height="0"
            className="w-7 h-7"
            alt="Shortsv icon"
          />
          Shortsv
        </Button>
        <Button className="flex flex-col justify-start items-start h-full bg-white text-neutral-800 border border-neutral-200 gap-y-1 font-normal">
          <Image
            sizes="100vw"
            src={"/ImageIcons/message.png"}
            width="0"
            height="0"
            className="w-7 h-7"
            alt="Chatbox icon"
          />
          Chatbox
        </Button>
        <Button className="flex flex-col justify-start items-start h-full bg-white text-neutral-800 border border-neutral-200 gap-y-1 font-normal">
          <Image
            sizes="100vw"
            src={"/ImageIcons/findgroup.png"}
            width="0"
            height="0"
            className="w-7 h-7"
            alt="Community icon"
          />
          Community
        </Button>
        <Button className="flex flex-col justify-start items-start h-full bg-white text-neutral-800 border border-neutral-200 gap-y-1 font-normal">
          <Image
            sizes="100vw"
            src={"/ImageIcons/findfriends.png"}
            width="0"
            height="0"
            className="w-7 h-7"
            alt="Friends icon"
          />
          Friends
        </Button>
        <Button className="flex flex-col justify-start items-start h-full bg-white text-neutral-800 border border-neutral-200 gap-y-1 font-normal">
          <Image
            sizes="100vw"
            src={"/ImageIcons/play.png"}
            width="0"
            height="0"
            className="w-7 h-7"
            alt="Video icon"
          />
          Video
        </Button>
        <Button className="flex flex-col justify-start items-start h-full bg-white text-neutral-800 border border-neutral-200 gap-y-1 font-normal">
          <Image
            sizes="100vw"
            src={"/ImageIcons/pages.png"}
            width="0"
            height="0"
            className="w-7 h-7"
            alt="Page icon"
          />
          Page
        </Button>
        <Button className="flex flex-col justify-start items-start h-full bg-white text-neutral-800 border border-neutral-200 gap-y-1 font-normal">
          <Image
            sizes="100vw"
            src={"/ImageIcons/bookmark.png"}
            width="0"
            height="0"
            className="w-7 h-7"
            alt="Saved icon"
          />
          Saved
        </Button>
        <Button className="flex flex-col justify-start items-start h-full bg-white text-neutral-800 border border-neutral-200 gap-y-1 font-normal">
          <Image
            sizes="100vw"
            src={"/ImageIcons/refresh.png"}
            width="0"
            height="0"
            className="w-7 h-7"
            alt="Memories icon"
          />
          Memories
        </Button>
        <Button className="flex flex-col justify-start items-start h-full bg-white text-neutral-800 border border-neutral-200 gap-y-1 font-normal">
          <Image
            sizes="100vw"
            src={"/ImageIcons/postfeeds.png"}
            width="0"
            height="0"
            className="w-7 h-7"
            alt="Feed icon"
          />
          Feed
        </Button>
      </div>

      <Separator className="bg-neutral-300 my-4" />

      <div className="flex flex-col space-y-2">
        <Button className="w-full flex items-center justify-between bg-transparent text-black border-b border-neutral-300 pb-4">
          <div className="flex items-center gap-x-4">
            <Image
              sizes="100vw"
              src={"/ImageIcons/Settings.png"}
              width="0"
              height="0"
              className="w-7 h-7"
            />
            <span className="text-[16px]">Settings & Privacy</span>
          </div>

          <ChevronDown className="" />
        </Button>
        <Button className="w-full flex items-center justify-between bg-transparent text-black border-b border-neutral-300 pb-4">
          <div className="flex items-center gap-x-4">
            <Image
              sizes="100vw"
              src={"/ImageIcons/Help.png"}
              width="0"
              height="0"
              className="w-7 h-7"
            />
            <span className="text-[16px]">Help & Support</span>
          </div>

          <ChevronDown className="" />
        </Button>
        <Button className="w-full flex justify-start bg-transparent text-black gap-x-4">
          <Image
            sizes="100vw"
            src={"/ImageIcons/Logout.png"}
            width="0"
            height="0"
            className="w-7 h-7"
          />
          <span className="text-[16px]">Log out</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileMenu;
