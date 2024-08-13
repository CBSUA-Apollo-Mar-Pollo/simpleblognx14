import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const ChatItem = ({
  currentUser,
  id,
  content,
  member,
  timeStamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}) => {
  const { data: session } = useSession();
  return (
    <div className="relative group flex items-center hover:bg-black/5 px-5 py-1 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        {/* <div className="cursor-pointer hover:drop-shadow-md transition">
        
        </div> */}
        <div className="flex flex-col w-full">
          {/* <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">
                {currentUser.name}
              </p>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timeStamp}
            </span>
          </div> */}

          {/* message content */}
          {session?.user.id === currentUser.id ? (
            <div className="flex justify-end">
              <p
                className={cn(
                  "text-sm  dark:text-zinc-300 bg-blue-500 text-white py-2 px-3 rounded-full max-w-[50vw]"
                )}
              >
                {content}
                {isUpdated && !deleted && (
                  <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                    (edited)
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className="flex justify-start">
              <div className="flex items-end">
                <UserAvatar
                  className="h-6 w-6 mb-1 mr-2"
                  user={{
                    name: currentUser.name || null,
                    image: currentUser.image || null,
                  }}
                />
                <p
                  className={cn(
                    "text-sm bg-neutral-200  py-2 px-3 rounded-full "
                  )}
                >
                  {content}
                  {isUpdated && !deleted && (
                    <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                      (edited)
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
