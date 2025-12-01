"use client";

import { useSession } from "next-auth/react";
import React, { Suspense } from "react";
import Sidebar from "./Sidebar";
import { ChevronDown, Home, Plus } from "lucide-react";
import { Icons } from "./Icons";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import AddPostModal from "../Post/AddPostModal";
import AddGalleryPostModal from "../Post/AddImagePostModal";
import { Separator } from "../ui/Separator";
import Image from "next/image";
import HomePageStoryCards from "../stories/homepage-story-cards";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import Posts from "../Post/Posts";
import PopularCommunities from "../community/popular-communities";
import ChatHomeContactList from "../chat/chat-home-contact-list";
import { Button } from "../ui/Button";
import { useQuery } from "@tanstack/react-query";
import { getContactList } from "@/data/getContactList";
import { Skeleton } from "../ui/Skeleton";

const HomePageLayout = ({ sortedData, deleteImage, communities }) => {
  const { data: session } = useSession();

  const { data: conversationList, isPending } = useQuery({
    queryKey: ["contactlist", session?.user?.id],
    queryFn: async () => {
      const res = await getContactList(session);
      return res;
    },
    enabled: !!session?.user,
    staleTime: 60 * 1000, // 1 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className="grid  xl:grid-cols-12 lg:grid-cols-7 grid-cols-1 dark:bg-neutral-900">
      {/* first column the side bar */}
      <div className="  xl:col-span-3 xl:block hidden relative border-r border-neutral-300 dark:border-neutral-800 mr-[5vw] ">
        <Sidebar />
      </div>

      {/* middle section all posts and adding posts */}
      <div className=" xl:col-span-6 lg:col-span-5  lg:pl-5 lg:pr-3 xl:bg-white  xl:dark:bg-neutral-900 bg-gray-300">
        <div className="xl:mt-5 2xl:mx-[5vw] xl:mx-[4vw]">
          {/*  ----------------------------------- show in mobile ------------------------------------------------ */}
          <div className="xl:hidden ">
            <div className="xl:bg-neutral-200 xl:dark:bg-neutral-900 bg-white dark:bg-neutral-800 xl:border-none border-b grid grid-cols-5">
              <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
                <Home className="  h-6 w-6 dark:text-neutral-100 text-neutral-700" />
              </div>
              <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
                <Icons.Play className="fill-neutral-600 dark:fill-neutral-300 h-7 w-7 " />
              </div>
              <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
                <Icons.Group className="fill-neutral-600 dark:fill-neutral-300 h-7 w-7 " />
              </div>
              <div className="flex items-center justify-center border-r dark:border-neutral-700 py-2.5">
                <Icons.Messager className="h-5 w-5 fill-neutral-600 dark:fill-neutral-50" />
              </div>
              <div className="flex items-center justify-center  py-3">
                <Icons.bell className="fill-neutral-600 dark:fill-neutral-300 dark:text-neutral-50 text-neutral-600 h-6 w-6 " />
              </div>
            </div>
          </div>

          {session?.user && (
            <>
              <div className=" lg:pt-3 lg:pb-1 lg:px-5 lg:rounded-lg rounded-none bg-white border-t border-neutral-200 dark:bg-neutral-800 drop-shadow dark:border-0">
                <div className="flex flex-row items-center lg:space-x-4 gap-x-2 lg:px-0 lg:py-0 px-2 py-3">
                  <Link href={`/user/${session?.user.id}`}>
                    <UserAvatar
                      className="h-10 w-10 "
                      user={{
                        name: session?.user.name || null,
                        image: session?.user.image || null,
                      }}
                    />
                  </Link>
                  <AddPostModal />
                  <div className="lg:hidden block">
                    <AddGalleryPostModal />
                  </div>
                </div>

                <Separator className="mt-3 dark:bg-neutral-700 lg:block hidden" />

                <div className="lg:flex items-center justify-center my-1 hidden">
                  <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
                    <Image
                      src="/ImageIcons/live.png"
                      className="h-8 w-8"
                      alt="Live video icon"
                      width={32}
                      height={32}
                    />
                    <span className="dark:text-neutral-100 text-sm">
                      Live video
                    </span>
                  </div>
                  <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
                    <AddGalleryPostModal session={session} />
                  </div>
                  <div className="flex flex-1 items-center justify-center space-x-3 py-2 dark:hover:bg-neutral-700 rounded-md">
                    <Image
                      width={28}
                      height={28}
                      src="/ImageIcons/smile.png"
                      className="h-7 w-7"
                      alt="Feeling or activity icon"
                    />
                    <span className="dark:text-neutral-100 text-sm">
                      Feeling/Activity
                    </span>
                  </div>
                </div>
              </div>

              <HomePageStoryCards session={session} />
            </>
          )}

          {!session?.user && (
            <DropdownMenu className="dark:border-none">
              <DropdownMenuTrigger className="flex items-center gap-x-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-3 py-2 rounded-full">
                <span className="text-xs font-medium text-neutral-700 dark:text-white">
                  Best
                </span>
                <ChevronDown className="h-3 w-3 dark:text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[5vw] space-y-2 p-0 pb-2 dark:bg-neutral-800 dark:border-none">
                <div className="px-3 pt-2">
                  <p className="text-[13px] dark:text-white">Sort by</p>
                </div>
                <DropdownMenuItem className="px-3 cursor-pointer">
                  <span className="dark:text-white">Best</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 cursor-pointer">
                  <span className="dark:text-white">Hot</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 cursor-pointer">
                  <span className="dark:text-white">New</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 cursor-pointer">
                  <span className="dark:text-white">Top</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 cursor-pointer">
                  <span className="dark:text-white">Rising</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!session?.user && <Separator className="mb-4 mt-1 bg-neutral-300" />}

          {/* all post cards */}
          <Suspense fallback={<Skeleton className="h-48 w-full" />}>
            <Posts initialPosts={sortedData} deleteImage={deleteImage} />
          </Suspense>
        </div>
      </div>
      {/* third section recent posts and who to follow */}
      <div className="   lg:flex lg:col-span-3 hidden relative  flex-col border-l border-neutral-300 dark:border-neutral-800 px-2 ml-[5vw]">
        <div className="sticky top-16">
          {/* <RecentPostsCard /> */}

          {!session?.user && <PopularCommunities communities={communities} />}

          {session?.user && (
            <Suspense fallback={<Skeleton className="h-24 w-full" />}>
              <ChatHomeContactList
                conversationList={conversationList}
                session={session}
                isPending={isPending}
              />
            </Suspense>
          )}

          {session?.user && (
            <>
              <Separator className="my-2" />

              <div className="mt-2 ml-2">
                <h1 className="font-semibold dark:text-neutral-50">
                  Group chats
                </h1>

                <Button className="bg-transparent flex items-center justify-start gap-x-3 p-0 pl-2 hover:bg-neutral-200 w-full py-7 my-2">
                  <Plus className="text-black bg-neutral-100 p-2 h-9 w-9 rounded-full" />
                  <span className="text-black dark:text-white">
                    Create group chat
                  </span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageLayout;
