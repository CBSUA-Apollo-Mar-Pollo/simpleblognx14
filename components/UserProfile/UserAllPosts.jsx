"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useIntersection } from "@mantine/hooks";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import PostCard from "../Post/PostCard/PostCard";
import ShortsVPostCard from "../shortsv/shortsv-post-card";
import { useSession } from "next-auth/react";

const UserAllPosts = ({ initialPosts, userId }) => {
  const { data: session } = useSession();
  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: null,
    rootMargin: "0px",
    threshold: 0.01,
  });
  const fetchAllUserPosts = async ({ pageParam }) => {
    const query = `/api/posts/userPosts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}&userId=${userId}`;

    const res = await fetch(query);

    return res.json();
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    cacheTime: 0,
    queryKey: ["allUsersPosts", userId],
    queryFn: fetchAllUserPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
    initialData: { pages: [initialPosts], pageParams: [1] },
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts =
    data?.pages.flatMap((page) => page.filter((post) => !post.trashed)) ?? [];

  return (
    <div className="z-2 space-y-3">
      <ul className={"flex flex-col col-span-2 space-y-3 pb-2"}>
        {posts.map((blog, index) => {
          // votes for post cards
          const votesAmt = blog?.votes?.reduce((acc, vote) => {
            if (vote.type === "UP") return acc + 1;
            if (vote.type === "DOWN") return acc - 1;
            return acc;
          }, 0);

          const currentVote = blog?.votes?.find(
            (vote) => vote.userId === session?.user.id
          );
          // votes for shorts video post cards
          const shortsvVotesAmt = blog?.shortsVotes?.reduce((acc, vote) => {
            if (vote.type === "UP") return acc + 1;
            if (vote.type === "DOWN") return acc - 1;
            return acc;
          }, 0);

          const currentShortsvVote = blog?.shortsVotes?.find(
            (vote) => vote.userId === session?.user.id
          );

          // Check if the blog post is a video or an image
          const isVideo = Boolean(blog.videoUrl);
          const isImage = Boolean(blog.image);

          if (isVideo) {
            return (
              <li key={blog.id} className="list-none z-10" ref={ref}>
                <ShortsVPostCard
                  videoData={blog}
                  session={session}
                  shortsvVotesAmt={shortsvVotesAmt}
                  currentShortsvVote={currentShortsvVote?.type}
                />
              </li>
            );
          }

          if (index === posts.length - 1 && isImage) {
            return (
              <li key={blog.id} className="list-none z-40" ref={ref}>
                <PostCard
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
                <PostCard
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

        {posts.length === 0 && (
          <p className="text-center text-xl font-semibold mt-4">
            No posts available
          </p>
        )}

        {isFetchingNextPage && (
          <li className="flex justify-center my-20">
            <Loader2 className="w-10 h-10 text-zinc-500 animate-spin my-10" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserAllPosts;
