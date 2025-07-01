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
    <ul className="flex justify-end text-neutral-800 dark:text-neutral-100 pt-2 gap-x-2">
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
      <Button
        variant="ghost"
        className="px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
      >
        More
      </Button>

      <div className="ml-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-neutral-200 rounded-md mt-1 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-600 ">
            <div className="px-2 py-1">
              <MoreHorizontal className="" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="bottom"
            sideOffset={8}
            className="mr-[15.5vw] bg-transparent shadow-none border-none h-[50vh] min-w-[45vw]"
          >
            <div className="flex flex-col items-end relative ">
              {/* <Triangle className="-rotate-90 text-white fill-white z-20 dark:fill-neutral-800 dark:text-neutral-800" /> */}

              {session?.user.id === userId ? (
                <div className="bg-white absolute top-[10px] right-[2px] space-y-0.5  w-[18vw] shadow-lg z-10 rounded-lg p-3 drop-shadow-[0px_0px_5px_rgba(0,0,0,0.4)] dark:drop-shadow-[0px_0px_5px_rgba(0,0,0,0.60)] dark:bg-neutral-800">
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4">
                    <Eye className="h-6 w-6 text-neutral-800" />
                    <span className="font-semibold">View As</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4">
                    <Search className="h-6 w-6 text-neutral-800" />
                    <span className="font-semibold">Search</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4">
                    <Shield className="h-6 w-6 text-neutral-800" />
                    <span className="font-semibold">Profile Status</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/allactivity/archive")}
                    className="cursor-pointer dark:text-white flex-row items-center gap-x-4"
                  >
                    <Archive className="h-6 w-6 text-neutral-800" />
                    <span className="font-semibold">Archive</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4">
                    <History className="h-6 w-6 text-neutral-800" />
                    <span className="font-semibold">Story archive</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4">
                    <List className="h-6 w-6 text-neutral-800" />
                    <span className="font-semibold">Activity Log</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4">
                    <UserCog className="h-6 w-6 text-neutral-800" />
                    <span className="font-semibold">
                      Profile and Tagging settings
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4">
                    <Lock className="h-6 w-6 text-neutral-800" />
                    <span className="font-semibold">Lock Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4">
                    <PlusCircle className="h-6 w-6 text-neutral-800" />
                    <span className="font-semibold">
                      Create another profile
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4">
                    <BadgeCheck className="h-6 w-6 text-neutral-800" />
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
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ul>
  );
};

export default ProfileButtons;
