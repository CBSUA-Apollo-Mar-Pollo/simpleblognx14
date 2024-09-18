"use server";

import { db } from "@/lib/db";

export const getPostVoteDetails = async (id, type) => {
  if (id !== null) {
    if (type === 1) {
      const voteDetails = await db.vote.findMany({
        where: {
          postId: id,
        },
        include: {
          user: true,
        },
      });
      return voteDetails;
    }
    if (type === 2) {
      const voteDetails = await db.vote.findMany({
        where: {
          postId: id,
          type: "UP",
        },
        include: {
          user: true,
        },
      });
      return voteDetails;
    }

    if (type === 3) {
      const voteDetails = await db.vote.findMany({
        where: {
          postId: id,
          type: "DOWN",
        },
        include: {
          user: true,
        },
      });
      return voteDetails;
    }
  }

  return null;
};
