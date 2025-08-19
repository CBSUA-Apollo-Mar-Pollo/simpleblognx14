import ChatSideBar from "@/components/chat/chat-sidebar";
import ConversationCard from "@/components/chat/conversation-card";
import SocketTestComponent from "@/components/socket-test-component";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const ChatBoxPage = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  const friendLists = await db.friend.findMany({
    where: {
      OR: [{ userId: session.user.id }, { requesterUserId: session.user.id }],
    },
    include: {
      user: true,
      requesterUser: true,
    },
  });

  if (friendLists[0].requesterUser.id === session.user.id) {
    redirect(`/chatbox/${friendLists[0].user.id}`);
  } else {
    redirect(`/chatbox/${friendLists[0].requesterUser.id}`);
  }

  return (
    <div className="grid grid-cols-8 h-screen">
      <div className=" col-span-2 border-r border-neutral-300 dark:border-neutral-700">
        <ChatSideBar friendLists={friendLists} session={session} />
      </div>
      <div className="col-span-6 ">
        <ConversationCard />
        <SocketTestComponent />
      </div>
    </div>
  );
};

export default ChatBoxPage;
