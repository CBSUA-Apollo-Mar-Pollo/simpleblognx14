"use server";

import { db } from "@/lib/db";

export async function removeCoverPhoto(userProfileId) {
  await db.userProfile.update({
    where: { id: userProfileId },
    data: {
      backgroundImage: null,
    },
  });
}
