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

const UserAccountNav = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(null);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger className="drop-shadow">
        <UserAvatar
          className="h-10 w-10 "
          user={{ name: user.name || null, image: user?.image || null }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white dark:bg-neutral-800 dark:border-0 px-3 py-3 min-w-[22vw] drop-shadow-lg"
        align="end"
      >
        {/* profile image and name */}
        {!subMenu && (
          <div className=" drop-shadow-[0px_0px_5px_rgba(0,0,0,0.11)] dark:drop-shadow-[0px_0px_8px_rgba(0,0,0,0.20)] bg-white dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl">
            <Link href={`/user/${user.id}`}>
              <div className="px-2.5 flex items-center py-3 justify-start gap-x-3  ">
                <UserAvatar
                  className="h-14 w-14 "
                  user={{ name: user.name || null, image: user?.image || null }}
                />

                <div className="flex flex-col leading-none">
                  {user?.name && (
                    <p className="font-semibold text-lg text-neutral-800 dark:text-neutral-100">
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
