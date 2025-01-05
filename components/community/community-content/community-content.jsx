"use client";

import React from "react";
import CommunityBanner from "./community-banner";
import { Separator } from "@/components/ui/Separator";
import { Button } from "@/components/ui/Button";
import {
  CakeSlice,
  ChevronDown,
  Clock,
  Lock,
  Pencil,
  Plus,
} from "lucide-react";
import CommunityCreatePostModal from "./communtiy-create-post-modal";
import CommunityDetails from "./community-details";
import CommunityPosts from "./community-posts";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Icons } from "@/components/utils/Icons";

const CommunityContent = ({ communityDetails, communityId }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const date = new Date(communityDetails.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  console.log(communityDetails, "communityDetails");

  return (
    <div>
      <CommunityBanner {...{ communityDetails, session }} />

      <div className="bg-neutral-100 dark:bg-neutral-900">
        {/* about page */}
        {pathname === `/communities/${communityId}/about` ? (
          <div className="flex flex-col items-center justify-center">
            <div className="py-4 w-[40vw]">
              <Card>
                <CardContent>
                  <h2 className="font-semibold mt-4 text-xl">
                    About this community
                  </h2>

                  <Separator className="mt-2 bg-neutral-300 h-[2px]" />

                  <div className="pt-2">
                    <p className="text-sm dark:text-white">
                      {communityDetails.description}
                    </p>

                    <div className="flex items-start gap-x-3 mt-2">
                      <Lock className="mt-1.5 text-gray-700 h-6 w-6" />
                      <div className="relative">
                        <h3 className="font-semibold">
                          {communityDetails.visibility}
                        </h3>
                        <p className="text-[13px] -mt-0.5">
                          Only members can see who's in the group and what they
                          post.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-x-3 mt-2">
                      <Clock className="mt-1.5 text-gray-700 h-6 w-6" />
                      <div className="">
                        <h3 className="font-semibold">History</h3>
                        <p className="text-[13px] -mt-0.5">
                          Community created on {formattedDate}.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : !session?.user.id ||
          communityDetails.members.some(
            (member) => member.userId !== session?.user.id
          ) ? (
          <div className="grid grid-cols-8 pt-8">
            <div className="col-span-5 mb-4 ml-64 mr-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Icons.LockPrivate className="fill-violet-600 h-36 w-36" />

                  <div className="">
                    <h2 className="text-center font-bold text-2xl text-neutral-700">
                      This group is private
                    </h2>

                    <span className="text-neutral-600">
                      Join this community to view or participate in discussions.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* community info */}
            <div className="col-span-3 mb-4 mr-20 ml-8">
              <CommunityDetails {...{ communityDetails, session }} />
            </div>
          </div>
        ) : (
          <div
            className={cn("grid grid-cols-8 pt-4", {
              "ml-72 mr-32":
                session === null ||
                session?.user.id !== communityDetails.creatorId,
            })}
          >
            <div
              className={cn("col-span-5 mb-4 ml-20 mr-12", {
                "ml-14 mr-10":
                  session === null ||
                  session?.user.id !== communityDetails.creatorId,
              })}
            >
              {/* Create post modal */}
              <CommunityCreatePostModal
                session={session}
                communityId={communityDetails?.id}
              />

              <div className="ml-16 mt-1">
                <div className="mb-1">
                  <Button
                    variant="ghost"
                    className="text-neutral-700 dark:text-neutral-100 font-semibold gap-x-1"
                  >
                    Popular
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>

                <Separator className="bg-neutral-200 dark:bg-neutral-800" />
              </div>
              {/* todo: user posts */}

              {communityDetails?.posts.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full mt-10">
                  <h2 className="font-bold text-2xl dark:text-white">
                    This community doesn't have any posts yet
                  </h2>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    make one and get this feed started.
                  </span>
                </div>
              )}

              <div className="ml-16 mt-5">
                <CommunityPosts
                  initialPosts={communityDetails?.posts}
                  session={session}
                  communityId={communityDetails?.id}
                />
              </div>
            </div>

            {/* community info */}
            <div className="col-span-3 mb-4">
              <CommunityDetails {...{ communityDetails, session }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityContent;
