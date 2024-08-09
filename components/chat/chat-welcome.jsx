"use client";

import { Hash } from "lucide-react";
import UserAvatar from "../utils/UserAvatar";

const ChatWelcome = ({ userProfile, date }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 mb-4">
      <div className="flex flex-col items-center space-y-2">
        <UserAvatar
          className="h-20 w-20"
          user={{
            name: userProfile.name || null,
            image: userProfile.image || null,
          }}
        />
        <span className="text-lg font-semibold text-neutral-900/90">
          {userProfile.name}
        </span>
      </div>
      <div className="space-y-2 px-4 mb-4">
        <p className="text-zinc-600 dark:text-zinc-400 text-xs font-medium">
          {`This is the start of your conversation with ${userProfile.name}`}
        </p>
      </div>

      <span className="text-xs font-semibold text-neutral-700">{date}</span>
    </div>
  );
};

export default ChatWelcome;
