"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
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

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isLoader, setIsloader] = useState(true);
  useEffect(() => {
    if (!session?.user) {
      setIsloader(false);
    }
  }, []);
  return (
    <div className="sticky top-0 inset-x-0 h-fit z-20 bg-white dark:bg-neutral-800 shadow-sm">
      <div className="container max-w-full h-full mx-auto pl-[20px] pr-[10px] gap-2 grid grid-cols-4">
        {/* logo and search bar  */}
        <div className="flex items-center gap-x-2 col-span-1">
          <Link href="/" className="font-bold">
            <span className=" px-3.5 rounded-full bg-yellow-400 text-[30px] ">
              E
            </span>
          </Link>
          {/* search input */}
          <SearchInput />
        </div>

        <div className="grid grid-cols-5 text-neutral-600 dark:text-neutral-300 col-span-2 px-14">
          <ToolTipComp content="Home">
            {pathname === "/" ? (
              <Link
                href="/"
                className="flex justify-center border-b-[4px] border-blue-600 rounded py-2.5"
              >
                <Icons.HomeFilled className="fill-blue-500 h-8 w-8 " />
              </Link>
            ) : (
              <div className="flex justify-center py-3">
                <Icons.Home className="fill-neutral-600 dark:fill-neutral-300 h-8 w-8 " />
              </div>
            )}
          </ToolTipComp>

          <ToolTipComp content="Videos" className="cursor-pointer">
            {pathname === "/shortsv" ? (
              <Link
                href="/shortsv"
                className="flex justify-center border-b-[4px] border-blue-600 rounded py-2.5"
              >
                <Icons.Play className="fill-blue-500 h-8 w-8 " />
              </Link>
            ) : (
              <div className="flex justify-center py-3">
                <Icons.Play className="fill-neutral-600 dark:fill-neutral-300 h-8 w-8 " />
              </div>
            )}
          </ToolTipComp>

          <ToolTipComp content="Gaming">
            {pathname === "/Gaming" ? (
              <Link
                href="/shortsv"
                className="flex justify-center border-b-[4px] border-blue-600 rounded py-2.5"
              >
                <Icons.GamePad className="h-8 w-8 fill-neutral-500 dark:fill-neutral-300" />
              </Link>
            ) : (
              <div className="flex justify-center  py-3">
                <Icons.GamePad className="fill-neutral-600 dark:fill-neutral-300 h-8 w-8 " />
              </div>
            )}
          </ToolTipComp>

          <ToolTipComp content="Following Pages/People">
            {pathname === "/shortsv" ? (
              <Link
                href="/shortsv"
                className="flex justify-center border-b-[4px] border-blue-600 rounded py-2.5"
              >
                <Icons.Group className="h-8 w-8 fill-neutral-500 dark:fill-neutral-300" />
              </Link>
            ) : (
              <div className="flex justify-center  py-3">
                <Icons.Group className="fill-neutral-600 dark:fill-neutral-300 h-8 w-8 " />
              </div>
            )}
          </ToolTipComp>

          <ToolTipComp content="Market">
            {pathname === "/shortsv" ? (
              <Link
                href="/shortsv"
                className="flex justify-center border-b-[4px] border-blue-600 rounded py-2.5"
              >
                <Icons.Market className="h-8 w-8 fill-neutral-500 dark:fill-neutral-300" />
              </Link>
            ) : (
              <div className="flex justify-center  py-3">
                <Icons.Market className="fill-neutral-600 dark:fill-neutral-300 h-8 w-8 " />
              </div>
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
            <Link
              className={cn(buttonVariants({ variant: "secondary" }))}
              href="/sign-in"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
