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
import { useSession } from "next-auth/react";

export default function Posts({ initialPosts, deleteImage }) {
  const { data: session } = useSession();
  const { scrolledNumber, setScrolledNumber } = useScrollTracker();
  const lastPostRef = useRef(null);

  const fetchPosts = async ({ pageParam }) => {
    const query = `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`;

    const res = await fetch(query);
    return res.json();
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["get-posts-infinite-query"],
      queryFn: fetchPosts,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    });

  const { ref, entry } = useIntersection({
    root: null,
    rootMargin: "40px",
    threshold: 0.1,
    enabled: hasNextPage,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts =
    data?.pages.flatMap((page) => page.filter((post) => !post.trashed)) ?? [];

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
    <div className="z-2 xl:space-y-3 space-y-1">
      <ul className={"flex flex-col col-span-2 xl:space-y-3 space-y-1 pb-2"}>
        {posts
          .filter(
            (item) =>
              !item.community?.members.find(
                (member) => member.userId !== session?.user.id
              )
          )
          .map((blog, index) => {
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
            const shortsvVotesAmt = blog?.shortsvVotes?.reduce((acc, vote) => {
              if (vote.type === "UP") return acc + 1;
              if (vote.type === "DOWN") return acc - 1;
              return acc;
            }, 0);

            const currentShortsvVote = blog?.shortsvVotes?.find(
              (vote) => vote.userId === session?.user.id
            );

            // Check if the blog post is a video or an image
            const isShortV = Boolean(blog.videoUrl);
            const isImage = Boolean(blog.image);

            if (isShortV && session?.user) {
              return (
                <li key={blog.id} className="list-none z-10">
                  <ShortsVPostCard
                    videoData={blog}
                    session={session}
                    shortsvVotesAmt={shortsvVotesAmt}
                    currentShortsvVote={currentShortsvVote?.type}
                  />

                  <div className="xl:mt-3 my-1">
                    {index === randNumber && <ReelsHomeCard />}
                  </div>
                  <div ref={ref} className="h-1 w-full" />
                </li>
              );
            }

            if (!blog.isShortsV) {
              if (index === posts.length - 1 && isImage) {
                return (
                  <li key={blog.id} className="list-none z-40">
                    <PostCard
                      blog={blog}
                      session={session}
                      deleteImage={deleteImage}
                      votesAmt={votesAmt}
                      currentVote={currentVote}
                      fetchNextPage={fetchNextPage}
                    />
                    {index === randNumber && <ReelsHomeCard />}
                    <div ref={ref} className="h-1 w-full" />
                  </li>
                );
              } else {
                return (
                  <li key={index} className="z-0">
                    {index === randNumber && <ReelsHomeCard />}
                    <PostCard
                      blog={blog}
                      key={blog.id}
                      session={session}
                      deleteImage={deleteImage}
                      votesAmt={votesAmt}
                      currentVote={currentVote}
                      fetchNextPage={fetchNextPage}
                    />
                    <div ref={ref} className="h-1 w-full" />
                  </li>
                );
              }
            }
          })}

        {isFetchingNextPage && (
          <li className="flex justify-center my-20">
            <Loader2 className="w-10 h-10 text-zinc-500 animate-spin my-10" />
          </li>
        )}

        <li>
          <div ref={ref} className="h-10 w-full" />
        </li>
      </ul>
    </div>
  );
}
