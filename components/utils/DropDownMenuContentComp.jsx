import React from "react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/Dropdown-menu";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { Icons } from "./Icons";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ChevronRight, HelpCircle, MessageSquareWarning } from "lucide-react";
import { useSocket } from "../Providers/socket-provider";

const DropDownMenuContentComp = ({ user, setSubMenu, setActiveSubMenu }) => {
  const router = useRouter();
  const { socket } = useSocket();

  return (
    <DropdownMenuGroup>
      <DropdownMenuSeparator className="my-4 bg-neutral-200 dark:bg-neutral-600" />

      <div className="space-y-1">
        <Link href="/settings">
          <DropdownMenuItem
            // Remove onClick and router.push
            // The DropdownMenuItem receives the navigation behavior from Link
            className="cursor-pointer dark:hover:bg-neutral-700 rounded-md flex justify-between"
          >
            <div className="flex items-center gap-x-3">
              <span className="p-2 bg-neutral-200 rounded-full dark:bg-neutral-700">
                <Icons.SettingIcon className="h-5 w-5 fill-neutral-800 border-neutral-800 dark:fill-neutral-200" />
              </span>
              <span className="font-medium text-neutral-600 dark:text-neutral-100">
                Settings
              </span>
            </div>
            <ChevronRight className="h-9 w-9 stroke-[1.5px] text-neutral-600" />
          </DropdownMenuItem>
        </Link>

        {/* dark mode */}
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setActiveSubMenu(true);
            setSubMenu(2);
          }}
          className="cursor-pointer dark:hover:bg-neutral-700 rounded-md flex justify-between"
        >
          <div className="flex items-center gap-x-3">
            <span className="p-1.5 bg-neutral-200 rounded-full dark:bg-neutral-600">
              <Icons.DarkModeIcon className="h-6 w-6 fill-neutral-800 text-white border-neutral-800 dark:fill-neutral-200" />
            </span>
            <span className="font-medium text-neutral-600 dark:text-neutral-100">
              Display
            </span>
          </div>
          <ChevronRight className="h-9 w-9 stroke-[1.5px] text-neutral-600" />
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer gap-x-3 dark:hover:bg-neutral-700  flex justify-between">
          <div className="flex items-center gap-x-3">
            <span className=" p-1 bg-neutral-200 rounded-full dark:bg-neutral-700">
              <HelpCircle className="h-7 w-7 fill-neutral-800 text-white border-0 dark:fill-neutral-600 dark:text-neutral-200" />
            </span>
            <span className="font-medium text-neutral-700 dark:text-neutral-200">
              Help & Support
            </span>
          </div>
          <ChevronRight className="h-9 w-9 stroke-[1.5px] text-neutral-600" />
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer gap-x-3 dark:hover:bg-neutral-700">
          <span className="p-1 bg-neutral-200 rounded-full dark:bg-neutral-700">
            <MessageSquareWarning className="h-7 w-7 fill-neutral-800 text-white dark:fill-neutral-600 dark:text-neutral-200" />
          </span>
          <span className="font-medium text-neutral-600 dark:text-neutral-200">
            Give feedback
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
            socket.emit("sign-out", user.id);
          }}
          className="cursor-pointer gap-x-3 dark:hover:bg-neutral-700"
        >
          <span className="p-2 bg-neutral-200 rounded-full dark:bg-neutral-700">
            {/* <LogOut className="text-neutral-600 h-7 w-7" /> */}
            <Icons.signOut className="h-6 w-6 fill-neutral-800 text-white dark:fill-neutral-200 dark:text-neutral-200" />
          </span>
          <span className="font-medium text-neutral-600 dark:text-neutral-200">
            Sign out
          </span>
        </DropdownMenuItem>
      </div>
    </DropdownMenuGroup>
  );
};

export default DropDownMenuContentComp;
