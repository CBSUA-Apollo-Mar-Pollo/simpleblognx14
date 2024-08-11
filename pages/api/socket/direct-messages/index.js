import { dbPages } from "@/lib/db-pages";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { content } = req.body;
    const { conversationId, sessionId } = req.query;

    if (!sessionId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!conversationId) {
      return res.status(400).json({ message: "conversation ID missing" });
    }

    if (!content) {
      return res.status(400).json({ message: "Content missing" });
    }

    const conversation = await dbPages.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [
          {
            userOneId: sessionId,
          },
          {
            userTwoId: sessionId,
          },
        ],
      },
      include: {
        userOne: true, // Include userOne details
        userTwo: true, // Include userTwo details
      },
    });

    if (!conversation) {
      return res.status(404).json({ message: "conversation not found" });
    }

    const user =
      conversation.userOne.id === sessionId
        ? conversation.userOne
        : conversation.userTwo;

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const message = await dbPages.message.create({
      data: {
        content,
        conversationId: conversationId,
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    const channelKey = `chat:${conversationId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[DIRECT_MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal error" });
  }
}
