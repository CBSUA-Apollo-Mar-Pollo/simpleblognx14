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

const UserAccountNav = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(false);
  const [subMenu, setSubMenu] = useState(null);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-10 w-10 "
          user={{ name: user.name || null, image: user?.image || null }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white dark:bg-neutral-800 dark:border-0 px-2 py-2 min-w-[22vw] shadow-2xl"
        align="end"
      >
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
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
