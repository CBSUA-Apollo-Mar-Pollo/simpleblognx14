import React from "react";
import ProfileImageAndIcons from "../ProfileImageAndIcons";
import { Separator } from "@/components/ui/Separator";
import PostDescription from "../PostDescription";
import VoteCommentAndShare from "../VoteCommentAndShare";
import CommentSection from "../CommentSection";
import { getPostRouteComments } from "@/actions/post-route-actions/get-post-route-comments";
import { db } from "@/lib/db";

const PostRouteComments = async ({ postId, index }) => {
  const { comments, initialVote, initialVotesAmt } = await getPostRouteComments(
    postId,
    index
  );
  const post = await db.post.findFirst({
    where: { id: postId },
    select: {
      id: true,
      description: true,
      image: true,
      video: true,
      userStatus: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return (
    <div className="col-span-1 dark:bg-neutral-800 max-h-full relative">
      <ProfileImageAndIcons />

      <Separator className="bg-neutral-200 dark:bg-neutral-700" />

      <div className="overflow-auto max-h-[100vh] pb-24">
        <PostDescription
          post={post}
          index={index}
          commentAmt={comments.length}
        />

        <Separator className="bg-neutral-300 dark:bg-neutral-700" />

        <VoteCommentAndShare
          postId={post.id}
          initialVote={initialVote}
          initialVotesAmt={initialVotesAmt}
        />

        <Separator className="bg-neutral-300 dark:bg-neutral-700" />

        <CommentSection
          post={post}
          initialComments={comments}
          imageIndex={index}
        />
      </div>
    </div>
  );
};

export default PostRouteComments;
