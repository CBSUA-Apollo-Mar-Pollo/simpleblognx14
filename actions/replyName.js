"use server";

import { db } from "@/lib/db";

export const getReplyName = async (id) => {
  if (id !== null) {
    var replyName = await db.user.findFirst({
      where: {
        id: id,
      },
    });

    return replyName;
  }

  return null;
};
