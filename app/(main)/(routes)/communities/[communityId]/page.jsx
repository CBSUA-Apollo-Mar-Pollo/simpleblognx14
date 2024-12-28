import CommunityContent from "@/components/community/community-content/community-content";
import CommunitySideBar from "@/components/community/community-content/community-sidebar";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
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
    <div className="grid grid-cols-11">
      <div className="col-span-2 border-r border-neutral-200 relative">
        <CommunitySideBar {...{ communityDetails }} />
      </div>
      <div className="col-span-9">
        <CommunityContent {...{ communityDetails }} />
      </div>
    </div>
  );
};

export default CommunityPage;
