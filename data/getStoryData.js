"use server";

import { db } from "@/lib/db";

export const getStoryData = async (authorId) => {
  // Calculate 24-hour boundary once and query by it to avoid extra JS filtering
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Fetch the list of friends but only return the user id fields to minimize payload
  const friends = await db.friend.findMany({
    where: {
      OR: [{ userId: authorId }, { requesterUserId: authorId }],
    },
    select: {
      userId: true,
      requesterUserId: true,
    },
  });

  // Collect friend IDs and deduplicate (include authorId in case original behavior relies on it)
  const friendIdsSet = new Set();
  if (friends && friends.length > 0) {
    for (const fr of friends) {
      if (fr.userId) friendIdsSet.add(fr.userId);
      if (fr.requesterUserId) friendIdsSet.add(fr.requesterUserId);
    }
  }

  const targetAuthorIds =
    friendIdsSet.size > 0 ? Array.from(friendIdsSet) : [authorId];

  // Fetch only stories from target authors created in the last 24 hours
  const getAllStoryData = await db.story.findMany({
    where: {
      authorId: { in: targetAuthorIds },
      createdAt: { gte: twentyFourHoursAgo },
    },
    include: {
      author: true,
    },
  });

  if (!getAllStoryData || getAllStoryData.length === 0) return [];

  // Use a Map to group stories by authorId in a single pass O(n)
  const groupedMap = new Map();

  for (const story of getAllStoryData) {
    const aid = story.authorId;
    if (!groupedMap.has(aid)) {
      groupedMap.set(aid, {
        id: story.id,
        authorId: aid,
        images: [],
        author: story.author,
      });
    }

    const group = groupedMap.get(aid);
    group.images.push({ img: story.image, createdAt: story.createdAt });
  }

  return Array.from(groupedMap.values());
};
