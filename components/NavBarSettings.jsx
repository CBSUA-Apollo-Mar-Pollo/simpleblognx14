"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavBarSettings = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col space-y-2">
      <Link
        href="/settings"
        className={cn(
          pathname === "/settings" ? "bg-gray-100" : "hover:underline",
          "pl-4 rounded py-2 font-medium"
        )}
      >
        Profile
      </Link>
      <Link
        href="/settings/account"
        className={cn(
          pathname === "/settings/account" ? "bg-gray-100" : "hover:underline",
          "pl-4 rounded py-2 font-medium"
        )}
      >
        Account
      </Link>
    </div>
  );
};

export default NavBarSettings;
