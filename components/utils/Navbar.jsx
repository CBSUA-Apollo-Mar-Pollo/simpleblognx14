import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { Input } from "../ui/Input";
import {
  Album,
  Bell,
  Gamepad2,
  Grip,
  Headphones,
  History,
  Home,
  Newspaper,
  Play,
  PlayCircle,
  Search,
} from "lucide-react";
import { Icons } from "./Icons";
import NotificationMenu from "../Notification/NotificationMenu";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="sticky top-0 inset-x-0 h-fit z-20 bg-white shadow-sm ">
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
              className="pl-12 focus-visible:ring-transparent border border-gray-300 rounded-full w-[250px] text-sm"
            />
          </div>
        </div>

        <div className="flex space-x-28 mr-[12rem] text-neutral-600">
          <Home />
          <PlayCircle />
          <Gamepad2 />
          <Newspaper />
          <History />
        </div>

        {/* notification and profile pic */}
        <div>
          {session ? (
            <div className="flex items-center gap-x-3">
              <div className=" bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200">
                <Grip className="text-gray-500 " />
              </div>
              <NotificationMenu />
              {/* user profile */}
              <UserAccountNav user={session.user} />
            </div>
          ) : (
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
