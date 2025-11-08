import Posts from "@/components/Post/Posts";
import WatchPageSideBar from "@/components/watch/watch-page-sidebar";
import WatchPageSingleVideo from "@/components/watch/watch-page-single-video";
import WatchPageVideos from "@/components/watch/watch-page-videos";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const WatchPage = async ({ searchParams }) => {
  const searchQuery = searchParams?.v;
  const session = await getAuthSession();
  const videos = await db.blog.findMany({
    where: {
      video: {
        not: null,
      },
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
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  const video = await db.blog.findFirst({
    where: {
      id: searchQuery,
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
  });

  console.log(video);

  if (searchQuery) {
    return (
      <>
        <WatchPageSingleVideo video={video} />
      </>
    );
  }

  return (
    <div className="grid grid-cols-10 ">
      <div className="col-span-2 border-r dark:bg-neutral-800 border-neutral-200 dark:border-neutral-800 relative">
        <WatchPageSideBar />
      </div>
      <div className="col-span-8 pt-5 bg-neutral-200 dark:bg-neutral-900 ">
        <WatchPageVideos initialVideos={videos} />
      </div>
    </div>
  );
};

export default WatchPage;
