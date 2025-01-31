"use server";

import { db } from "@/lib/db";

export const getStoryData = async (authorId) => {
  // Fetch the list of friends
  const friends = await db.friend.findMany({
    where: {
      OR: [{ userId: authorId }, { requesterUserId: authorId }],
    },
    include: {
      user: true,
      requesterUser: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Extract userIds and requesterUserIds into a single array of friend IDs
  const friendIds = [
    ...friends.map((friend) => friend.userId),
    ...friends.map((friend) => friend.requesterUserId),
  ];

  // Fetch all stories where the authorId is in the list of friendIds
  const getAllStoryData = await db.story.findMany({
    where: {
      authorId: {
        in: friendIds,
      },
    },
    include: {
      author: true, // Include the author's details if you need
    },
  });

  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Filter objects created within the last 24 hours
  const stories = getAllStoryData.filter(
    (item) => new Date(item.createdAt) >= twentyFourHoursAgo
  );

  // Group stories by the author's image and add images to an array
  const groupedStories = stories.reduce((acc, story) => {
    const authorId = story.authorId;

    // Find or create an array for the current author's image
    const authorGroup = acc.find((group) => group.authorId === authorId);
    if (authorGroup) {
      // If the author's group exists, add the story's image to the image array
      authorGroup.images.push(story.image);
    } else {
      // If the author's group does not exist, create a new entry
      acc.push({
        authorId: authorId,
        images: [story.image], // Initialize with the first image
        author: story.author, // Include the author data
      });
    }

    return acc;
  }, []);

  return groupedStories;
};
