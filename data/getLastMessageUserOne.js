"use server";

import { db } from "@/lib/db";

export const getLastMessageUserOne = async (id, conversationId) => {
  const messages = await db.message.findFirst({
    where: {
      conversationId,
      userId: id,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return messages;
};
