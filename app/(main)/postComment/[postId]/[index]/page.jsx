import PostCommentCard from "@/components/PostComment/PostCommentCard";
import { db } from "@/lib/db";
import React from "react";

export const metadata = {
  title: `Estorya | Post Comments`,
  description: "All in one social media app",
};

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

  return <PostCommentCard post={post} index={params?.index} />;
};

export default postComment;
