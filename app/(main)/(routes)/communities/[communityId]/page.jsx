import CommunityContent from "@/components/community/community-content/community-content";
import CommunitySideBar from "@/components/community/community-content/community-sidebar";
import { db } from "@/lib/db";
import React from "react";

const CommunityPage = async ({ params }) => {
  const communityDetails = await db.community.findUnique({
    where: {
      id: params.communityId,
    },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
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
      <div className="col-span-2 border-r border-neutral-200">
        <CommunitySideBar />
      </div>
      <div className="col-span-9">
        <CommunityContent {...{ communityDetails }} />
      </div>
    </div>
  );
};

export default CommunityPage;
