"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowDownUp,
  Bell,
  Book,
  BookOpen,
  CopyPlus,
  CreditCard,
  Database,
  FileText,
  GalleryVertical,
  Globe,
  Hand,
  HeartHandshake,
  List,
  Lock,
  Moon,
  PersonStanding,
  PlaySquare,
  Search,
  Settings,
  Shield,
  SquareUserRound,
  Tag,
  User,
  UserCircle,
  UserRoundX,
  UserSearch,
} from "lucide-react";
import { Input } from "../ui/Input";
import { Separator } from "../ui/Separator";
import { Icons } from "../utils/Icons";

const SideBarSettings = () => {
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
      className={cn(
        "sticky top-[7vh] max-h-[90vh] sidebarContainer pr-4",
        toggleScrollBar ? "overflow-auto" : "overflow-hidden"
      )}
      onMouseEnter={handleScrollBar}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pt-2 pl-2">
        <h1 className="font-bold text-2xl dark:text-white">
          Settings & Privacy
        </h1>
      </div>

      <div className="relative flex items-center my-4">
        <Search className="absolute left-4 h-4 w-5 text-gray-500 z-20 dark:text-gray-200" />
        <Input
          placeholder="Search settings"
          className="h-9 pl-10 font-light focus-visible:ring-transparent rounded-full text-sm bg-gray-100 dark:border-0 dark:placeholder:text-neutral-200"
        />
      </div>

      <div className="relative h-full">
        <div>
          <div className="flex flex-col space-y-1">
            <Link
              href="/settings/profile"
              className={cn(
                pathname === "/settings/profile"
                  ? "bg-gray-100 dark:bg-neutral-700"
                  : "hover:bg-gray-100  hover:dark:bg-neutral-700",
                " pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-200 flex items-center"
              )}
            >
              <UserCircle className="h-6 w-6 mr-3" />
              Profile details
            </Link>

            <div className="pt-2">
              <Separator className="bg-neutral-300 dark:bg-neutral-600" />
            </div>

            {/* ---------------- ACCOUNT SETTINGS -------------- */}

            <>
              <div>
                <h1 className="font-bold text-lg text-neutral-700 dark:text-neutral-200 p-1">
                  Account settings
                </h1>
                <p className="text-neutral-700 dark:text-neutral-200 text-xs pl-1">
                  Manage your password and personal info.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <Shield className="h-6 w-6 mr-3" />
                  Password & Security
                </Link>
                <Link
                  href="/settings/account/details"
                  className={cn(
                    pathname === "/settings/account/details"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <SquareUserRound className="h-6 w-6 mr-3" />
                  Personal details
                </Link>
                <Link
                  href="/settings/account/info&permissions"
                  className={cn(
                    pathname === "/settings/account/info&permissions"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <div className="relative mr-3">
                    <FileText className="h-6 w-6" />
                    <User className="h-3 w-3 absolute bottom-0 right-0 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                  </div>
                  Information and Permission
                </Link>
                <Link
                  href="/settings/account/info&permissions"
                  className={cn(
                    pathname === "/settings/account/info&permissions"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <Settings className="h-6 w-6 mr-3" />
                  Default audience settings
                </Link>
              </div>
            </>

            <div className="py-2">
              <Separator className="bg-neutral-300 dark:bg-neutral-600" />
            </div>

            {/* ------------------------------- USER PREFERENCE ------------------------ */}
            <>
              <div>
                <h1 className="font-bold text-lg text-neutral-700 dark:text-neutral-200 p-1">
                  Preferences
                </h1>
                <p className="text-neutral-700 dark:text-neutral-200 text-xs pl-1">
                  Customize your experience.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <Bell className="h-6 w-6 mr-3" />
                  Notifications
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <PersonStanding className="h-6 w-6 mr-3 border rounded-full" />
                  Accessibility
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <Globe className="h-6 w-6 mr-3" />
                  Language and Region
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <PlaySquare className="h-6 w-6 mr-3" />
                  Media
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <Moon className="h-6 w-6 mr-3" />
                  Dark Mode
                </Link>
              </div>
            </>

            <div className="py-2">
              <Separator className="bg-neutral-300 dark:bg-neutral-600" />
            </div>

            {/* ------------------------------- AUDIENCE AND VISIBILITY  ------------------------ */}
            <>
              <div>
                <h1 className="font-bold text-lg text-neutral-700 dark:text-neutral-200 p-1">
                  Audience and visibility
                </h1>
                <p className="text-neutral-700 dark:text-neutral-200 text-xs pl-1">
                  Control who can see and what you share.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <Lock className="h-6 w-6 mr-3" />
                  Profile locking
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <UserSearch className="h-6 w-6 mr-3" />
                  How People find and contact you
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <GalleryVertical className="h-6 w-6 mr-3" />
                  Posts
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <BookOpen className="h-6 w-6 mr-3" />
                  Stories
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-2 rounded-md py-2 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <Icons.reelsIcon className="h-8 w-8 mr-2 dark:fill-white" />
                  Reels
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <CopyPlus className="h-6 w-6 mr-3" />
                  Followers and public content
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <Tag className="h-6 w-6 mr-3" />
                  Profile and tagging
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <UserRoundX className="h-6 w-6 mr-3" />
                  User blocking
                </Link>
              </div>
            </>

            <div className="py-2">
              <Separator className="bg-neutral-300 dark:bg-neutral-600" />
            </div>

            {/* ------------------------------- USER ACTIVITY ------------------------ */}
            <>
              <div>
                <h1 className="font-bold text-lg text-neutral-700 dark:text-neutral-200 p-1">
                  Your activity
                </h1>
                <p className="text-neutral-700 dark:text-neutral-200 text-xs pl-1">
                  Review your activity and content you&apos;re tagged in.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <List className="h-6 w-6 mr-3" />
                  Activity log
                </Link>
              </div>
            </>

            <div className="py-2">
              <Separator className="bg-neutral-300 dark:bg-neutral-600" />
            </div>

            {/* ------------------------------- COMMUNITY STANDARDS AND LEGAL POLICIES ------------------------ */}
            <>
              <div>
                <h1 className="font-bold text-lg text-neutral-700 dark:text-neutral-200 p-1">
                  Community Standards and legal policies
                </h1>
              </div>

              <div className="">
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <Book className="h-6 w-6 mr-3" />
                  Terms of Services
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <Database className="h-6 w-6 mr-3" />
                  Privacy policy
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <ArrowDownUp className="h-6 w-6 mr-3" />
                  Cookies policy
                </Link>
                <Link
                  href="/settings/account/pass&sec"
                  className={cn(
                    pathname === "/settings/account/pass&sec"
                      ? "bg-gray-200 dark:bg-neutral-700"
                      : "hover:bg-gray-100 hover:dark:bg-neutral-700",
                    "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
                  )}
                >
                  <HeartHandshake className="h-6 w-6 mr-3" />
                  Community standards
                </Link>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarSettings;
