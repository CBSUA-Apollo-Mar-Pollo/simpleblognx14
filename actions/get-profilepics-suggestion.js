"use server";

import { db } from "@/lib/db";

export const getProfilePicsSuggestion = async (userId) => {
  console.log(userId, "user id");
  try {
    const photos = await db.post.findMany({
      where: {
        authorId: userId,
        image: {
          not: null,
        },
      },
      select: {
        id: true,
        image: true,
        userStatus: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return photos;
  } catch (error) {
    return "Could not get user photos, please try again later";
  }
};
