import PostCommentCard from "@/components/PostComment/PostCommentCard";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

export const metadata = {
  title: `Estorya | Post Comments`,
  description: "All in one social media app",
};

const postCommentPage = async ({ params }) => {
  const session = await getAuthSession();
  const { postId, index } = params;
  const post = await db.blog.findFirst({
    where: {
      id: postId,
    },
    include: {
      author: true,
      comments: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const comments = await db.comment.findMany({
    where: {
      postId: post.id,
      replyToId: null,
      index: post.image.length === 1 ? null : index,
    },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(post);

  return (
    <PostCommentCard
      post={post}
      index={index}
      comments={comments}
      session={session}
    />
  );
};

export default postCommentPage;
