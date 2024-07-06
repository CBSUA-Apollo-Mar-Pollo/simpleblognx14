import { Button, buttonVariants } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileButtons = ({ userId }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
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
            pathname === `/user/${userId}/photos` &&
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

          <DropdownMenuContent className="bg-neutral-800 dark:border-none">
            {session?.user.id === userId ? (
              <>
                <DropdownMenuItem className="cursor-pointer">
                  View As
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Profile Status
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Activity Log
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Lock Profile
                </DropdownMenuItem>
              </>
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

export default ProfileButtons;
