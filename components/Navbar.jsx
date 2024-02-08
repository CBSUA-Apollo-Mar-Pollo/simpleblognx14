import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { Input } from "./ui/Input";
import { Bell, Grip, Search } from "lucide-react";
import { Icons } from "./Icons";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed top-0 inset-x-0 h-fit z-20 bg-white shadow-sm ">
      <div className="container max-w-full h-full mx-auto px-[30px] flex items-center justify-between gap-2">
        {/* logo and search bar  */}
        <div className="my-2.5 flex items-center gap-x-2">
          <Link href="/" className="font-bold">
            <span className=" px-3.5 rounded-full bg-yellow-400 text-3xl">
              E
            </span>
          </Link>
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-6 w-5 text-gray-500 z-20" />
            <Input
              placeholder="Search Posts"
              className="pl-12 focus-visible:ring-transparent border border-gray-300 rounded-full w-[270px] text-sm"
            />
          </div>
        </div>

        {/* notification and profile pic */}
        <div>
          {session ? (
            <div className="flex items-center gap-x-3">
              <div className=" bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200">
                <Grip className="text-gray-500 " />
              </div>
              <div className="bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200">
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
