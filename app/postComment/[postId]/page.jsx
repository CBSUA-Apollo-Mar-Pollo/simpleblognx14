import PostCommentCard from "@/components/postComment/PostCommentCard";
import { db } from "@/lib/db";
import React from "react";

const postComment = async ({ params }) => {
  const post = await db.blog.findFirst({
    where: {
      id: params?.postId,
    },
    include: {
      author: true,
    },
  });

  return <PostCommentCard post={post} />;
};

export default postComment;
