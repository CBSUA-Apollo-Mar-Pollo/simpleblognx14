"use server";

import { db } from "@/lib/db";

export const deletePosts = async (ids) => {
  try {
    await db.blog.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  } catch (error) {
    console.error("Error deleting record:", error);
  }
};
