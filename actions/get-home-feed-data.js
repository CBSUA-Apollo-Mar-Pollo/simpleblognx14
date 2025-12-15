"use server";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import { cache } from "react";

export const getHomeFeedData = cache(async () => {
  const [posts, shortVideos] = await Promise.all([
    db.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            handleName: true,
            image: true,
            bio: true,
            birthdate: true,
          },
        },
        comments: { select: { id: true } },
        votes: { select: { userId: true, type: true } },
        community: { include: { members: { select: { userId: true } } } },
      },
      orderBy: { createdAt: "desc" },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    }),

    db.shortsv.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            handleName: true,
            image: true,
            bio: true,
            birthdate: true,
          },
        },
        comments: { select: { id: true } },
        shortsvVotes: { select: { userId: true, type: true } },
      },
      orderBy: { createdAt: "desc" },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    }),
  ]);

  const updatedShortVideos = shortVideos.map((item) => ({
    ...item,
    isShortsV: true,
  }));

  const normalizedPosts = posts.map((p) => ({
    ...p,
    createdAtMs: new Date(p.createdAt).getTime(),
  }));
  const normalizedShorts = updatedShortVideos.map((p) => ({
    ...p,
    createdAtMs: new Date(p.createdAt).getTime(),
  }));
  const mergeData = [...normalizedPosts, ...normalizedShorts];

  const sortedData = mergeData.sort((a, b) => b.createdAtMs - a.createdAtMs);

  return sortedData;
});
