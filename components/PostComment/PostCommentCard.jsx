"use client";

import { Separator } from "../ui/Separator";
import ProfileImageAndIcons from "./ProfileImageAndIcons";
import PostDescription from "./PostDescription";
import VoteCommentAndShare from "./VoteCommentAndShare";
import CommentSection from "./CommentSection";

import BackgroundImagePost from "./BackgroundImagePost";
import ImagePost from "./ImagePost";
import { useEffect, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFullScreenImage } from "@/hooks/use-fullscreen-image";

const PostCommentCard = ({ post, index, session, comments }) => {
  const { isFullScreen, setFullScreen } = useFullScreenImage();

  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const votesAmt = post.votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1;
    if (vote.type === "DOWN") return acc - 1;
    return acc;
  }, 0);

  const currentVote = post.votes.find(
    (vote) => vote.userId === session?.user.id
  );

  return (
    <div className="grid grid-cols-4 relative">
      {/* Image */}
      <div
        className={cn(
          isFullScreen ? "col-span-3 " : "col-span-4",
          "flex h-screen justify-center items-center relative bg-black"
        )}
      >
        {post.userStatus === "updated his cover photo" ? (
          <BackgroundImagePost
            image={post.image}
            index={index}
            postId={post.id}
            setToggleExpand={setFullScreen}
          />
        ) : (
          <ImagePost
            image={post.image}
            index={index}
            postId={post.id}
            setToggleExpand={setFullScreen}
          />
        )}
      </div>

      {isFullScreen && (
        <div className="col-span-1 dark:bg-neutral-800 max-h-full relative">
          <ProfileImageAndIcons session={session} />

          <Separator className="bg-neutral-200 dark:bg-neutral-700" />

          <div
            className={` overflow-auto max-h-[100vh] ${
              session?.user ? "pb-[22vh]" : "pb-[10vh]"
            }`}
          >
            <PostDescription
              post={post}
              index={index}
              commentAmt={comments.length}
              session={session}
            />

            <Separator className="bg-neutral-300 dark:bg-neutral-700" />

            <VoteCommentAndShare
              postId={post.id}
              initialVote={currentVote?.type}
              initialVotesAmt={votesAmt}
            />

            <Separator className="bg-neutral-300 dark:bg-neutral-700" />

            <CommentSection
              session={session}
              post={post}
              initialComments={comments}
              imageIndex={index}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCommentCard;
