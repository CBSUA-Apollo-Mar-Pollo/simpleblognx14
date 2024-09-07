import React, { Fragment, useRef } from "react";
import { format, isToday, isSameDay, startOfDay } from "date-fns";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { Loader2, ServerCrash } from "lucide-react";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import ChatWelcome from "./chat-welcome";
import ChatItemWindow from "./chat-item-window";

const DATE_FORMAT = "MMMM d, yyyy"; // Full date format
const TIME_FORMAT = "h:mm a"; // Time format

const ChatWindowMessages = ({
  userProfile,
  chatId,
  paramKey,
  paramValue,
  conversationId,
  currentUser,
  conversationDate,
  apiUrl,
}) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;

  let socketUrl = "/api/socket/direct-messages";

  const chatRef = useRef(null);
  const bottomRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  useChatSocket({ queryKey, addKey });

  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  function formatDate(isoString) {
    const date = new Date(isoString);
    if (isToday(date)) {
      return format(date, TIME_FORMAT);
    } else {
      return format(date, DATE_FORMAT);
    }
  }

  function isDifferentDay(currentDate, previousDate) {
    return !isSameDay(currentDate, previousDate);
  }

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong
        </p>
      </div>
    );
  }

  let lastDate = null;

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 max-h-[75vh]">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && (
        <ChatWelcome
          userProfile={userProfile}
          date={formatDate(conversationDate)}
        />
      )}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message) => {
              const messageDate = new Date(message.createdAt);
              const shouldShowDate = isDifferentDay(messageDate, lastDate);
              lastDate = messageDate;

              return (
                <Fragment key={message.id}>
                  <ChatItemWindow
                    currentUser={message.user}
                    id={message.id}
                    content={message.content}
                    deleted={message.deleted}
                    rawTimeStamp={message.createdAt}
                    timeStamp={formatDate(message.createdAt)}
                    isUpdated={message.updatedAt !== message.createdAt}
                    socketUrl={socketUrl}
                    socketQuery={conversationId}
                  />
                  {shouldShowDate && (
                    <span className="text-[11px] text-center text-neutral-700 dark:text-neutral-200 my-2">
                      {formatDate(message.createdAt)}
                    </span>
                  )}
                </Fragment>
              );
            })}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindowMessages;
