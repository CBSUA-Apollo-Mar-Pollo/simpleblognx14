"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  Search,
  Shield,
  SquareUserRound,
  User,
  UserCircle,
} from "lucide-react";
import { Input } from "../ui/Input";
import { Separator } from "../ui/Separator";

const NavBarSettings = () => {
  const pathname = usePathname();
  return (
    <div className="overflow-auto sticky top-16 max-h-[90vh]">
      <div className="pt-2 pl-2">
        <h1 className="font-bold text-2xl dark:text-white">Settings</h1>
      </div>

      <div className="relative flex items-center my-4">
        <Search className="absolute left-4 h-4 w-5 text-gray-500 z-20 dark:text-gray-200" />
        <Input
          placeholder="Search settings"
          className="h-9 pl-10 font-light focus-visible:ring-transparent rounded-full text-sm bg-gray-100 dark:border-0 dark:placeholder:text-neutral-200"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <Link
          href="/settings/profile"
          className={cn(
            pathname === "/settings/profile"
              ? "bg-gray-100 dark:bg-neutral-700"
              : "hover:bg-gray-100  hover:dark:bg-neutral-700",
            "pl-3 rounded-md py-3 font-semibold dark:text-neutral-100 flex items-center"
          )}
        >
          <UserCircle className="h-7 w-7 mr-3" />
          Profile details
        </Link>

        <div className="pt-2">
          <Separator className="bg-neutral-600" />
        </div>

        <div>
          <h1 className="font-bold text-lg dark:text-neutral-200 p-1">
            Account settings
          </h1>
          <p className="dark:text-neutral-200 text-xs pl-1">
            Manage your password and personal info.
          </p>
        </div>

        <Link
          href="/settings/account"
          className={cn(
            pathname === "/settings/account"
              ? "bg-gray-100 dark:bg-neutral-700"
              : "hover:bg-gray-100 hover:dark:bg-neutral-700",
            "pl-3 rounded-md py-3 font-semibold dark:text-neutral-100 flex items-center"
          )}
        >
          <Shield className="h-7 w-7 mr-3" />
          Password & Security
        </Link>
        <Link
          href="/settings/account"
          className={cn(
            pathname === "/settings/account"
              ? "bg-gray-100 dark:bg-neutral-700"
              : "hover:bg-gray-100 hover:dark:bg-neutral-700",
            "pl-3 rounded-md py-3 font-semibold dark:text-neutral-100 flex items-center"
          )}
        >
          <div className="relative mr-3">
            <FileText className="h-7 w-7" />
            <User className="h-4 w-4 absolute bottom-0 right-0 bg-neutral-800 rounded-full" />
          </div>
          Personal details
        </Link>

        <div className="py-2">
          <Separator className="bg-neutral-600" />
        </div>
      </div>
    </div>
  );
};

export default NavBarSettings;
