import Posts from "@/components/Post/Posts";
import WatchPageSideBar from "@/components/watch/watch-page-sidebar";
import WatchPageVideos from "@/components/watch/watch-page-videos";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

import React from "react";

const WatchPage = async () => {
  const session = await getAuthSession();
  const videos = await db.blog.findMany({
    where: {
      video: {
        not: null,
      },
    },
    include: {
      author: true,
      comments: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  return (
    <div className="grid grid-cols-10 ">
      <div className="col-span-2 border-r border-neutral-200 dark:border-neutral-800 relative">
        <WatchPageSideBar />
      </div>
      <div className="col-span-8 mx-[18vw] mt-5">
        <WatchPageVideos initialVideos={videos} session={session} />
      </div>
    </div>
  );
};

export default WatchPage;
