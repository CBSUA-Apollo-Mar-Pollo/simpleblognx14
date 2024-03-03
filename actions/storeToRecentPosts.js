"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const storeToRecentPosts = async (postId) => {
  const session = await getAuthSession();
  await db.RecentPosts.create({
    data: {
      postId,
      authorId: session?.user.id,
    },
  });
};
