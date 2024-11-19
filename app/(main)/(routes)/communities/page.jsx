import CommunityContent from "@/components/community/community-content";
import useCustomHooks from "@/hooks/use-custom-hooks";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const CommunitiesInitialPage = async () => {
  const session = await getAuthSession();
  const communitiesCreated = await db.community.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

  return <CommunityContent {...{ communitiesCreated }} />;
};

export default CommunitiesInitialPage;
