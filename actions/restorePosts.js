"use server";

import { db } from "@/lib/db";

export const restorePosts = async (ids) => {
  try {
    const idArray = ids.map((item) => item.postId);
    await db.blog.updateMany({
      where: {
        id: {
          in: idArray,
        },
      },
      data: {
        trashed: false,
      },
    });
  } catch (error) {
    console.error("Error deleting record:", error);
  }
};
