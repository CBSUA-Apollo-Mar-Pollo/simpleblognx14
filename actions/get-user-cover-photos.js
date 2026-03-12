"use server";

import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getUserCoverPhotos = async (userId) => {
  return await unstable_cache(
    async () => {
      try {
        const coverPhotos = await db.post.findMany({
          where: {
            authorId: userId,
            userStatus: "updated his cover photo",
            trashed: false,
            media: { not: null },
          },
          select: { id: true, description: true, media: true },
        });
        return coverPhotos.flatMap((post) => post.media);
      } catch (error) {
        throw new Error(error);
      }
    },
    [`user-cover-photos-${userId}`], // Cache Key
    {
      revalidate: 3600, // Cache for 1 hour (optional)
      tags: ["cover-photos"], // For manual revalidation
    },
  )();
};
