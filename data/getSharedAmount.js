"use server";

import { db } from "@/lib/db";

export const getSharedAmount = async (id) => {
  if (id !== null) {
    const sharedAmount = await db.post.findMany({
      where: {
        sharedPostId: id,
      },
    });

    return sharedAmount.length;
  }

  return null;
};
