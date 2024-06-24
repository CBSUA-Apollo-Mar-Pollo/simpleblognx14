"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "../ui/Button";
import { Separator } from "../ui/Separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SideBarExploreLinks,
  SideBarFirstLinks,
  SideBarSecondLinks,
} from "@/constants";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

const Sidebar = ({ session }) => {
  const pathname = usePathname();
  const [toggleScrollBar, setToggleScrollBar] = useState(false);
  const handleScrollBar = () => {
    setToggleScrollBar(true);
  };
  const handleMouseLeave = () => {
    setToggleScrollBar(false);
  };
  return (
    <div
      className={`sticky top-[7vh] w-[22vw] h-screen z-0 px-4 max-h-[93vh] sidebarContainer ${
        toggleScrollBar ? "overflow-auto" : "overflow-hidden"
      }  dark:bg-neutral-900 dark:text-neutral-100`}
      onMouseEnter={handleScrollBar}
      onMouseLeave={handleMouseLeave}
    >
      <div className="space-y-2 pt-5">
        {/* different side bar depends if the user is log in or not */}
        {session?.user && (
          <div className="flex items-center gap-x-3 ml-[15px]">
            <UserAvatar
              className="h-9 w-9 "
              user={{
                name: session?.user.name || null,
                image: session?.user?.image || null,
              }}
            />
            <span className="text-neutral-900 dark:text-neutral-300 text-sm font-semibold">
              {session?.user.name}
            </span>
          </div>
        )}

        {session?.user
          ? SideBarFirstLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.link
                    ? "bg-gray-200 dark:bg-neutral-700"
                    : "",
                  "flex justify-start hover:bg-gray-200 dark:hover:bg-neutral-600 py-2 w-full focus:ring-transparent gap-5"
                )}
              >
                <div className="text-gray-500 dark:text-neutral-300">
                  {item.Icon}
                </div>
                <span className="text-sm text-gray-600 dark:text-neutral-300 font-semibold">
                  {item.label}
                </span>
              </Link>
            ))
          : SideBarSecondLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.link
                    ? "bg-gray-200 dark:bg-neutral-700"
                    : "",
                  "flex justify-start hover:bg-gray-200 dark:hover:bg-neutral-600 py-2 w-full focus:ring-transparent gap-5"
                )}
              >
                <div className="text-gray-500 dark:text-neutral-300">
                  {item.Icon}
                </div>
                <span className="text-sm text-gray-600 dark:text-neutral-300 font-semibold">
                  {item.label}
                </span>
              </Link>
            ))}
      </div>
      <Separator className="my-3 bg-gray-300 dark:bg-neutral-600" />

      {/* Explore */}
      <h1 className="font-bold text-2xl ml-2">Explore</h1>

      <div className="space-y-2 mt-2 mb-2">
        {SideBarExploreLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.link ? "bg-gray-200 dark:bg-neutral-700" : "",
              "flex justify-start hover:bg-gray-200 dark:hover:bg-neutral-600 py-2 w-full focus:ring-transparent gap-5"
            )}
          >
            <div className="text-gray-500 dark:text-neutral-300">
              {item.Icon}
            </div>
            <span className="text-sm text-gray-600 dark:text-neutral-300 font-semibold">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      <span
        className="text-xs font-medium mt-7 text-slate-600 dark:text-neutral-400
      "
      >
        EStoryamo, Inc,&#169; 2024, All rights reserved.
      </span>
    </div>
  );
};

export default Sidebar;
