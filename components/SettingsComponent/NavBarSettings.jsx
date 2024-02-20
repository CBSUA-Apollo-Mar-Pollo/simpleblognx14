"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "../ui/Input";

const NavBarSettings = () => {
  const pathname = usePathname();
  return (
    <div className="overflow-auto sticky top-16 max-h-[90vh]">
      <div className="pt-2">
        <h1 className="font-bold text-2xl">Settings</h1>
      </div>

      <div className="relative flex items-center my-4">
        <Search className="absolute left-4 h-4 w-5 text-gray-500 z-20" />
        <Input
          placeholder="Search settings"
          className="pl-12 focus-visible:ring-transparent rounded-full text-sm bg-gray-100"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Link
          href="/settings"
          className={cn(
            pathname === "/settings" ? "bg-gray-100" : "hover:bg-gray-100",
            "pl-4 rounded-md py-2 font-semibold"
          )}
        >
          Profile
        </Link>
        <Link
          href="/settings/account"
          className={cn(
            pathname === "/settings/account"
              ? "bg-gray-100"
              : "hover:bg-gray-100",
            "pl-4 rounded-md py-2 font-semibold"
          )}
        >
          Account
        </Link>
      </div>
    </div>
  );
};

export default NavBarSettings;
