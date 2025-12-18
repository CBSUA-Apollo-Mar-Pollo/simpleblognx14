"use server";

import { db } from "@/lib/db";

export const getPopularCommunities = async () => {
  const communities = await db.community.findMany({
    include: { members: { select: { userId: true } } },
  });

  return communities;
};
