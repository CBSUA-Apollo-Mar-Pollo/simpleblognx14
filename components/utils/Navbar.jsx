import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { Input } from "../ui/Input";
import {
  Bookmark,
  Gamepad2,
  Grip,
  History,
  Home,
  PlayCircle,
  Search,
} from "lucide-react";
import NotificationMenu from "../Notification/NotificationMenu";
import ToolTipComp from "./ToolTipComp";
import Image from "next/image";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="sticky top-0 inset-x-0 h-fit z-20 bg-white dark:bg-zinc-800 shadow-sm">
      <div className="container max-w-full h-full mx-auto px-[30px] flex items-center justify-between gap-2">
        {/* logo and search bar  */}
        <div className="flex items-center gap-x-2 my-2">
          <Link href="/" className="font-bold">
            <span className=" px-3.5 rounded-full bg-yellow-400 text-3xl ">
              E
            </span>
          </Link>
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
            <Input
              placeholder="Search Posts"
              className="pl-12 focus-visible:ring-transparent  border-gray-300 dark:border-0 dark:border-neutral-500 font-light rounded-full w-[250px] text-sm "
            />
          </div>
        </div>

        <div className="flex space-x-16 mr-[12rem] text-neutral-600 dark:text-neutral-300">
          <span className="px-4 border-b-4 border-blue-500">
            <ToolTipComp content="Home">
              <Home className=" h-10 w-10 py-2 fill-blue-600 stroke-blue-600 cursor-pointer" />
            </ToolTipComp>
          </span>
          <span className="px-4 flex items-center">
            <ToolTipComp content="Videos">
              <Link href="/shortsv" className="">
                <Image
                  sizes="100vw"
                  src={"/ImageIcons/play.png"}
                  width="0"
                  height="0"
                  className="w-7 h-7"
                />
              </Link>
            </ToolTipComp>
          </span>
          <span className="px-4 flex items-center">
            <ToolTipComp content="Gaming">
              <Image
                sizes="100vw"
                src={"/ImageIcons/console.png"}
                width="0"
                height="0"
                className="w-8 h-8"
              />
            </ToolTipComp>
          </span>
          <span className="px-4 flex items-center">
            <ToolTipComp content="Following Pages/People">
              <Image
                sizes="100vw"
                src={"/ImageIcons/followColored.png"}
                width="0"
                height="0"
                className="w-8 h-8"
              />
            </ToolTipComp>
          </span>
          <span className="px-4 flex items-center">
            <ToolTipComp content="Groups">
              <Image
                sizes="100vw"
                src={"/ImageIcons/group.png"}
                width="0"
                height="0"
                className="w-8 h-8"
              />
            </ToolTipComp>
          </span>
        </div>

        {/* notification and profile pic */}
        <div>
          {session ? (
            <div className="flex items-center gap-x-3">
              <ToolTipComp content="Menu">
                <div className=" bg-gray-100 dark:bg-neutral-600 p-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-500">
                  <Grip className="text-neutral-800 dark:text-neutral-100" />
                </div>
              </ToolTipComp>
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
