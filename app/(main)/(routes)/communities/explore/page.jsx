import CommunityInitialPageExplore from "@/components/community/community-initialpage-explore";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

import React from "react";

const ExploreCommunitiesPage = async () => {
  const session = await getAuthSession();
  const communitiesCreated = await db.community.findMany({
    where: {
      creatorId: session.user.id,
    },
    include: {
      posts: true,
    },
  });

  const communities = await db.community.findMany({
    include: {
      members: true,
    },
  });

  return (
    <CommunityInitialPageExplore
      {...{ communitiesCreated, communities, session }}
    />
  );
};

export default ExploreCommunitiesPage;
