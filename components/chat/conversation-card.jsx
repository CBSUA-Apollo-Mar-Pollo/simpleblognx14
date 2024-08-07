import Image from "next/image";
import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { MoreHorizontal } from "lucide-react";

const ConversationCard = ({ userProfile }) => {
  return (
    <div className="">
      {!userProfile && (
        <div className="flex items-center justify-center h-[95vh]">
          <div className="flex flex-col items-center space-y-4">
            <Image width={480} height={480} src="/conversation.png" />
            <h1 className="text-2xl dark:text-neutral-200 font-medium">
              Click any of your friends to start conversation.
            </h1>
          </div>
        </div>
      )}

      {userProfile && (
        <div className="flex items-center justify-between py-3  px-5 dark:bg-neutral-900 drop-shadow border-b border-neutral-800">
          <div className="flex items-center gap-x-3">
            <UserAvatar
              className="h-12 w-12 "
              user={{
                name: userProfile.name || null,
                image: userProfile.image || null,
              }}
            />

            <h2 className="dark:text-neutral-50 font-semibold text-lg">
              {userProfile.name}
            </h2>
          </div>

          <div>
            <MoreHorizontal className="dark:text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationCard;
