"use client";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import PostCard from "../Post/PostCard/PostCard";
import { Loader2 } from "lucide-react";
import WatchPageVideoCard from "./watch-page-video-card";

const WatchPageVideos = ({ initialVideos, session }) => {
  const { ref, entry } = useIntersection({
    root: null,
    rootMargin: "0px",
    threshold: 0.01,
  });

  const fetchVideos = async ({ pageParam }) => {
    const query = `/api/watch/videos?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`;

    const res = await fetch(query);
    return res.json();
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["infinite-query-videos"],
    queryFn: fetchVideos,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
    initialData: { pages: [initialVideos], pageParams: [1] },
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const videos = data?.pages?.flatMap((page) => page) ?? initialVideos;

  return (
    <div className="z-2 space-y-3">
      <ul className="flex flex-col col-span-2 space-y-3 pb-2">
        {videos.map((blog, index) => {
          const votesAmt = blog?.votes?.reduce((acc, vote) => {
            if (vote.type === "UP") return acc + 1;
            if (vote.type === "DOWN") return acc - 1;
            return acc;
          }, 0);

          const currentVote = blog?.votes?.find(
            (vote) => vote.userId === session?.user.id
          );

          if (index === videos.length - 1) {
            return (
              <li key={blog.id} className="list-none z-40" ref={ref}>
                <WatchPageVideoCard
                  blog={blog}
                  session={session}
                  votesAmt={votesAmt}
                  currentVote={currentVote}
                />
              </li>
            );
          } else {
            return (
              <li key={index} className="z-0" ref={ref}>
                <WatchPageVideoCard
                  blog={blog}
                  key={blog.id}
                  session={session}
                  votesAmt={votesAmt}
                  currentVote={currentVote}
                />
              </li>
            );
          }
        })}

        {isFetchingNextPage && (
          <li className="flex justify-center my-20">
            <Loader2 className="w-10 h-10 text-zinc-500 animate-spin my-10" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default WatchPageVideos;
