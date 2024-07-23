import ShortsvCard from "@/components/shortsv/ShortsvCard";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const page = async ({ params }) => {
  const shortsVideo = await db.shortsv.findFirst({
    where: {
      id: params.videoId,
    },
    include: {
      author: true,
      comments: true,
    },
  });

  const session = await getAuthSession();
  // get comments
  const comments = await db.comment.findMany({
    where: {
      postId: shortsVideo?.id,
      shortsvId: shortsVideo?.id,
      replyToId: null,
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
  return (
    <ShortsvCard video={shortsVideo} comments={comments} session={session} />
  );
};

export default page;
