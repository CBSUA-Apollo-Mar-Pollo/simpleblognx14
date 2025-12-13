"use server";

import { db } from "@/lib/db";

export const getPostRouteImages = async (postId) => {
  const images = await db.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      description: true,
      image: true,
      video: true,
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

  if (!images) return null;

  return images;
};
