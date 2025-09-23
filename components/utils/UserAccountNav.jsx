"use client";

import React, { useState } from "react";
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

const UserAccountNav = ({ user, profiles }) => {
  const [open, setOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(null);
  const { update } = useSession();

  const switchProfile = async (profile) => {
    await update({
      type: profile.id === user.id ? "user" : "page",
      activeProfileId: profile.id,
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger className="drop-shadow relative xl:block hidden">
        <UserAvatar
          className="h-10 w-10 "
          user={{ name: user.name || null, image: user?.image || null }}
        />
        <ChevronDown className="absolute bottom-0 right-0 text-black bg-neutral-100 dark:bg-neutral-600 dark:text-white dark:border dark:border-neutral-900 h-3 w-3 rounded-full" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white dark:bg-neutral-800 dark:border-0 px-3 py-3 min-w-[22vw] drop-shadow-lg"
        align="end"
      >
        {/* profile image and name */}
        {!subMenu && (
          <div className=" drop-shadow-[0px_0px_5px_rgba(0,0,0,0.2)] pb-1 dark:drop-shadow-[0px_0px_8px_rgba(0,0,0,0.20)] bg-white dark:bg-neutral-700 dark:hover:bg-neutral-700 rounded-xl">
            <Link href={`/user/${user.id}`}>
              <div className="pl-5 flex items-center py-3 justify-start gap-x-3  ">
                <UserAvatar
                  className="h-12 w-12 "
                  user={{ name: user.name || null, image: user?.image || null }}
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
              </div>
            </Link>

            <div className="mx-4">
              <Separator className="bg-neutral-300 mb-1" />

              <div className="mb-1">
                {profiles?.length > 0 &&
                  profiles
                    .filter((profile) => profile.id !== user.activeProfileId)
                    .map((profile) => (
                      <div
                        onClick={() => switchProfile(profile)}
                        key={profile.id}
                        className=""
                      >
                        <div className="py-1 pl-2 flex items-center gap-x-2 hover:bg-neutral-200 rounded-lg cursor-pointer">
                          {profile.image ? (
                            <div className="relative">
                              <UserAvatar
                                className="h-7 w-7 absolute top-[6.0.15px] left-[6px]"
                                user={{
                                  name: profile.name || null,
                                  image: profile?.image || null,
                                }}
                              />
                              <Icons.circularIcon className="h-10 w-10 text-neutral-500" />
                            </div>
                          ) : (
                            <div className="relative">
                              <p className="absolute top-[6.0.15px] left-[6px] text-lg font-semibold bg-yellow-500 text-yellow-800 px-2  w-7 rounded-full">
                                {profile.name[0].toUpperCase()}
                              </p>
                              <Icons.circularIcon className="h-10 w-10 text-neutral-500" />
                            </div>
                          )}

                          <p className="font-semibold">
                            {profile?.name
                              ? profile.name.charAt(0).toUpperCase() +
                                profile.name.slice(1)
                              : ""}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>

              <Separator className="bg-neutral-300 mb-3" />
            </div>

            <div className="mx-4 mb-3">
              <Button className="w-full font-semibold bg-neutral-300 hover:bg-neutral-400 text-black">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
