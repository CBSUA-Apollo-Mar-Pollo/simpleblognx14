import ChatSideBar from "@/components/chat/chat-sidebar";
import ConversationCard from "@/components/chat/conversation-card";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const ChatBoxPage = async ({ params }) => {
  const session = await getAuthSession();
  const friendLists = await db.friend.findMany({
    where: {
      OR: [{ userId: session.user.id }, { requesterUserId: session.user.id }],
    },
    include: {
      user: true,
      requesterUser: true,
    },
  });

  const conversation = await db.conversation.findFirst({
    where: {
      OR: [
        {
          userOneId: session?.user.id,
          userTwoId: params.conversationId,
        },
        {
          userTwoId: params.conversationId,
          userOneId: session?.user.id,
        },
      ],
    },
  });

  if (!conversation) {
    await db.conversation.create({
      data: {
        userOneId: session.user.id,
        userTwoId: params.conversationId,
      },
    });
  }

  const userProfile = await db.user.findFirst({
    where: {
      id: params.conversationId,
    },
  });

  return (
    <div className="grid grid-cols-8 h-screen dark:bg-neutral-900">
      <div className=" col-span-2 border-r border-neutral-300 dark:border-neutral-800">
        <ChatSideBar friendLists={friendLists} session={session} />
      </div>
      <div className="col-span-6 ">
        <ConversationCard userProfile={userProfile} />
      </div>
    </div>
  );
};

export default ChatBoxPage;
