import React from "react";
import CommunityBanner from "./community-banner";
import { getAuthSession } from "@/lib/auth";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";
import { Button } from "@/components/ui/Button";
import { CakeSlice, ChevronDown, Lock, Pencil, Plus } from "lucide-react";
import CommunityCreatePostModal from "./communtiy-create-post-modal";
import CommunityDetails from "./community-details";
import CommunityPosts from "./community-posts";

const CommunityContent = async ({ communityDetails }) => {
  const session = await getAuthSession();

  return (
    <div>
      <CommunityBanner {...{ communityDetails, session }} />

      <div className="bg-neutral-100">
        <div className="grid grid-cols-8 pt-4 gap-x-2 ml-16">
          <div className="col-span-5 mb-4 mr-14">
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
      </div>
    </div>
  );
};

export default CommunityContent;
