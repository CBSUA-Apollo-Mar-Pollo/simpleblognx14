"use client";

import { Button, buttonVariants } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Archive,
  BadgeCheck,
  Eye,
  History,
  List,
  Lock,
  MoreHorizontal,
  PlusCircle,
  Search,
  Shield,
  Trash2,
  Triangle,
  UserCog,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const PageProfileButtons = ({ userId }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <ul className="flex justify-end bg-white shadow text-neutral-800 dark:text-neutral-100 pt-2  pr-[14vw]">
      <Link
        href={`/user/${userId}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          `px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold  dark:text-neutral-100  py-5 dark:hover:bg-neutral-700 ${
            pathname === `/user/${userId}` &&
            "border-b-4 rounded-none border-blue-600 text-blue-600 dark:text-blue-600 dark:hover:bg-neutral-800 dark:hover:text-blue-700"
          }`
        )}
      >
        Posts
      </Link>
      <Button
        variant="ghost"
        className="px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
      >
        About
      </Button>
      <Button
        variant="ghost"
        className="px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
      >
        Mentions
      </Button>
      <Button
        variant="ghost"
        className="px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
      >
        Reviews
      </Button>
      <Button
        variant="ghost"
        className="px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
      >
        Reels
      </Button>
      <Link
        href={`/user/${userId}/photos`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          `px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 ${
            pathname === `/user/${userId}/photos` &&
            "border-b-4 rounded-none border-blue-600 text-blue-600 dark:hover:bg-inherit"
          }`
        )}
      >
        Photos
      </Link>

      <Button
        variant="ghost"
        className="px-6 flex items-center gap-x-1 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
      >
        <span>More</span>
        <Triangle className="-rotate-180 text-neutral-700 fill-neutral-700 z-20 dark:fill-neutral-800 dark:text-neutral-800 h-2 w-2" />
      </Button>

      <div className="ml-2">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="bg-neutral-200 rounded-md mt-1 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-600 ">
            <div className="px-2 py-1">
              <MoreHorizontal className="" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="bottom"
            sideOffset={8}
            className="p-0  xl:min-w-[15vw]  rounded-lg"
          >
            {session?.user.id === userId ? (
              <div className="  space-y-0.5    dark:bg-neutral-800 p-3">
                <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                  <Eye className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">View As</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                  <Search className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">Search</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                  <Shield className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">Profile Status</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/allactivity/archive")}
                  className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600"
                >
                  <Archive className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">Post Archive</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                  <History className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">Story archive</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/allactivity/trash")}
                  className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600"
                >
                  <Trash2 className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">Trash</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                  <List className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">Activity Log</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                  <UserCog className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">
                    Profile and Tagging settings
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                  <Lock className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">Lock Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                  <PlusCircle className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">Create another profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                  <BadgeCheck className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                  <span className="font-semibold">Estorya verified</span>
                </DropdownMenuItem>
              </div>
            ) : (
              <>
                <DropdownMenuItem className="cursor-pointer dark:text-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-100">
                  Follow
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:text-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-100">
                  Find Suppport or report
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer dark:text-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-100">
                  Block
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ul>
  );
};

export default PageProfileButtons;
