import CommunityContent from "@/components/community/community-content/community-content";
import CommunitySideBar from "@/components/community/community-content/community-sidebar";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

const CommunityPage = async ({ params }) => {
  const session = await getAuthSession();
  const communityDetails = await db.community.findUnique({
    where: {
      id: params.communityId,
    },
    include: {
      posts: {
        include: {
          author: true,
          comments: true,
          votes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
      members: {
        include: {
          user: true,
        },
      },
      shortsv: true,
    },
  });

  return (
    <div className={cn("grid grid-cols-11")}>
      {session?.user.id && session?.user.id === communityDetails.creatorId && (
        <div className="col-span-2 border-r border-neutral-200 dark:border-neutral-800 relative">
          <CommunitySideBar {...{ communityDetails }} />
        </div>
      )}

      <div
        className={cn("col-span-9", {
          "col-span-11":
            !session?.user.id ||
            session?.user.id !== communityDetails.creatorId,
        })}
      >
        <CommunityContent {...{ communityDetails }} />
      </div>
    </div>
  );
};

export default CommunityPage;
