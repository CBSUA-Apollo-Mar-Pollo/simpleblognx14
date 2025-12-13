"use server";

import { COMMENT_PAGE } from "@/config";
import { db } from "@/lib/db";

export const getPostRouteComments = async (postId, index, session) => {
  const post = await db.post.findFirst({
    where: { id: postId },
    select: {
      image: true,
    },
  });

  const commentImageIndex = post.image?.length === 1 ? null : index;

  // Fetch initial comment page limited to COMMENT_PAGE to avoid large payloads
  const comments = await db.comment.findMany({
    where: {
      postId: post.id,
      replyToId: null,
      index: commentImageIndex,
    },
    take: COMMENT_PAGE,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      text: true,
      createdAt: true,
      commentImageUrl: true,
      replyToId: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          handleName: true,
          bio: true,
          birthdate: true,
        },
      },
      replies: {
        take: 3,
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          text: true,
          createdAt: true,
          commentImageUrl: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              handleName: true,
            },
          },
          replyToId: true,
        },
      },
    },
  });

  // Compute votes counts and current user vote without fetching the whole vote array
  const [upVotes, downVotes, currentVote] = await Promise.all([
    db.vote.count({ where: { postId: post.id, type: "UP" } }),
    db.vote.count({ where: { postId: post.id, type: "DOWN" } }),
    session?.user?.id
      ? db.vote.findFirst({
          where: { postId: post.id, userId: session.user.id },
          select: { type: true },
        })
      : null,
  ]);

  const initialVotesAmt = upVotes - downVotes;
  const initialVote = currentVote?.type ?? undefined;

  return { comments, initialVotesAmt, initialVote };
};
