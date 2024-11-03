"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/Button";
import UserAccountNav from "./UserAccountNav";
import NotificationMenu from "../Notification/NotificationMenu";
import ToolTipComp from "./ToolTipComp";
import SearchInput from "./SearchInput";
import { Icons } from "./Icons";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Menu from "./Menu";
import ChatBoxMenu from "./ChatBoxMenu";
import { Skeleton } from "../ui/Skeleton";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isLoader, setIsloader] = useState(true);
  useEffect(() => {
    if (!session?.user) {
      setIsloader(false);
    }
  }, []);

  return (
    <div className="sticky top-0 inset-x-0 h-fit z-20 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="container max-w-full h-full mx-auto pl-[20px] pr-[10px] gap-2 grid grid-cols-4">
        {/* logo and search bar  */}
        <div className="flex items-center gap-x-2 col-span-1">
          <Link href="/" className="font-bold">
            <span className=" px-3.5 py-[2px] rounded-full bg-yellow-500/80 text-[27px] ">
              E
            </span>
          </Link>
          {/* search input */}
          <SearchInput />
        </div>

        <div className="grid grid-cols-3 text-neutral-600 dark:text-neutral-300 col-span-2 px-[3vw] mr-10">
          <ToolTipComp content="Home">
            {pathname === "/" ? (
              <div className="flex justify-center border-b-[4px] border-blue-600 rounded py-2.5">
                <Icons.HomeFilled className="fill-blue-500 h-8 w-8 " />
              </div>
            ) : (
              <Link href="/" className="flex justify-center py-3">
                <Icons.Home className="fill-neutral-600 dark:fill-neutral-300 h-8 w-8 " />
              </Link>
            )}
          </ToolTipComp>

          <ToolTipComp content="Videos" className="cursor-pointer">
            {pathname === "/watch" ? (
              <Link
                href="/shortsv"
                className="flex justify-center border-b-[4px] border-blue-600 rounded py-2.5"
              >
                <Icons.Play className="fill-blue-500 h-8 w-8 " />
              </Link>
            ) : (
              <Link href="/watch" className="flex justify-center py-3">
                <Icons.Play className="fill-neutral-600 dark:fill-neutral-300 h-8 w-8 " />
              </Link>
            )}
          </ToolTipComp>

          <ToolTipComp content="Communities" className="cursor-pointer">
            {pathname === "/communities" ? (
              <Link
                href="/communities"
                className="flex justify-center border-b-[4px] border-blue-600 rounded py-2.5"
              >
                <Icons.Group className="fill-blue-500 h-8 w-8 " />
              </Link>
            ) : (
              <Link href="/communities" className="flex justify-center py-3">
                <Icons.Group className="fill-neutral-600 dark:fill-neutral-300 h-8 w-8 " />
              </Link>
            )}
          </ToolTipComp>
        </div>

        {/* notification and profile pic */}
        <div className=" flex items-center justify-end  gap-x-2 col-span-1">
          {session ? (
            <>
              <Menu contentClassName="-mr-32" />
              <ChatBoxMenu />
              <NotificationMenu />
              {/* user profile */}
              <UserAccountNav user={session.user} />
            </>
          ) : isLoader ? (
            <div className="flex items-center gap-x-2">
              <Skeleton className="rounded-full bg-neutral-300 h-10 w-10" />
              <Skeleton className="rounded-full bg-neutral-300 h-10 w-10" />
              <Skeleton className="rounded-full bg-neutral-300 h-10 w-10" />
              <Skeleton className="rounded-full bg-neutral-300 h-10 w-10" />
            </div>
          ) : (
            <div className="flex items-center gap-x-1">
              {resolvedTheme === "light" ? (
                <Button
                  onClick={() => setTheme("dark")}
                  size="icon"
                  variant="ghost"
                  className="dark:hover:bg-neutral-700 rounded-full"
                >
                  <Moon className="w-5 h-5 text-neutral-800" />
                </Button>
              ) : (
                <Button
                  onClick={() => setTheme("light")}
                  size="icon"
                  variant="ghost"
                  className="dark:hover:bg-neutral-700 rounded-full"
                >
                  <Sun className="w-5 h-5 text-neutral-100 " />
                </Button>
              )}

              <Link
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-50 rounded-full"
                )}
                href="/sign-in"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
