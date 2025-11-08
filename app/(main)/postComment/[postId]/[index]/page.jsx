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
      author: {
        select: {
          blogs: true,
          id: true,
          type: true,
          name: true,
          bio: true,
          email: true,
          image: true,
          category: true,
          backgroundImage: true,
        },
      },
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
      author: {
        select: {
          blogs: true,
          id: true,
          type: true,
          name: true,
          bio: true,
          email: true,
          image: true,
          category: true,
          backgroundImage: true,
        },
      },
      replies: {
        include: {
          author: {
            select: {
              blogs: true,
              id: true,
              type: true,
              name: true,
              bio: true,
              email: true,
              image: true,
              category: true,
              backgroundImage: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(post);

  return <PostCommentCard post={post} index={index} comments={comments} />;
};

export default postCommentPage;
