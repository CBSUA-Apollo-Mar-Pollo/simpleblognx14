"use server";

import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getUserPhotos = async (userId) => {
  return await unstable_cache(
    async () => {
      try {
        const posts = await db.post.findMany({
          where: {
            authorId: userId,
            trashed: false,
            media: { not: null },
          },
          select: {
            userStatus: true,
            media: true,
          },
        });

        const coverPhotos = [];
        const profilePhotos = [];
        const photos = [];

        for (const post of posts) {
          const filteredMedia = (post.media ?? []).filter(
            (m) => m.type !== "gif",
          );

          if (post.userStatus === "updated his cover photo") {
            coverPhotos.push(...filteredMedia);
          } else if (post.userStatus === "updated his profile picture") {
            profilePhotos.push(...filteredMedia);
          } else {
            photos.push(...filteredMedia);
          }
        }

        return [
          { "Cover photos": coverPhotos },
          { "Profile pictures": profilePhotos },
          { photos },
        ];
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    },
    [`user-photos-${userId}`],
    {
      revalidate: 3600,
      tags: ["photos"],
    },
  )();
};
