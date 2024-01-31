import PostCommentCard from "@/components/postComment/PostCommentCard";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const postComment = async ({ params }) => {
  const session = await getAuthSession();
  const post = await db.blog.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      author: true,
    },
  });

  return <PostCommentCard post={post} session={session} />;
};

export default postComment;
