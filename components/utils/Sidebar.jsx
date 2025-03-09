"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "../ui/Button";
import { Separator } from "../ui/Separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  AnotherLinks,
  Resources,
  SideBarExploreLinks,
  SideBarFirstLinks,
  SideBarSecondLinks,
} from "@/constants";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { useTheme } from "next-themes";

const Sidebar = ({ session }) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [toggleScrollBar, setToggleScrollBar] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const handleScrollBar = () => {
    setToggleScrollBar(true);
  };
  const handleMouseLeave = () => {
    setToggleScrollBar(false);
  };

  // Define styles based on the current theme
  const scrollbarThumbStyle = {
    backgroundColor: theme === "dark" ? "#888" : "#ccc", // Adjust colors as needed
    borderRadius: "2px",
  };

  // Function to handle the "See More" button click
  const handleSeeMoreClick = () => {
    setShowAll(!showAll);
  };
  return (
    <div
      className={`sticky top-[7vh]  z-0 px-4 max-h-[93vh] sidebarContainer ${
        toggleScrollBar ? "overflow-auto" : "overflow-hidden"
      }  dark:bg-neutral-900 dark:text-neutral-100`}
      style={{ "--scrollbar-thumb-bg": scrollbarThumbStyle.backgroundColor }}
      onMouseEnter={handleScrollBar}
      onMouseLeave={handleMouseLeave}
    >
      <div className="space-y-2 pt-5">
        {/* different side bar depends if the user is log in or not */}
        {session?.user && (
          <div className="flex items-center gap-x-3 ml-[14px]">
            <div className="border  dark:border-neutral-700 rounded-full">
              <UserAvatar
                className="h-8 w-8"
                user={{
                  name: session?.user.name || null,
                  image: session?.user?.image || null,
                }}
              />
            </div>
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
                  "flex justify-start hover:bg-gray-200 dark:hover:bg-neutral-600 w-full focus:ring-transparent gap-4"
                )}
              >
                <div className="text-gray-500 dark:text-neutral-300">
                  {item.Icon}
                </div>
                <span className="text-[13.5px] text-neutral-800 dark:text-neutral-50 font-light">
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
                    ? "bg-gray-200 dark:bg-neutral-800"
                    : "",
                  "flex justify-start hover:bg-gray-200 dark:hover:bg-neutral-600 py-2 w-full focus:ring-transparent gap-3"
                )}
              >
                <div className="text-gray-500 dark:text-neutral-300">
                  {item.Icon}
                </div>
                <span className="text-sm text-neutral-800 dark:text-neutral-100 font-medium">
                  {item.label}
                </span>
              </Link>
            ))}
      </div>

      <Separator className="my-3 bg-gray-300 dark:bg-neutral-700" />

      {/*  */}
      <>
        <div className="space-y-0 mb-1">
          {AnotherLinks.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.link
                  ? "bg-gray-200 dark:bg-neutral-700 "
                  : "",
                "flex justify-start hover:bg-gray-200 dark:hover:bg-neutral-600  w-full focus:ring-transparent"
              )}
            >
              <div className="text-gray-500 dark:text-neutral-300">
                {item.Icon}
              </div>
              <span className="text-[13px] text-neutral-700 dark:text-neutral-50 dark:font-light">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </>

      <Separator className="my-3 bg-gray-300 dark:bg-neutral-700" />

      {/* Explore */}
      <>
        <h1 className="font-bold text-lg ml-2">Topics</h1>

        <div className="space-y-0 mt-1 mb-2">
          {SideBarExploreLinks.slice(
            0,
            showAll ? SideBarExploreLinks.length : 6
          ).map((item, index) => (
            <Link
              key={index}
              href={`/topic/${item.label}`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.link ? "bg-gray-200 dark:bg-neutral-700" : "",
                "flex justify-start hover:bg-gray-200 dark:hover:bg-neutral-600 py-2 w-full focus:ring-transparent"
              )}
            >
              <div className="text-gray-500 dark:text-neutral-300">
                {item.Icon}
              </div>
              <span className="text-[13px] text-neutral-700 dark:text-neutral-50 dark:font-light">
                {item.label}
              </span>
            </Link>
          ))}

          <button
            onClick={handleSeeMoreClick}
            className="mt-2 p-2 text-neutral-500 dark:text-neutral-50 text-sm font-semibold hover:underline"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      </>

      <Separator className="my-3 bg-gray-300 dark:bg-neutral-700" />

      {/*  */}
      <>
        <h1 className="font-bold text-lg ml-2 text-neutral-800 dark:text-white">
          Resources
        </h1>

        <div className="space-y-0 mt-1 mb-2">
          {Resources.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.link ? "bg-gray-200 dark:bg-neutral-700" : "",
                "flex justify-start hover:bg-gray-200 dark:hover:bg-neutral-600 py-2 w-full focus:ring-transparent"
              )}
            >
              <div className="text-gray-500 dark:text-neutral-300">
                {item.Icon}
              </div>
              <span className="text-[13px]  text-neutral-700 dark:text-neutral-50 dark:font-light">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </>

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
