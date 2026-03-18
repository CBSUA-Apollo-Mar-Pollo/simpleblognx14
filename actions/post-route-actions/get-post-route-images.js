"use server";

import { db } from "@/lib/db";

export const getPostRouteImages = async (postId) => {
  const media = await db.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      description: true,
      media: true,
      createdAt: true,
      userStatus: true,

      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  if (!media) return null;

  return media;
};
