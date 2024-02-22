import PostCommentCard from "@/components/PostComment/PostCommentCard";
import { db } from "@/lib/db";
import React from "react";

const postComment = async ({ params }) => {
  const post = await db.blog.findFirst({
    where: {
      id: params?.postId,
    },
    include: {
      author: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <PostCommentCard post={post} />;
};

export default postComment;
