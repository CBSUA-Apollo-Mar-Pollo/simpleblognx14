"use client";

import React, { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import UserAvatar from "./UserAvatar";
import DarkMode from "./DarkMode";
import DropDownMenuContentComp from "./DropDownMenuContentComp";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Separator } from "../ui/Separator";
import { Icons } from "./Icons";
import { Button } from "../ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoaderContext } from "@/context/LoaderContext";
import SelectProfile from "./select-profile";

const UserAccountNav = ({ user, profiles, accountOwner }) => {
  const [open, setOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(null);
  const { update } = useSession();
  const router = useRouter();
  const { setIsSwitchingProfile, setProfileInfo } = useContext(LoaderContext);

  const switchProfile = async (profile) => {
    try {
      setIsSwitchingProfile(true);
      setProfileInfo(profile);

      await update({
        type: profile.id === accountOwner.id ? "user" : "page",
        activeProfileId: profile.id,
      });
    } catch (error) {
      console.error("❌ Failed to switch profile:", error);
    }

    setIsSwitchingProfile(false);
  };

  console.log(profiles, "profiles");

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger className="drop-shadow relative xl:block hidden">
        <UserAvatar
          className="h-10 w-10 "
          user={{ name: user?.name || null, image: user?.image || null }}
        />
        <ChevronDown className="absolute bottom-0 right-0 text-black bg-neutral-100 dark:bg-neutral-600 dark:text-white dark:border dark:border-neutral-900 h-3 w-3 rounded-full" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white dark:bg-neutral-800 dark:border-0 px-2 py-3 min-w-[20vw] drop-shadow-lg rounded-xl"
        align="end"
      >
        {/* profile image and name */}
        {!subMenu && (
          <div className=" drop-shadow-[0px_0px_5px_rgba(0,0,0,0.2)] pb-1 dark:drop-shadow-[0px_0px_8px_rgba(0,0,0,0.20)] bg-white dark:bg-neutral-700 dark:hover:bg-neutral-700 rounded-xl pt-1">
            <Link
              href={`/user/${user?.id}`}
              className="pl-2 flex items-center py-1.5 justify-start gap-x-3 hover:bg-neutral-200 rounded-lg cursor-pointer mx-3"
            >
              <UserAvatar
                className="h-12 w-12 "
                user={{ name: user?.name || null, image: user?.image || null }}
              />

              <div className="flex flex-col leading-none">
                {user?.name && (
                  <p className="font-bold text-lg text-neutral-800 dark:text-neutral-100">
                    {user?.name}
                  </p>
                )}
                {user?.handleName ? (
                  <p className="w-[200px] truncate text-sm text-neutral-600 dark:text-neutral-100">
                    {user?.handleName}
                  </p>
                ) : (
                  <p className="w-[200px] truncate text-sm text-neutral-600 dark:text-neutral-100">
                    {user?.email}
                  </p>
                )}
              </div>
            </Link>

            {profiles?.length > 0 && (
              <div className="mx-4 mt-1">
                <Separator className="bg-neutral-300 mb-1" />

                <div className="mb-1">
                  {profiles
                    .filter((profile) => profile?.id !== user?.id)
                    .map((profile) => (
                      <div
                        onClick={() => switchProfile(profile)}
                        key={profile?.id}
                        className=""
                      >
                        <div className="py-1 pl-2 flex items-center gap-x-2 hover:bg-neutral-200 rounded-lg cursor-pointer">
                          {profile?.image ? (
                            <div className="relative">
                              <UserAvatar
                                className="h-7 w-7 absolute top-[6.0.15px] left-[6px]"
                                user={{
                                  name: profile?.name || null,
                                  image: profile?.image || null,
                                }}
                              />
                              <Icons.circularIcon className="h-10 w-10 text-neutral-500" />
                            </div>
                          ) : (
                            <div className="relative">
                              <p className="absolute top-[6.0.15px] left-[6px] text-lg font-semibold bg-yellow-500 text-yellow-800 px-2  w-7 rounded-full">
                                {profile?.name[0].toUpperCase()}
                              </p>
                              <Icons.circularIcon className="h-10 w-10 text-neutral-500" />
                            </div>
                          )}

                          <p className="font-semibold">
                            {profile?.name
                              ? profile?.name.charAt(0).toUpperCase() +
                                profile?.name.slice(1)
                              : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                {profiles?.length > 1 && (
                  <Separator className="bg-neutral-300 mb-3 " />
                )}
              </div>
            )}

            <div className="mx-4 mb-3">
              <Button
                onClick={() => {
                  setActiveSubMenu(true);
                  setSubMenu(3);
                }}
                className="w-full font-semibold bg-neutral-300 hover:bg-neutral-400 text-black gap-x-3"
              >
                <Icons.ProfileChangeIcon className="h-5 w-5 " />
                See all profiles
              </Button>
            </div>
          </div>
        )}

        {!activeSubMenu && (
          <DropDownMenuContentComp
            user={user}
            setActiveSubMenu={setActiveSubMenu}
            setSubMenu={setSubMenu}
          />
        )}

        {activeSubMenu && subMenu === 2 && (
          <DarkMode
            setActiveSubMenu={setActiveSubMenu}
            setSubMenu={setSubMenu}
            setOpen={setOpen}
          />
        )}

        {activeSubMenu && subMenu === 3 && (
          <SelectProfile
            setActiveSubMenu={setActiveSubMenu}
            setSubMenu={setSubMenu}
            profiles={profiles}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
