"use server";
import { db } from "@/lib/db";

export const trashPost = async (postId, session) => {
  await db.post.update({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
    data: {
      trashed: true,
      trashedAt: new Date(),
    },
  });
};
