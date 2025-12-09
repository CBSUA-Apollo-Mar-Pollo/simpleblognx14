"use server";

import { db } from "@/lib/db";

export const getSharedPost = async (id) => {
  if (id !== null) {
    const sharePost = await db.post.findFirst({
      where: {
        id: id,
      },
      include: {
        author: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return sharePost;
  }

  return null;
};
