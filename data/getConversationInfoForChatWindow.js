"use server";

import { db } from "@/lib/db";
import { getOrCreateConversation } from "../actions/conversation";

export const getConversationInfoForChatWindow = async (
  chatId,
  sessionUserId
) => {
  // get conversation information
  const conversation = await getOrCreateConversation(sessionUserId, chatId);

  //   get the user profile of the user who we are conversing to
  const userProfile = await db.user.findFirst({
    where: {
      id: chatId,
    },
  });

  const { userOne, userTwo } = conversation;

  const currentUser = userOne.id === sessionUserId ? userOne : userTwo;

  return { conversation, userProfile, currentUser };
};
