import Image from "next/image";

const ConversationCard = ({ userProfile }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Conditional content for when userProfile is not available */}
      {!userProfile && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Image
              width={480}
              height={480}
              src="/conversation.png"
              alt="Conversation"
            />
            <h1 className="text-2xl dark:text-neutral-200 font-medium">
              Click any of your friends to start a conversation.
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationCard;
