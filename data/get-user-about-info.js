"use server";

import { db } from "@/lib/db";

export const getUserAboutInfo = async (user) => {
  const data = await db.profileAboutInfo.findFirst({
    where: {
      userId: user.id,
    },
  });

  return data;
};
