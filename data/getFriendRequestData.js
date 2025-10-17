"use server";

import { db } from "@/lib/db";

export const getFriendRequestData = async (id) => {
  const data = await db.friendRequestNotification.findFirst({
    where: {
      userId: id,
    },
  });

  if (!data) return null;

  const requesterUserData = await db.user.findFirst({
    where: {
      id: data.requesterUserId,
    },
  });

  if (!requesterUserData) return null;

  const mergedData = {
    ...data,
    requesterUserData,
  };

  return mergedData;
};
