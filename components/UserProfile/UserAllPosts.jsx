"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useIntersection } from "@mantine/hooks";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import BlogsCard from "../Post/PostCard";

const UserAllPosts = ({ initialPosts, userId, session }) => {
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
    queryKey: ["allUsersPosts"],
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

  const posts = data?.pages?.flatMap((page) => page) ?? initialPosts;

  return (
    <div className="z-2 space-y-3">
      <ul className={"flex flex-col col-span-2 space-y-3 pb-2"}>
        {posts.map((blog, index) => {
          if (index === posts.length - 1) {
            return (
              <li key={blog.id} className="list-none" ref={ref}>
                <BlogsCard blog={blog} session={session} />
              </li>
            );
          } else {
            return <BlogsCard blog={blog} key={blog.id} session={session} />;
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

export default UserAllPosts;
