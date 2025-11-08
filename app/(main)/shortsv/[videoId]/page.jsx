import ShortsvCard from "@/components/shortsv/ShortsvCard";
import { db } from "@/lib/db";
import React from "react";

const page = async ({ params }) => {
  const shortsVideo = await db.shortsv.findFirst({
    where: {
      id: params.videoId,
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
    },
  });
  // get comments
  const comments = await db.comment.findMany({
    where: {
      postId: shortsVideo?.id,
      shortsvId: shortsVideo?.id,
      replyToId: null,
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

  const shortsVideoId = await db.shortsv.findMany({
    select: {
      id: true,
    },
  });

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const randomIndex = getRandomInt(0, shortsVideoId.length);

  return (
    <ShortsvCard
      video={shortsVideo}
      comments={comments}
      nextLink={shortsVideoId[randomIndex]?.id}
    />
  );
};

export default page;
