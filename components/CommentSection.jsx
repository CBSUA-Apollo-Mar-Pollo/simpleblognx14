import React from "react";
import UserAvatar from "./UserAvatar";
import { Textarea } from "./ui/Textarea";
import { SendHorizonal } from "lucide-react";

const CommentSection = ({ session }) => {
  return (
    <div className="flex gap-x-4 mx-4 my-4">
      <UserAvatar
        className="h-10 w-10 "
        user={{
          name: session.user?.name || null,
          image: session.user?.image || null,
        }}
      />
      <div className="relative">
        <div className="absolute bottom-0 right-0 hover:bg-neutral-700 rounded-full cursor-pointer">
          <SendHorizonal className="mx-3 my-2 p-0.5 text-neutral-300" />
        </div>
        <Textarea
          className="bg-neutral-600 border-transparent focus:border-transparent placeholder:text-neutral-300 text-white focus:ring-0 w-72 border border-neutral-600 focus-visible:border-neutral-600 resize-none"
          placeholder="write an answer..."
        />
      </div>
    </div>
  );
};

export default CommentSection;
