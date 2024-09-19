"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";
import UserAvatar from "../utils/UserAvatar";
import { cn } from "@/lib/utils";
import { useIntersection } from "@mantine/hooks";
import { useScrollTracker } from "@/hooks/use-scroll-tracker";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "../Post/PostCard/PostCard";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

const SearchPageContent = ({ people, initialPosts, session }) => {
  const { scrolledNumber, setScrolledNumber } = useScrollTracker();
  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: null,
    rootMargin: "0px",
    threshold: 0.01,
  });

  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("q");

  const fetchPosts = async ({ pageParam }) => {
    const query = `/api/posts/searchPosts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}&searchQuery=${searchQuery}`;

    const res = await fetch(query);
    return res.json();
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["search-post-infinite-query", searchQuery],
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
    <div className="flex justify-center ">
      <div className=" border-x  border-neutral-300 max-w-[45vw] min-h-screen relative">
        <div className="sticky top-14 z-50">
          <div className="grid grid-cols-5 px-8 border-b border-neutral-300 bg-white">
            <Button
              variant="ghost"
              className="px-2 py-1 w-32 pt-2 border-b-4 border-blue-500 rounded-none text-blue-500 font-semibold "
            >
              Top
            </Button>
            <Button
              variant="ghost"
              className="px-2 py-1 w-32 pt-2 font-semibold text-neutral-600"
            >
              People
            </Button>
            <Button
              variant="ghost"
              className="px-2 py-1 w-32 pt-2 font-semibold text-neutral-600"
            >
              Posts
            </Button>
            <Button
              variant="ghost"
              className="px-2 py-1 w-32 pt-2 font-semibold text-neutral-600"
            >
              Media
            </Button>
            <Button
              variant="ghost"
              className="px-2 py-1 w-32 pt-2 font-semibold text-neutral-600"
            >
              Lists
            </Button>
          </div>
        </div>

        <div className="pl-5  ">
          {people.length !== 0 && (
            <div className="">
              <h1 className="pt-2 pb-2 font-bold text-xl">People</h1>

              <div>
                {people.map((item) => (
                  <div className="flex items-start gap-x-2 ">
                    <UserAvatar
                      className="h-12 w-12 "
                      user={{
                        name: item?.name || null,
                        image: item?.image || null,
                      }}
                    />
                    <div className="mt-1">
                      <p className="font-bold">{item?.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="ghost" className="p-0 text-blue-500">
                View All
              </Button>
            </div>
          )}
        </div>

        <div
          className={cn(" border-neutral-300  mt-2 px-10", {
            "border-t": people.length !== 0,
          })}
        >
          <div className="z-2 space-y-3">
            <ul className={"flex flex-col col-span-2 space-y-3 pb-2"}>
              {posts.map((blog, index) => {
                const votesAmt = blog.votes.reduce((acc, vote) => {
                  if (vote.type === "UP") return acc + 1;
                  if (vote.type === "DOWN") return acc - 1;
                  return acc;
                }, 0);

                const currentVote = blog.votes.find(
                  (vote) => vote.userId === session?.user?.id
                );

                if (index === posts.length - 1) {
                  return (
                    <li key={blog.id} className="list-none" ref={ref}>
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
                    <li key={index}>
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

              {!isFetchingNextPage && posts.length !== 0 && (
                <li className="flex justify-center my-20 text-neutral-400">
                  <span>End of results</span>
                </li>
              )}

              {isFetchingNextPage && (
                <li className="flex justify-center my-20">
                  <Loader2 className="w-10 h-10 text-zinc-500 animate-spin my-10" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPageContent;
