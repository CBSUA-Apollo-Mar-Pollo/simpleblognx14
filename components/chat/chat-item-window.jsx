"use client";

import React, { useState } from "react";
import UserAvatar from "../utils/UserAvatar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Button } from "../ui/Button";
import { MoreVertical, Reply } from "lucide-react";

const ChatItemWindow = ({
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
  rawTimeStamp,
}) => {
  const { data: session } = useSession();
  const [dataId, setDataId] = useState(null);
  const handleMouseEnter = (id) => {
    setDataId(id);
  };
  const handleMouseLeave = () => {
    setDataId(null);
  };

  return (
    <div className="relative group flex items-center hover:bg-black/5 px-2 py-1 transition w-full">
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

          {/* <span className="text-[11px] text-center text-neutral-700 dark:text-neutral-200 my-2">
            {timeStamp}
          </span> */}

          {/* message content */}
          {session?.user.id === currentUser.id ? (
            <div
              onMouseEnter={() => handleMouseEnter(currentUser.id)}
              onMouseLeave={() => handleMouseLeave()}
              className="flex justify-end gap-x-1"
            >
              <div
                className={cn(
                  dataId === currentUser.id ? "visible" : "invisible",
                  "flex items-center"
                )}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-full"
                >
                  <Reply className="dark:text-neutral-300 w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-full"
                >
                  <MoreVertical className="dark:text-neutral-300 w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-end">
                <p
                  className={cn(
                    "text-[13px] bg-blue-500 text-white py-2 px-4 rounded-3xl "
                  )}
                >
                  {content}
                  {/* {isUpdated && !deleted && (
                  <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                    (edited)
                  </span>
                )} */}
                </p>
              </div>
            </div>
          ) : (
            <div
              onMouseEnter={() => handleMouseEnter(currentUser.id)}
              onMouseLeave={() => handleMouseLeave()}
              className="flex justify-start"
            >
              <div className="flex items-center gap-x-1">
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
                      "text-[13px] bg-neutral-200  py-2 px-4 rounded-3xl dark:bg-neutral-700 dark:text-white "
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

                <div
                  className={cn(
                    dataId === currentUser.id ? "visible" : "invisible",
                    "flex items-center"
                  )}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-full"
                  >
                    <Reply className="dark:text-neutral-300 w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-full"
                  >
                    <MoreVertical className="dark:text-neutral-300 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItemWindow;
