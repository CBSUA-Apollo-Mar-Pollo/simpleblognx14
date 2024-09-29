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
import Link from "next/link";

const SearchPageContent = ({
  people,
  initialPosts,
  session,
  searchQuery,
  filter,
}) => {
  const { scrolledNumber, setScrolledNumber } = useScrollTracker();
  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: null,
    rootMargin: "0px",
    threshold: 0.01,
  });

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
    <div className="">
      <div className=" border-x  border-neutral-200 dark:border-neutral-700 max-w-[42vw] min-h-screen relative">
        <div className="sticky top-[3.55em] z-50">
          <div className="grid grid-cols-6 px-4 border-b border-neutral-200 pt-1  dark:border-neutral-700 bg-white dark:bg-neutral-900 gap-x-2">
            <Button
              variant="ghost"
              className={cn(
                "px-2 py-1 w-24 pt-2 border-b-4 rounded-none  font-semibold ",
                {
                  "text-blue-500 border-blue-500": filter === "top",
                }
              )}
            >
              Top
            </Button>
            <Button
              variant="ghost"
              className="px-2 pb-2 w-24 pt-3 font-semibold text-neutral-600 dark:text-white"
            >
              People
            </Button>
            <Button
              variant="ghost"
              className="px-2 pb-2 w-24 pt-3 font-semibold text-neutral-600 dark:text-white"
            >
              Posts
            </Button>
            <Button
              variant="ghost"
              className="px-2 pb-2 w-24 pt-3 font-semibold text-neutral-600 dark:text-white"
            >
              Media
            </Button>
            <Button
              variant="ghost"
              className="px-2 pb-2 w-24 pt-3 font-semibold text-neutral-600 dark:text-white"
            >
              Page
            </Button>
            <Button
              variant="ghost"
              className="px-2 pb-2 w-24 pt-3 font-semibold text-neutral-600 dark:text-white"
            >
              Community
            </Button>
          </div>
        </div>

        {/* list of people */}
        <div className="pl-5 mt-2 ">
          {people.length !== 0 && (
            <div className="">
              <h1 className="pt-2 pb-2 font-bold text-xl dark:text-white">
                People
              </h1>

              <div className="space-y-3">
                {people.map((item) => (
                  <div className="flex items-start gap-x-2">
                    <Link href={`/user/${item.id}`}>
                      <UserAvatar
                        className="h-12 w-12 "
                        user={{
                          name: item?.name || null,
                          image: item?.image || null,
                        }}
                      />
                    </Link>
                    <div className="mt-1">
                      <Link
                        href={`/user/${item.id}`}
                        className="hover:underline"
                      >
                        <p className="font-bold dark:text-white">
                          {item?.name}
                        </p>
                      </Link>
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

        {/* list of posts */}
        <div
          className={cn(" border-neutral-300 dark:border-neutral-700  mt-2 ", {
            "border-t": people.length !== 0,
          })}
        >
          {posts.length !== 0 && (
            <h1 className="pt-2 pb-2 pl-4 font-bold text-xl dark:text-white">
              Posts
            </h1>
          )}
          <div className="z-2 space-y-3 px-10">
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
                <li className="flex justify-center text-neutral-400">
                  <div className="w-full flex flex-row mt-3">
                    <hr className="w-44 mx-auto my-3 border-b-1 border-neutral-300 dark:border-neutral-600" />
                    <p className="inline-block px-1  relative z-10 text-neutral-500">
                      End of results
                    </p>
                    <hr className="w-44 mx-auto my-3 border-b-1 border-neutral-300 dark:border-neutral-600" />
                  </div>
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

        {people.length === 0 && posts.length === 0 && (
          <div className="flex justify-center mt-12">
            <h1 className="dark:text-white font-bold text-3xl">
              ! No Results found for "{searchQuery}"
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPageContent;
