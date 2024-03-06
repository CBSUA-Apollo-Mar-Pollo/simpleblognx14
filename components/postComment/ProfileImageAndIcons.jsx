import { Grip } from "lucide-react";
import React from "react";
import { Icons } from "../utils/Icons";
import UserAccountNav from "../utils/UserAccountNav";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import NotificationMenu from "../Notification/NotificationMenu";

const ProfileImageAndIcons = ({ session }) => {
  return (
    <div className="flex justify-end py-2 pr-4">
      {session ? (
        <div className="flex items-center gap-x-3">
          <div className="bg-neutral-200 dark:bg-neutral-600 p-2 rounded-full cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-500">
            <Grip className="text-black dark:text-white" />
          </div>
          {/* notification menu */}
          <NotificationMenu />
          <UserAccountNav user={session.user} />
        </div>
      ) : (
        <Link
          className={cn(buttonVariants({ variant: "secondary" }), "text-white")}
          href="/sign-in"
        >
          Sign in
        </Link>
      )}
    </div>
  );
};

export default ProfileImageAndIcons;
