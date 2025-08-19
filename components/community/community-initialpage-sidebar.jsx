"use client";

import { AppWindow, Compass, Settings, UsersRound } from "lucide-react";
import React, { Suspense } from "react";
import { Separator } from "../ui/Separator";
import Image from "next/image";
import CreateCommunityModal from "./create-community-modal/modal";
import Link from "next/link";
import moment from "moment";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const CommunityInitialPageSideBar = ({ communitiesCreated }) => {
  const pathname = usePathname();
  return (
    <div className="border-r border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800 min-h-screen pb-4">
      <div className="pt-2">
        <div className="flex items-center justify-between px-3 p-2">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">
            Communities
          </h1>
          <Settings className="dark:text-white" />
        </div>

        <div className="mx-3 my-1">
          <Suspense
            fallback={
              <div className="h-10 w-full bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded-lg" />
            }
          >
            <CreateCommunityModal />
          </Suspense>
        </div>

        <div className="px-3 mt-3 space-y-1">
          <Link
            href="/communities"
            className={cn(
              "flex items-center gap-x-3 hover:bg-neutral-200 dark:hover:bg-neutral-700 py-2 pl-2 rounded-xl cursor-pointer",
              {
                "bg-neutral-200 dark:bg-neutral-700":
                  pathname === "/communities",
              }
            )}
          >
            <AppWindow
              className={cn(
                "bg-neutral-100 dark:bg-neutral-700 p-2 h-9 w-9 rounded-full text-neutral-800 dark:text-white",
                {
                  "dark:fill-blue-500 dark:bg-blue-500":
                    pathname === "/communities",
                }
              )}
            />
            <p className="font-medium text-[14px] dark:text-white">
              Community feed
            </p>
          </Link>
          <Link
            href="/communities/explore"
            className={cn(
              "flex items-center gap-x-3 hover:bg-neutral-200 dark:hover:bg-neutral-700 py-2 pl-2 rounded-xl cursor-pointer",
              {
                "dark:bg-neutral-700": pathname === "/communities/explore",
              }
            )}
          >
            <Compass
              className={cn(
                "bg-neutral-100 dark:bg-neutral-700 p-1.5 h-9 w-9 rounded-full text-neutral-800 dark:text-white",
                {
                  "fill-blue-500 dark:bg-blue-500":
                    pathname === "/communities/explore",
                }
              )}
            />
            <p className="font-medium text-[14px] dark:text-white">Explore</p>
          </Link>
          <Link
            href="/communities/joined"
            className={cn(
              "flex items-center gap-x-3 hover:bg-neutral-200 dark:hover:bg-neutral-700 py-2 pl-2 rounded-xl cursor-pointer",
              {
                "dark:bg-neutral-700": pathname === "/communities/joined",
              }
            )}
          >
            <UsersRound
              className={cn(
                "bg-neutral-100 dark:bg-neutral-700 p-2 h-9 w-9 rounded-full text-neutral-800 dark:text-white",
                {
                  "fill-blue-500 dark:bg-blue-500":
                    pathname === "/communities/joined",
                }
              )}
            />
            <p className="font-medium text-[14px] dark:text-white">
              Your Communities
            </p>
          </Link>
        </div>

        {communitiesCreated.length !== 0 && (
          <>
            <div className="mx-3">
              <Separator className="my-3 bg-gray-300 dark:bg-neutral-700" />
            </div>

            <div className="mx-3">
              <h1 className=" text-neutral-800 font-bold dark:text-white">
                Communities you&apos;ve created
              </h1>

              <div className="mt-2">
                {communitiesCreated.map((community, index) => (
                  <Link
                    key={index}
                    href={`/communities/${community.id}`}
                    className="flex items-center gap-x-3 hover:bg-neutral-200 pl-2 rounded-lg"
                  >
                    <img
                      src={community.icon}
                      alt="Preview"
                      className="my-2 rounded-full h-14 w-14"
                    />

                    <div className="flex flex-col">
                      <p className="font-bold text-neutral-700 dark:text-white">
                        {community.name}
                      </p>
                      <span className="text-[12px] text-neutral-700 dark:text-white">
                        Last active{" "}
                        {community.posts.length === 0
                          ? moment(community.createdAt).fromNow()
                          : moment(community.posts[0].createdA).fromNow()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mx-3">
          <Separator className="my-3 bg-gray-300 dark:bg-neutral-700" />
        </div>

        <div className="mx-3">
          <h1 className=" text-neutral-800 font-bold dark:text-white">
            Communities you&apos;ve joined
          </h1>
        </div>

        {/* render when user is not yet a part of any community */}
        <div className="flex flex-col items-center mt-4">
          <Image
            src="/creativity.png"
            width={800}
            height={800}
            className="h-72 w-72 rounded-3xl"
          />
          <p className="mt-3 text-sm mx-10 text-justify dark:text-white ">
            `&quot;Ready to make a difference? Join or start a community that
            inspires and empowers`&quot;.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityInitialPageSideBar;
