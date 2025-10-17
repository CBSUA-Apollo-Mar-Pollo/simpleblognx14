import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import PostCardHeader from "../Post/PostCard/PostCardHeader";
import StandardPostCard from "../Post/PostCard/StandardPostCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "../ui/Separator";
import PostVote from "../PostVote/PostVote";
import PostDescriptionCard from "../PostComment/PostDescriptionCard";
import PostCardShareButton from "../Post/PostCard/PostCardShareButton";
import WatchPageVideoContent from "./watch-page-video-content";
import { Dot, Forward, MessageCircle } from "lucide-react";
import WatchPageVideoVote from "./watch-page-video-vote";
import { getSharedAmount } from "@/data/getSharedAmount";

const WatchPageVideoCard = ({ blog, session, votesAmt, currentVote }) => {
  const [isVideoPaused, setVideoPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  // get shared amount
  const { data: sharedAmount } = useQuery({
    // Query key (unique identifier)
    queryKey: ["sharedAmount", blog.id],
    // Query function
    queryFn: async () => {
      const res = await getSharedAmount(blog.id);
      return res;
    },
  });

  return (
    <Card className=" dark:bg-neutral-800 dark:border-0 dark:text-neutral-200 drop-shadow-sm border border-neutral-200 rounded-xl">
      <CardHeader className="pt-2 pb-1 px-0">
        <PostCardHeader blog={blog} session={session} />
      </CardHeader>

      <CardContent className="p-0">
        {/* post content */}

        {/* // Normal post card component */}
        <WatchPageVideoContent
          blog={blog}
          isVideoPaused={isVideoPaused}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          duration={duration}
          setDuration={setDuration}
          progress={progress}
          setProgress={setProgress}
        />

        <Separator className="dark:bg-neutral-700" />

        {/* home post vote comment and share */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-4 ml-4">
            {/* vote */}
            <WatchPageVideoVote
              postId={blog.id}
              initialVote={currentVote?.type}
              initialVotesAmt={votesAmt}
            />

            <Link
              href={`/postComment/${blog.id}`}
              className="flex items-center gap-2   py-3 rounded cursor-pointer"
            >
              <MessageCircle className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
              <span className=" font-semibold text-xs">Comment</span>
            </Link>

            <div className="flex items-center gap-x-2">
              <Forward className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
              <span className=" font-semibold text-xs">Share</span>
            </div>
          </div>

          <div className="flex items-center justify-end mr-5">
            {/* amount of comments  */}
            {blog.comments.length !== 0 && (
              <div className="py-1  flex items-center justify-end text-xs hover:underline ">
                {blog.comments.length}{" "}
                {blog.comments.length === 1 ? "Comment" : "Comments"}
              </div>
            )}

            {blog.comments.length !== 0 && sharedAmount !== 0 && <Dot />}

            {/* amount of shares  */}
            {sharedAmount !== 0 && (
              <div className="py-1 flex items-center justify-end text-xs">
                {sharedAmount} {sharedAmount === 1 ? "Share" : "Shared"}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WatchPageVideoCard;
