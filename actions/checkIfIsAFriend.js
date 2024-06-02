"use server";

import { db } from "@/lib/db";

export const checkIfIsAFriend = async (id) => {
  const isAFriend = await db.friend.findFirst({
    where: {
      OR: [{ userId: id }, { requesterUserId: id }],
    },
  });

  if (isAFriend?.isRequestAccepted === "onhold") {
    return "onhold";
  } else {
    return isAFriend?.isRequestAccepted ? true : false;
  }
};
