"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu";
import UserAvatar from "./UserAvatar";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  HelpCircle,
  LogOut,
  MessageSquareWarning,
  Settings,
} from "lucide-react";

const UserAccountNav = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-10 w-10 "
          user={{ name: user.name || null, image: user.image || null }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white px-2 py-3" align="end">
        <div className="flex items-center justify-start gap-x-4 p-2">
          <UserAvatar
            className="h-10 w-10 "
            user={{ name: user.name || null, image: user.image || null }}
          />

          <div className="flex flex-col leading-none">
            {user.name && (
              <p className="font-bold text-lg text-neutral-600">{user.name}</p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-neutral-600">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator className="my-4" />

        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer gap-x-2">
            <span className=" p-2">
              <Settings className="text-neutral-600" />
            </span>
            <span className="font-semibold text-neutral-600">Settings</span>
          </DropdownMenuItem>
        </Link>

        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer gap-x-2">
            <span className=" p-2">
              <HelpCircle className="text-neutral-600" />
            </span>
            <span className="font-semibold text-neutral-600">
              Help & Support
            </span>
          </DropdownMenuItem>
        </Link>

        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer gap-x-2">
            <span className=" p-2">
              <MessageSquareWarning className="text-neutral-600" />
            </span>
            <span className="font-semibold text-neutral-600">
              Give feedback
            </span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer gap-x-2"
        >
          <span className="p-2">
            <LogOut className="text-neutral-600" />
          </span>
          <span className="font-semibold text-neutral-600">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
