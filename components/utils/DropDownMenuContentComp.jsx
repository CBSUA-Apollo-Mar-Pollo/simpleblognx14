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
import { HelpCircle, MessageSquareWarning } from "lucide-react";

const DropDownMenuContentComp = ({ user, setSubMenu, setActiveSubMenu }) => {
  const router = useRouter();
  return (
    <DropdownMenuGroup>
      <Link href={`/user/${user.id}`}>
        <DropdownMenuItem className="flex items-center py-2 justify-start gap-x-4 cursor-pointer">
          <UserAvatar
            className="h-10 w-10 "
            user={{ name: user.name || null, image: user?.image || null }}
          />

          <div className="flex flex-col leading-none">
            {user?.name && (
              <p className="font-bold text-lg text-neutral-600">{user?.name}</p>
            )}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-neutral-600">
                {user?.email}
              </p>
            )}
          </div>
        </DropdownMenuItem>
      </Link>

      <DropdownMenuSeparator className="my-2" />

      <div className="space-y-1">
        <DropdownMenuItem
          onClick={() => router.push("/settings")}
          className="cursor-pointer gap-x-3"
        >
          <span className="p-2 bg-neutral-200 rounded-full">
            <Icons.SettingIcon className="h-5 w-5 fill-neutral-800 text-white border-neutral-800" />
          </span>
          <span className="font-medium text-neutral-600">Settings</span>
        </DropdownMenuItem>

        {/* dark mode */}
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setActiveSubMenu(true);
            setSubMenu(2);
          }}
          className="cursor-pointer gap-x-3"
        >
          <span className="p-1.5 bg-neutral-200 rounded-full">
            <Icons.DarkModeIcon className="h-6 w-6 fill-neutral-800 text-white border-neutral-800" />
          </span>
          <span className="font-medium text-neutral-600">Display</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer gap-x-3">
          <span className=" p-1 bg-neutral-200 rounded-full">
            <HelpCircle className="h-7 w-7 fill-neutral-800 text-white border-0" />
          </span>
          <span className="font-medium text-neutral-700">Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer gap-x-3">
          <span className="p-1 bg-neutral-200 rounded-full">
            <MessageSquareWarning className="h-7 w-7 fill-neutral-800 text-white " />
          </span>
          <span className="font-medium text-neutral-600">Give feedback</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer gap-x-3"
        >
          <span className="p-2 bg-neutral-200 rounded-full">
            {/* <LogOut className="text-neutral-600 h-7 w-7" /> */}
            <Icons.signOut className="h-6 w-6 fill-neutral-800 text-white " />
          </span>
          <span className="font-medium text-neutral-600">Sign out</span>
        </DropdownMenuItem>
      </div>
    </DropdownMenuGroup>
  );
};

export default DropDownMenuContentComp;
