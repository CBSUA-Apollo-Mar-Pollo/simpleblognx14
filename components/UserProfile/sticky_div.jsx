"use client";

import { useState, useEffect, useRef } from "react";
import ProfileButtons from "./ProfileSection/ProfileButtons";
import UserAvatar from "../utils/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import {
  Archive,
  BadgeCheck,
  Eye,
  History,
  List,
  Lock,
  MoreHorizontal,
  PlusCircle,
  Search,
  Shield,
  Trash2,
  Triangle,
  UserCog,
} from "lucide-react";
import { useSession } from "next-auth/react";
import PageProfileButtons from "./ProfileSection/page-profile-buttons";

const StickDiv = ({ user }) => {
  const { data: session } = useSession();
  const useDetectSticky = (ref, observerSettings = { threshold: [1] }) => {
    const [isSticky, setIsSticky] = useState(false);
    const newRef = useRef();
    ref ||= newRef;

    // mount
    useEffect(() => {
      const cachedRef = ref.current,
        observer = new IntersectionObserver(
          ([e]) => setIsSticky(e.intersectionRatio < 1),
          observerSettings
        );

      observer.observe(cachedRef);

      // unmount
      return () => {
        observer.unobserve(cachedRef);
      };
    }, []);

    return [isSticky, ref, setIsSticky];
  };

  const [isSticky, ref, setIsSticky] = useDetectSticky();

  return (
    <div
      ref={ref}
      className={`${
        isSticky ? "dark:bg-neutral-700" : "dark:bg-neutral-800 "
      } sticky top-[-1px] z-20   bg-white  w-full`}
    >
      {session?.user.type === "user" && <ProfileButtons userId={user.id} />}

      {session?.user.type === "page" && <PageProfileButtons userId={user.id} />}

      <div
        className={`${
          isSticky ? "block" : "hidden"
        } py-3 flex items-center justify-between bg-white drop-shadow-md`}
      >
        <div className="flex items-center gap-x-3  pl-[14vw]">
          <UserAvatar
            className="h-10 w-10 "
            user={{
              name: user.name || null,
              image: user.image || null,
            }}
          />
          <p className="font-semibold dark:text-white">{user.name}</p>
        </div>

        <div className="ml-2 mr-[14vw]">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="bg-neutral-200 rounded-md mt-1 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-600 ">
              <div className="px-2 py-1">
                <MoreHorizontal className="dark:text-white" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="bottom"
              sideOffset={8}
              className="p-0  xl:min-w-[15vw]  rounded-lg"
            >
              {session?.user.id === user.id ? (
                <div className="  space-y-0.5    dark:bg-neutral-800 p-3">
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                    <Eye className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">View As</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                    <Search className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">Search</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                    <Shield className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">Profile Status</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/allactivity/archive")}
                    className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600"
                  >
                    <Archive className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">Post Archive</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                    <History className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">Story archive</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/allactivity/trash")}
                    className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600"
                  >
                    <Trash2 className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">Trash</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                    <List className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">Activity Log</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                    <UserCog className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">
                      Profile and Tagging settings
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                    <Lock className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">Lock Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                    <PlusCircle className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">
                      Create another profile
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-white flex-row items-center gap-x-4 dark:hover:bg-neutral-600">
                    <BadgeCheck className="h-6 w-6 text-neutral-800 dark:text-neutral-100" />
                    <span className="font-semibold">Estorya verified</span>
                  </DropdownMenuItem>
                </div>
              ) : (
                <>
                  <DropdownMenuItem className="cursor-pointer dark:text-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-100">
                    Follow
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-100">
                    Find Suppport or report
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer dark:text-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-100">
                    Block
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default StickDiv;
