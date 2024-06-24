"use server";

import { db } from "@/lib/db";

export const getFriendsList = async (id) => {
  if (id !== null) {
    const friends = await db.friend.findMany({
      where: {
        OR: [{ userId: id }, { requesterUserId: id }],
      },
      include: {
        user: true,
        requesterUser: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return friends;
  }

  return null;
};
