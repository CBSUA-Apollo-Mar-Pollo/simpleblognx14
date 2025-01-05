"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export const getAllFriends = async () => {
  const session = await getAuthSession();
  const currentUserId = session?.user.id;

  const friends = await db.friend.findMany({
    where: {
      OR: [
        {
          userId: currentUserId,
        },
        {
          requesterUserId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
      requesterUser: true,
    },
  });

  return friends
    .map((item) => {
      // Determine whether currentUserId matches `userId` or `requesterUserId`
      if (item.userId === currentUserId) {
        // Return the requesterUser object if currentUserId matches userId
        return item.requesterUser;
      } else if (item.requesterUserId === currentUserId) {
        // Return the user object if currentUserId matches requesterUserId
        return item.user;
      }
      // If neither matches, return null or undefined
      return null;
    })
    .filter(Boolean); // Remove any null or undefined results
};
