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

    const friendsWithConversations = await Promise.all(
      friends.map(async (friend, index) => {
        const conversation = await db.conversation.findFirst({
          where: {
            OR: [
              {
                userOneId: id,
                userTwoId:
                  id === friend.user.id
                    ? friend.requesterUser.id
                    : friend.user.id,
              },
              {
                userOneId:
                  id === friend.user.id
                    ? friend.requesterUser.id
                    : friend.user.id,
                userTwoId: id,
              },
            ],
          },
        });

        let lastMessage = null;
        if (conversation) {
          lastMessage = await db.message.findMany({
            where: {
              conversationId: conversation.id,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          });

          // Assign the first message if it exists
          lastMessage = lastMessage.length > 0 ? lastMessage[0] : null;
        }

        return {
          ...friend,
          lastMessage,
        };
      })
    );

    return friendsWithConversations; // Return combined data
  }

  return null;
};
