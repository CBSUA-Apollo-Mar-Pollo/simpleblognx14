"use server";

import { db } from "@/lib/db";

export const getLastMessageUserTwo = async (id, conversationId) => {
  const messages = await db.message.findFirst({
    where: {
      userId: id,
      conversationId,
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
