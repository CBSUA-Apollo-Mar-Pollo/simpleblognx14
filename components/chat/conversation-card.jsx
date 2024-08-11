"use client";

import Image from "next/image";
import UserAvatar from "../utils/UserAvatar";
import { MoreHorizontal } from "lucide-react";
import { SocketIndicator } from "../socket-indicator";
import ChatWelcome from "./chat-welcome";
import { format } from "date-fns";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";

const ConversationCard = ({
  session,
  userProfile,
  conversationDate,
  conversationId,
  currentUser,
}) => {
  return (
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
                    chatId={conversationId}
                    paramKey="conversationId"
                    paramValue={conversationId}
                    conversationId={conversationId}
                    conversationDate={conversationDate}
                  />

                  {/* input message and buttons */}
                  <ChatInput
                    session={session}
                    conversationId={conversationId}
                    userProfile={userProfile}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConversationCard;
