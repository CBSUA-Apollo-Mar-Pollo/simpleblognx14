"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { useIntersection } from "@mantine/hooks";
import { Loader2 } from "lucide-react";
import PostCard from "./PostCard/PostCard";
import ReelsHomeCard from "../reels/reels-home-card";
import { useScrollTracker } from "@/hooks/use-scroll-tracker";
import ShortsVPostCard from "../shortsv/shortsv-post-card";

export default function Posts({ initialPosts, session, deleteImage }) {
  const { scrolledNumber, setScrolledNumber } = useScrollTracker();
  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  const fetchPosts = async ({ pageParam }) => {
    const query = `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`;

    const res = await fetch(query);
    return res.json();
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["infinite-query"],
    queryFn: fetchPosts,
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

  const posts = data?.pages?.flatMap((page) => page) ?? initialPosts;

  const [randNumber, setRandNumber] = useState(null);

  useEffect(() => {
    const numbers = [1, 2, 3];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    setRandNumber(numbers[randomIndex]);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledNumber(window.scrollY);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrolledNumber !== undefined) {
      window.scrollTo({
        top: scrolledNumber,
        behavior: "smooth", // or 'auto' if you want instant scrolling
      });
    }
  }, []);

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
                <div className="mt-3">
                  {index === randNumber && <ReelsHomeCard />}
                </div>
              </li>
            );
          }

          if (index === posts.length - 1 && isImage) {
            return (
              <li key={blog.id} className="list-none z-40" ref={ref}>
                <PostCard
                  blog={blog}
                  session={session}
                  deleteImage={deleteImage}
                  votesAmt={votesAmt}
                  currentVote={currentVote}
                />
                {index === randNumber && <ReelsHomeCard />}
              </li>
            );
          } else {
            return (
              <li key={index} className="z-0" ref={ref}>
                {index === randNumber && <ReelsHomeCard />}
                <PostCard
                  blog={blog}
                  key={blog.id}
                  session={session}
                  deleteImage={deleteImage}
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
}
