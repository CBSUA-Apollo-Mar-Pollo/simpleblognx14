import React from "react";
import { Button } from "../ui/Button";
import { Check, Plus } from "lucide-react";
import { Icons } from "./Icons";
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import { Separator } from "../ui/Separator";
import Link from "next/link";

const SelectProfile = ({ setActiveSubMenu, setSubMenu, profiles }) => {
  return (
    <div className="px-2">
      <div className="flex items-center gap-x-4">
        <Button
          onClick={() => {
            setActiveSubMenu(false);
            setSubMenu(null);
          }}
          variant="ghost"
          className="p-2 hover:bg-neutral-100 rounded-full cursor-pointer dark:hover:bg-neutral-600"
        >
          <Icons.BackIcon className="h-5 w-5  dark:fill-neutral-200" />
        </Button>

        <h1 className="text-2xl font-bold dark:text-neutral-200">
          Select Profile
        </h1>
      </div>

      <div className="mt-3">
        {profiles?.map((profile, index) => (
          <Button
            key={index}
            className="bg-transparent hover:bg-neutral-200 w-full flex justify-between  pl-3 py-7 rounded-xl"
          >
            <div className="flex justify-start items-center gap-x-3">
              <UserAvatar
                className="h-10 w-10"
                user={{
                  name: profile.name || null,
                  image: profile.image || null,
                }}
              />
              <p className="text-black text-[17px]">{profile.name}</p>
            </div>
            <Check className="bg-blue-600 h-5 w-5 rounded-full p-0.5" />
          </Button>
        ))}
        <Separator className="my-1 bg-neutral-300" />
        <Link
          href={"/pages/creation"}
          className="bg-transparent hover:bg-neutral-200 w-full flex justify-start items-center gap-x-3 pl-3 py-2 rounded-xl"
        >
          <div className="bg-neutral-100 p-2 rounded-full">
            <Plus className="text-neutral-800" />
          </div>
          <p className="text-black text-[15px] font-semibold">Create page</p>
        </Link>
      </div>
    </div>
  );
};

export default SelectProfile;
