import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { Input } from "./ui/Input";
import { Bell, Search } from "lucide-react";
import { Icons } from "./Icons";

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
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20" />
          <Input
            placeholder="Search Posts"
            className="pl-12 focus-visible:ring-transparent rounded-full w-[500px] text-sm"
          />
        </div>
        <div>
          {session ? (
            <div className="flex items-center">
              <div className="mr-4 bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200">
                <Icons.bell className="text-gray-500 " />
              </div>
              <UserAccountNav user={session.user} />
            </div>
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
