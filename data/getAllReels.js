"use server";

import { db } from "@/lib/db";

export const getAllReels = async () => {
  const getAllReels = await db.shortsv.findMany({
    include: {
      author: true,
    },
    take: 4,
  });

  return getAllReels;
};
