"use server";

import { db } from "@/lib/db";

export const getReplyName = async (id) => {
  const replyName = await db.user.findFirst({
    where: {
      id: id,
    },
  });

  return replyName;
};
