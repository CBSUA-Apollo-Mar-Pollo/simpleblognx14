import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { getAuthSession } from "@/lib/auth";
import { Camera, Pen } from "lucide-react";
import React from "react";

const UserProfile = async () => {
  const session = await getAuthSession();
  return (
    <div className="flex justify-center mt-[60px] bg-neutral-100">
      <div className="relative">
        <div className="relative">
          <Button
            variant="ghost"
            className="absolute bottom-5 right-5 bg-white text-black gap-x-2"
          >
            <Camera className="text-white" fill="black" />{" "}
            <span className="font-semibold">Add cover photo</span>
          </Button>
          <div className="w-[70vw] bg-neutral-900 h-[60vh] rounded-b-2xl" />
        </div>
        <div className="absolute bottom-0 top-[22vw] left-[4vw]">
          <UserAvatar
            className="h-44 w-44 border-4 border-neutral-800"
            user={{
              name: session.user.name || null,
              image: session.user.image || null,
            }}
          />
        </div>
        <div className="my-5 w-full">
          <div className="ml-[16vw] mr-10 flex justify-between">
            <h1 className="font-bold text-4xl">{session?.user.name}</h1>
            <div>
              <Button className="flex items-center gap-x-2">
                <Pen className="h-4 w-4" fill="currentColor" />
                <span>Edit profile</span>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mt-10" />

        <div className="">
          <ul className="flex justify-end text-neutral-800 py-1">
            <Button
              variant="ghost"
              className="px-8 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
            >
              Post
            </Button>
            <Button
              variant="ghost"
              className="px-8 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
            >
              About
            </Button>
            <Button
              variant="ghost"
              className="px-8 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
            >
              Photos
            </Button>
            <Button
              variant="ghost"
              className="px-8 hover:bg-neutral-200 cursor-pointer text-base font-semibold"
            >
              More
            </Button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
