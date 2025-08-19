import CommunityInitialPageExplore from "@/components/community/community-initialpage-explore";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React, { Suspense } from "react";

const LoadingFallback = () => {
  return (
    <div className="w-full h-screen bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
  );
};

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
    <Suspense fallback={<LoadingFallback />}>
      {/* <CommunityInitialPageExplore
        {...{ communitiesCreated, communities, session }}
      /> */}
    </Suspense>
  );
};

export default ExploreCommunitiesPage;
