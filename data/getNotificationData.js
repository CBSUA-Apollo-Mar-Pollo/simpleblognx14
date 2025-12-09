"use server";

import { db } from "@/lib/db";

export const getNotificationData = async (id) => {
  const data = await db.notification.findMany({
    where: {
      userId: id,
    },
  });

  return data;
};
