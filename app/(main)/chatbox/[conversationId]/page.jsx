import { getOrCreateConversation } from "@/actions/conversation";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import ChatSideBar from "@/components/chat/chat-sidebar";
import { SocketIndicator } from "@/components/socket-indicator";
import UserAvatar from "@/components/utils/UserAvatar";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

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

  const conversation = await getOrCreateConversation(
    session?.user.id,
    params.conversationId
  );

  const userProfile = await db.user.findFirst({
    where: {
      id: params.conversationId,
    },
  });

  const { userOne, userTwo } = conversation;

  const currentUser = userOne.id === session?.user.id ? userOne : userTwo;

  // console.log(otherMember, "otherMember");

  return (
    <div className="h-full m-0">
      <div className="h-full grid grid-cols-8 dark:bg-neutral-900">
        <div className="col-span-2 border-r border-neutral-300 dark:border-neutral-800 h-full">
          <ChatSideBar friendLists={friendLists} session={session} />
        </div>
        <div className="col-span-6">
          {/* chat message */}
          <div className="flex flex-col h-full">
            {/* Conditional content for when userProfile is not available */}
            {!userProfile && (
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <Image width={480} height={480} src="/conversation.png" />
                  <h1 className="text-2xl dark:text-neutral-200 font-medium">
                    Click any of your friends to start a conversation.
                  </h1>
                </div>
              </div>
            )}

            {/* Conditional content for when userProfile is available */}
            {userProfile && (
              <>
                <div className="flex items-center justify-between py-2 px-5 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-800">
                  <div className="flex items-center gap-x-3">
                    <UserAvatar
                      className="h-12 w-12"
                      user={{
                        name: userProfile.name || null,
                        image: userProfile.image || null,
                      }}
                    />
                    <h2 className="dark:text-neutral-50 font-semibold text-lg">
                      {userProfile.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <SocketIndicator />
                    <MoreHorizontal className="dark:text-white" />
                  </div>
                </div>

                <div className="flex-1 max-h-[82vh] overflow-y-auto">
                  <div className="flex  h-full">
                    <div className="flex-1 flex  justify-center items-end ">
                      <div className="flex flex-col w-full">
                        {/* messages output */}
                        <ChatMessages
                          currentUser={currentUser}
                          userProfile={userProfile}
                          chatId={conversation.id}
                          paramKey="conversationId"
                          paramValue={conversation.id}
                          conversationId={conversation.id}
                          conversationDate={conversation?.createdAt}
                          apiUrl="/api/direct-messages"
                        />

                        {/* input message and buttons */}
                        <ChatInput
                          session={session}
                          conversationId={conversation.id}
                          userProfile={userProfile}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxPage;
