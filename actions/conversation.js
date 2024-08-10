import { db } from "@/lib/db";

export const getOrCreateConversation = async (userOneId, userTwoId) => {
  let conversation =
    (await findConversation(userOneId, userTwoId)) ||
    (await findConversation(userTwoId, userOneId));

  if (!conversation) {
    conversation = await createNewConversation(userOneId, userTwoId);
  }

  return conversation;
};

const findConversation = async (userOneId, userTwoId) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ userOneId: userOneId }, { userTwoId: userTwoId }],
      },
      include: {
        userOne: true, // Include userOne details
        userTwo: true, // Include userTwo details
      },
    });
  } catch (error) {
    return null;
  }
};

const createNewConversation = async (userOneId, userTwoId) => {
  try {
    return await db.conversation.create({
      data: {
        userOneId,
        userTwoId,
      },
      include: {
        userOne: true, // Include userOne details
        userTwo: true, // Include userTwo details
      },
    });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return null;
  }
};
