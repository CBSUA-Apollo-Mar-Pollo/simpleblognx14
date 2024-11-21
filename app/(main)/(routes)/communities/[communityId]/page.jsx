import CommunityContent from "@/components/community/community-content/community-content";
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

  return <CommunityContent {...{ communityDetails }} />;
};

export default CommunityPage;
