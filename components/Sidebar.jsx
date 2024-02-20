"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/Button";
import { Separator } from "./ui/Separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SideBarExploreLinks,
  SideBarFirstLinks,
  SideBarSecondLinks,
} from "@/constants";
import Link from "next/link";

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
      className={`sticky top-16 w-[22vw] h-screen z-10 shadow-sm px-4 max-h-[90vh] ${
        toggleScrollBar ? "overflow-auto" : "overflow-hidden"
      } bg-white`}
      onMouseEnter={handleScrollBar}
      onMouseLeave={handleMouseLeave}
    >
      <div className="space-y-2 pt-5">
        {/* different side bar depends if the user is log in or not */}
        {session?.user
          ? SideBarFirstLinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.link ? "bg-gray-200" : "",
                  "flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent gap-5"
                )}
              >
                {item.Icon} {/* icon */}
                <span className="text-sm text-gray-600 font-semibold">
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
                  pathname === item.link ? "bg-gray-200" : "",
                  "flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent gap-5"
                )}
              >
                {item.Icon} {/* icon */}
                <span className="text-sm text-gray-600 font-semibold">
                  {item.label}
                </span>
              </Link>
            ))}
      </div>
      <Separator className="my-3 bg-gray-300" />

      {/* Explore */}
      <h1 className="font-bold text-2xl ml-2">Explore</h1>

      <div className="space-y-2 mt-2 mb-2">
        {SideBarExploreLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.link ? "bg-gray-200" : "",
              "flex justify-start hover:bg-gray-200 py-2 w-full focus:ring-transparent gap-5"
            )}
          >
            {item.Icon}
            <span className="text-sm text-gray-600 font-semibold">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      <span
        className="text-xs font-medium mt-7 text-slate-600
      "
      >
        EStoryamo, Inc,&#169; 2024, All rights reserved.
      </span>
    </div>
  );
};

export default Sidebar;
