"use client";

import { getPostVoteDetails } from "@/actions/getPostVoteDetails";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import UserAvatar from "@/components/utils/UserAvatar";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const PostVoteDetails = ({ votesAmt, postId }) => {
  const [activeTab, setActiveTab] = useState(1);

  const { data: votedUsers } = useQuery({
    // Query key (unique identifier)
    queryKey: ["votedetails", postId, activeTab],
    // Query function
    queryFn: async () => {
      const res = await getPostVoteDetails(postId, activeTab);
      return res;
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-center font-semibold  text-neutral-600 px-1 dark:text-neutral-200 hover:underline hover:cursor-pointer">
          {votesAmt}
        </p>
      </DialogTrigger>
      <DialogContent className="p-0 min-w-[30rem] gap-0 bg-neutral-50 dark:bg-neutral-800  border-none dark:text-neutral-50">
        <DialogHeader className="px-4 pt-1 ">
          <DialogTitle className="flex gap-x-2">
            <Button
              variant="ghost"
              onClick={() => setActiveTab(1)}
              className={cn("p-0  rounded-none w-16", {
                "text-blue-700 border-b-[3px] border-blue-500": activeTab === 1,
              })}
            >
              All
            </Button>
            <Button
              onClick={() => setActiveTab(2)}
              variant="ghost"
              className="p-0"
            >
              <ArrowBigUp
                className={cn(
                  "h-10  stroke-[1.6px] text-orange-600 fill-orange-500  p-[5px] w-12",
                  {
                    " border-b-[3px] border-blue-500": activeTab === 2,
                  }
                )}
              />
            </Button>
            <Button
              onClick={() => setActiveTab(3)}
              variant="ghost"
              className="p-0"
            >
              <ArrowBigDown
                className={cn(
                  "h-10  stroke-[1.6px] p-[5px]  text-violet-600 fill-violet-500    w-12",
                  {
                    " border-b-[3px] border-blue-500": activeTab === 3,
                  }
                )}
              />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* list of users who voted the post */}
        <div className="mt-2 mx-4">
          {votedUsers?.map((item, index) => (
            <div key={index} className="flex items-center gap-x-2 ">
              <div className="relative">
                <UserAvatar
                  className="h-9 w-9 m-2"
                  user={{
                    name: item?.user.name || null,
                    image: item?.user.image || null,
                  }}
                />

                {item.type === "UP" && (
                  <ArrowBigUp
                    className={cn(
                      "absolute bottom-[1px] right-0  stroke-[1.6px] text-orange-600 fill-orange-500 rounded-full p-[1px]"
                    )}
                  />
                )}

                {item.type === "DOWN" && (
                  <ArrowBigDown
                    className={cn(
                      "absolute bottom-[1px] right-0  stroke-[1.6px] text-violet-600 fill-violet-500 rounded-full "
                    )}
                  />
                )}
              </div>

              <Link href={`/user/${item.user.id}`} className="hover:underline">
                <p className="font-semibold text-[14px]">{item.user.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostVoteDetails;
