import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import { Avatar } from "./ui/Avatar";
import Image from "next/image";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed inset-x-0 h-fit z-10 bg-white shadow-sm">
      <div className="container max-w-full -full mx-auto px-[40px] flex items-center justify-between gap-2">
        <div className="my-4">
          <Link href="/" className="text-4xl font-bold">
            EStoryaMo
          </Link>
        </div>
        <div>
          {session ? (
            <UserAccountNav user={session.user} />
          ) : (
            // <Avatar>
            //   <div className="h-10 w-10">
            //     <div className="relative aspect-square h-full w-full ">
            //       <Image fill src={session.user.image} alt="profile image" />
            //     </div>
            //   </div>
            // </Avatar>
            <Link
              className={cn(buttonVariants({ variant: "secondary" }))}
              href="/sign-in"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
