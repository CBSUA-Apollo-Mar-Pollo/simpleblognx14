"use client";

import { getDominantColor } from "@/actions/getDominantColor";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  CircleEllipsis,
  Dot,
  Lock,
  LucideCircleEllipsis,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import CommunityDropdownInvite from "./community-dropdowns/community-dropdown-invite";
import CommunityDropdownOptions from "./community-dropdowns/community-dropdown-options";

const CommunityBanner = ({ communityDetails, session }) => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const { data: dominantColor, error } = useQuery({
    queryKey: ["dominantColor", communityDetails.banner],
    queryFn: async () => {
      const res = await getDominantColor(communityDetails.banner);
      return res;
    },
  });
  console.log(communityDetails);

  return (
    <div
      className="relative "
      style={{
        backgroundImage:
          resolvedTheme === "light"
            ? `linear-gradient(to bottom,  rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 0.9) 0%, rgba(255, 255, 255, 1) 100%)`
            : `linear-gradient(to bottom, rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 0.3) 0%, rgba(36,36,36, 1) 100%)`,
      }}
    >
      <div
        className={cn("mx-10", {
          "mx-52":
            session === null || session?.user.id !== communityDetails.creatorId,
        })}
      >
        <div className="relative">
          <div>
            {/* if the user has uploaded a cover photo display it */}
            {communityDetails.banner ? (
              <div className="overflow-hidden h-[40vh] rounded-b-xl scroll-container bg-neutral-900 z-20">
                <div className="scroll-container">
                  <Image
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={communityDetails.banner}
                    alt="profile image"
                    referrerPolicy="no-referrer"
                    className="w-[80vw] max-h-fit"
                    // style={{ transform: "translateY()" }} // Adjust the percentage as needed
                  />
                </div>
              </div>
            ) : (
              // show a blank cover photo
              <div className=" rounded-b-3xl scroll-container bg-neutral-400 dark:bg-neutral-800 h-[55vh]">
                <div className="w-[80vw]" />
              </div>
            )}
          </div>

          <div className="mt-9  grid grid-cols-10">
            <div className="col-span-2 relative">
              <div className="absolute -bottom-1 left-[3vw] z-10">
                <div className="relative">
                  <UserAvatar
                    className="h-36 w-36 border-4 border-neutral-50 dark:border-neutral-800"
                    user={{
                      image: communityDetails.icon || null,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="-mt-4 w-full relative flex justify-between z-10 col-span-8 ">
              <div className="-ml-10">
                <h1 className="font-extrabold text-4xl dark:text-white">
                  {communityDetails.name}
                </h1>
              </div>

              <div className="flex items-center gap-x-2 mr-4">
                <CommunityDropdownInvite />
                <Button className="px-5 py-2 rounded-full text-white bg-blue-700">
                  Admin tools
                </Button>
                <CommunityDropdownOptions />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 mx-10">
        <Separator className="bg-neutral-200" />
      </div>

      <ul
        className={cn(
          "flex justify-start text-neutral-800 dark:text-neutral-100 pt-2 gap-x-2 ml-36",
          {
            "ml-60":
              session === null ||
              session?.user.id !== communityDetails.creatorId,
          }
        )}
      >
        {session !== null &&
        session?.user.id === communityDetails.creatorId ? null : (
          <Link
            href={`/communities/${communityDetails.id}/about`}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              `px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold  dark:text-neutral-100  py-5 dark:hover:bg-neutral-700 ${
                pathname === `/communities/${communityDetails.id}/about` &&
                "border-b-4 rounded-none border-blue-600 text-blue-600 dark:text-blue-600 dark:hover:bg-neutral-800 dark:hover:text-blue-700"
              }`
            )}
          >
            About
          </Link>
        )}
        <Link
          href={`/communities/${communityDetails.id}`}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            `px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold  dark:text-neutral-100  py-5 dark:hover:bg-neutral-700 ${
              pathname === `/communities/${communityDetails.id}` &&
              "border-b-4 rounded-none border-blue-600 text-blue-600 dark:text-blue-600 dark:hover:bg-neutral-800 dark:hover:text-blue-700"
            }`
          )}
        >
          Discussion
        </Link>
        {session !== null && (
          <div>
            <Button
              variant="ghost"
              className="px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
            >
              Members
            </Button>
            <Button
              variant="ghost"
              className="px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
            >
              Events
            </Button>
            <Button
              variant="ghost"
              className="px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
            >
              Media
            </Button>
            <Button
              variant="ghost"
              className="px-6 hover:bg-neutral-200 cursor-pointer text-sm font-semibold py-5  dark:text-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
            >
              Files
            </Button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default CommunityBanner;
