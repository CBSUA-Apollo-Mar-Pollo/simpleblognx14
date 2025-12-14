"use server";

import { cache } from "react";
import { db } from "@/lib/db";

export const getProfileData = cache(async (userId) => {
  return db.userProfile.findFirst({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      bio: true,
      image: true,
      user: {
        select: { email: true },
      },
    },
  });
});
