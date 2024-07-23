import Image from "next/image";
import React from "react";

const ConversationCard = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center h-[95vh]">
        <div className="flex flex-col items-center space-y-4">
          <Image width={480} height={480} src="/conversation.jpg" />
          <h1 className="text-2xl font-medium">
            Click any of your friends to start conversation.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
