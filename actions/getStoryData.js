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

  // Group stories by the author's ID and store images as an object
  const groupedStories = stories.reduce((acc, story) => {
    const authorId = story.authorId;

    // Find or create an array for the current author's stories
    const authorGroup = acc.find((group) => group.authorId === authorId);
    if (authorGroup) {
      // If the author's group exists, add the story's image as an object
      authorGroup.images.push({
        img: story.image,
        createdAt: story.createdAt,
      });
    } else {
      // If the author's group does not exist, create a new entry
      acc.push({
        authorId: authorId,
        images: [
          {
            img: story.image,
            createdAt: story.createdAt,
          },
        ],
        author: story.author, // Include the author data
      });
    }

    return acc;
  }, []);

  return groupedStories;
};
