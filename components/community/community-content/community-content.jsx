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

const CommunityContent = ({ communityDetails, communityId }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const date = new Date(communityDetails.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <CommunityBanner {...{ communityDetails, session }} />

      <div className="bg-neutral-100">
        {pathname === `/communities/${communityId}/about` ? (
          <div className="flex flex-col items-center justify-center">
            <div className="py-4 w-[40vw]">
              <Card>
                <CardContent>
                  <h2 className="font-semibold mt-4">About this community</h2>

                  <Separator className="mt-2 bg-neutral-300 h-[2px]" />

                  <div className="pt-2">
                    <p className="text-sm dark:text-white">
                      {communityDetails.description}
                    </p>

                    <div className="flex items-start gap-x-3 mt-2">
                      <Lock className="mt-1.5 text-gray-700 h-6 w-6" />
                      <div className="">
                        <h3 className="font-semibold">
                          {communityDetails.visibility}
                        </h3>
                        <span className="text-[13px]">
                          Only members can see who's in the group and what they
                          post.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-x-3 mt-2">
                      <Clock className="mt-1.5 text-gray-700 h-6 w-6" />
                      <div className="">
                        <h3 className="font-semibold">History</h3>
                        <span className="text-[13px]">
                          Community created on {formattedDate}.
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                    className="text-neutral-700 font-semibold gap-x-1"
                  >
                    Popular
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>

                <Separator className="bg-neutral-200" />
              </div>
              {/* todo: user posts */}

              {communityDetails?.posts.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full mt-10">
                  <h2 className="font-bold text-2xl">
                    This community doesn't have any posts yet
                  </h2>
                  <span className="text-neutral-600">
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
              <CommunityDetails {...{ communityDetails }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityContent;
