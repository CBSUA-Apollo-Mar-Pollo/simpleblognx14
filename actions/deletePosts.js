"use server";

import { db } from "@/lib/db";
import { UTApi } from "uploadthing/server";

export const deletePosts = async (ids) => {
  try {
    const idArray = ids.map((item) => item.postId);
    await db.blog.deleteMany({
      where: {
        id: {
          in: idArray,
        },
      },
    });
    const utapi = new UTApi();
    const allImagesKeys = ids.flatMap((item) =>
      item.imageInfo ? item.imageInfo.map((image) => image.key) : []
    );

    await utapi.deleteFiles(allImagesKeys);
  } catch (error) {
    console.error("Error deleting record:", error);
  }
};
