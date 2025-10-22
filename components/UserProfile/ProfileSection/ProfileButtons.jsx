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

const ProfileButtons = ({ userId }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <ul className="flex justify-end bg-white shadow-[0_1px_1px_rgba(0,0,0,0.1)] text-neutral-800 dark:text-neutral-100 pt-2 pr-[14vw]">
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
      <Link
        href={`/user/${userId}/about_overview`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          `px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 ${
            pathname.startsWith(`/user/${userId}/about_`) &&
            "border-b-4 rounded-none border-blue-600 text-blue-600 dark:hover:bg-inherit"
          }`
        )}
      >
        About
      </Link>
      <Button
        variant="ghost"
        className="px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
      >
        Friends
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
      <Link
        href={`/user/${userId}/photos`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          `px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 ${
            pathname === `/user/${userId}/videos` &&
            "border-b-4 rounded-none border-blue-600 text-blue-600 dark:hover:bg-inherit"
          }`
        )}
      >
        Videos
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="px-6 focus-visible:outline-none mb-1 flex items-center justify-center gap-x-2 rounded-md hover:bg-neutral-200 cursor-pointer text-sm font-semibold  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200">
          More
          <Triangle className="rotate-180 h-[9px] w-[9px] fill-neutral-700" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="ml-48 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)] shadow-none min-w-[17vw] rounded-xl py-2 px-2 *:cursor-pointer  *:py-1.5">
          <DropdownMenuItem className="font-semibold">Sports</DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">Music</DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">Movies</DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">
            TV shows
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">Books</DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">
            App and games
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">Likes</DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">Sports</DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">Events</DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">
            Reviews given
          </DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">Groups</DropdownMenuItem>
          <DropdownMenuItem className="font-semibold">
            Manage sections
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="ml-2">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="bg-neutral-200 rounded-md mt-1 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-600 ">
            <div className="px-2 py-1 ">
              <MoreHorizontal className="" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="bottom"
            sideOffset={8}
            className="p-2 min-w-[22vw] bg-transparent border-0 drop-shadow-[0_4px_9px_rgba(0,0,0,0.4)] shadow-none group"
          >
            <div className="relative z-0 mb-2">
              <Triangle className="fill-white text-white h-10 w-10 rotate-90 absolute group-data-[side=bottom]:-top-4  left-1/2 -translate-x-1/2 z-30" />
              {session?.user.id === userId ? (
                <div className="bg-white   mt-2 z-40 relative ml-[3.2px] rounded-xl p-2">
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
                    <span className="font-semibold">
                      Create another profile
                    </span>
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
              <Triangle className="fill-white text-white h-10 w-10 rotate-90 absolute group-data-[side=bottom]:hidden group-data-[side=top]:-bottom-4 left-1/2 -translate-x-1/2 z-30" />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ul>
  );
};

export default ProfileButtons;
