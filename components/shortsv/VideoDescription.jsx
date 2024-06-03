import React from "react";
import UserAvatar from "../utils/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import { Dot, Globe, MessageCircle, MoreHorizontal } from "lucide-react";

const VideoDescription = ({ video, commentAmt, session }) => {
  return (
    <div className="my-2 mx-3">
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center">
          <UserAvatar
            className="h-8 w-8"
            user={{
              handleName: video.author?.handleName,
              bio: video.author?.bio,
              birthdate: video.author?.birthdate,
              name: video.author?.name || null,
              image: video.author?.image || null,
            }}
          />

          <div className="px-2 pt-1 text-white">
            <p className="font-semibold text-sm text-white">
              {video?.author?.name}
            </p>
            <div className="flex items-center">
              <p className=" text-xs text-gray-200 ">
                {formatTimeToNow(new Date(video?.createdAt))}
              </p>
              <Dot className="-mx-1 text-gray-200" />
              <Globe className="h-3 w-3 text-gray-200" />
            </div>
          </div>
        </div>

        {session?.user && (
          <div className="hover:bg-neutral-700 py-2 px-2 rounded-full cursor-pointer">
            <MoreHorizontal className="text-white" />
          </div>
        )}
      </div>

      <div className="text-white my-2 mb-5">
        <p className="text-sm">{video.description}</p>
      </div>

      {commentAmt !== 0 && (
        <div className="flex items-center justify-end gap-x-1 text-neutral-400">
          {commentAmt}
          <MessageCircle className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default VideoDescription;
