"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const checkIfIsAFriend = async (id) => {
  const session = await getAuthSession();
  const currentUserId = session?.user.id;

  // Check if a friendship record exists where either `userId` or `requesterUserId` is the current user,
  // and the other ID matches the provided `id`.
  const isAFriend = await db.friend.findFirst({
    where: {
      OR: [
        {
          userId: currentUserId,
          requesterUserId: id,
        },
        {
          userId: id,
          requesterUserId: currentUserId,
        },
      ],
    },
  });

  if (isAFriend) {
    // Handle the case where the friendship record is found.
    if (isAFriend.isRequestAccepted === "onhold") {
      return "onhold";
    } else {
      return isAFriend.isRequestAccepted === "true";
    }
  } else {
    // No friendship record found.
    return false;
  }
};
