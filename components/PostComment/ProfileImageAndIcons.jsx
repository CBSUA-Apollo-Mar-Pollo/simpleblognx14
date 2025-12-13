"use client";

import { Grip } from "lucide-react";
import React from "react";
import { Icons } from "../utils/Icons";
import UserAccountNav from "../utils/UserAccountNav";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import NotificationMenu from "../Notification/NotificationMenu";
import Menu from "../utils/Menu";
import { useSession } from "next-auth/react";

const ProfileImageAndIcons = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-end py-2 pr-4">
      {session ? (
        <div className="flex items-center gap-x-3">
          <Menu contentClassName="-mr-[7vw]" />
          <NotificationMenu />
          <UserAccountNav user={session.user} />
        </div>
      ) : (
        <Link
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-white rounded-full"
          )}
          href="/sign-in"
        >
          Sign in
        </Link>
      )}
    </div>
  );
};

export default ProfileImageAndIcons;
