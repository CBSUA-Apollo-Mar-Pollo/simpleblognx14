"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import UserAccountNav from "./UserAccountNav";
import { Grip, Home } from "lucide-react";
import NotificationMenu from "../Notification/NotificationMenu";
import ToolTipComp from "./ToolTipComp";
import Image from "next/image";
import SearchInput from "./SearchInput";
import { Icons } from "./Icons";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Menu from "./Menu";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <div className="sticky top-0 inset-x-0 h-fit z-20 bg-white dark:bg-zinc-800 shadow-sm">
      <div className="container max-w-full h-full mx-auto px-[30px] flex items-center justify-between gap-2">
        {/* logo and search bar  */}
        <div className="flex items-center gap-x-2">
          <Link href="/" className="font-bold">
            <span className=" px-3.5 rounded-full bg-yellow-400 text-[30px] ">
              E
            </span>
          </Link>
          {/* search input */}
          <SearchInput />
        </div>

        <div className="flex space-x-16 mr-[12rem] text-neutral-600 dark:text-neutral-300">
          <ToolTipComp content="Home">
            {pathname === "/" ? (
              <div className="flex justify-center border-b-[3px] border-blue-600 w-28 py-2.5">
                <Icons.HomeFilled className="fill-blue-500 h-8 w-8 " />
              </div>
            ) : (
              <Icons.Home className="fill-neutral-400 dark:fill-neutral-300 h-8 w-8" />
            )}
          </ToolTipComp>

          <div className="px-4 flex items-center">
            <ToolTipComp content="Videos">
              <Link href="/shortsv" className="">
                <Icons.Play className="h-8 w-8 fill-neutral-500 dark:fill-neutral-300" />
              </Link>
            </ToolTipComp>
          </div>
          <div className="px-4 flex items-center">
            <ToolTipComp content="Gaming">
              <Link href="/shortsv" className="">
                <Icons.GamePad className="h-8 w-8 fill-neutral-500 dark:fill-neutral-300" />
              </Link>
            </ToolTipComp>
          </div>
          <div className="px-4 flex items-center">
            <ToolTipComp content="Following Pages/People">
              <Link href="/shortsv" className="">
                <Icons.Group className="h-8 w-8 fill-neutral-500 dark:fill-neutral-300" />
              </Link>
            </ToolTipComp>
          </div>
          <div className="px-4 flex items-center">
            <ToolTipComp content="Market">
              <Link href="/shortsv" className="">
                <Icons.Market className="h-8 w-8 fill-neutral-500 dark:fill-neutral-300" />
              </Link>
            </ToolTipComp>
          </div>
        </div>

        {/* notification and profile pic */}
        <div>
          {session ? (
            <div className="flex items-center gap-x-3">
              <Menu />
              <div className=" bg-gray-100 dark:bg-neutral-600 p-2.5 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-500">
                <Icons.Messager className="h-5 w-5 fill-neutral-800" />
              </div>
              <NotificationMenu />
              {/* user profile */}

              <UserAccountNav user={session.user} />
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
