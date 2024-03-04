"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const clearRecentPosts = async () => {
  const session = await getAuthSession();
  await db.RecentPosts.deleteMany({
    where: {
      authorId: session.user.id,
    },
  });
};
