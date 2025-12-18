"use client";

import ChatHomeContactList from "@/components/chat/chat-home-contact-list";
import PopularCommunities from "@/components/community/popular-communities";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { Suspense } from "react";

const HomeRightSidebar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="sticky top-16">
      {/* <RecentPostsCard /> */}

      {status === "unauthenticated" && (
        <Suspense fallback={<div>Loading...</div>}>
          <PopularCommunities />
        </Suspense>
      )}

      {session?.user && (
        <Suspense fallback={<Skeleton className="h-24 w-full" />}>
          <ChatHomeContactList />
        </Suspense>
      )}

      {status === "authenticated" && (
        <div className="mt-2 ml-2">
          <h1 className="font-semibold dark:text-neutral-50">Group chats</h1>

          <Button className="bg-transparent flex items-center justify-start gap-x-3 p-0 pl-2 hover:bg-neutral-200 w-full py-7 my-2 hover:rounded-xl">
            <Plus className="text-black bg-neutral-100 p-2 h-9 w-9 rounded-full" />
            <span className="text-black dark:text-white">
              Create group chat
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomeRightSidebar;
