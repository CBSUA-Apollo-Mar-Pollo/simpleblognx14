"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  CreditCard,
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
                ? "bg-gray-100 dark:bg-neutral-700"
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
                ? "bg-gray-100 dark:bg-neutral-700"
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
                ? "bg-gray-100 dark:bg-neutral-700"
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
            href="/settings/account/paymentinfo"
            className={cn(
              pathname === "/settings/account/paymentinfo"
                ? "bg-gray-100 dark:bg-neutral-700"
                : "hover:bg-gray-100 hover:dark:bg-neutral-700",
              "pl-3 rounded-md py-3 font-semibold text-neutral-800 dark:text-neutral-100 flex items-center text-sm"
            )}
          >
            <CreditCard className="h-6 w-6 mr-3" />
            Payment details & methods
          </Link>
        </div>

        <div className="py-2">
          <Separator className="bg-neutral-600" />
        </div>
      </div>
    </div>
  );
};

export default NavBarSettings;
