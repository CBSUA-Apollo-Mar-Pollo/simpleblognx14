import { Grip } from "lucide-react";
import React from "react";
import { Icons } from "../Icons";
import UserAccountNav from "../UserAccountNav";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";

const ProfileImageAndIcons = ({ session }) => {
  return (
    <div className="flex justify-end py-2 pr-4">
      {session ? (
        <div className="flex items-center gap-x-3">
          <div className=" bg-zinc-600 p-2 rounded-full cursor-pointer hover:bg-gray-700">
            <Grip className="text-white " />
          </div>
          <div className="bg-zinc-600 p-2 rounded-full cursor-pointer hover:bg-gray-700">
            <Icons.bell className=" text-white " />
          </div>
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
