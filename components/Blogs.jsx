"use client";

import React, { useEffect, useRef } from "react";
import AddBlogModal from "./AddBlogModal";
import BlogsCard from "./BlogsCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useIntersection } from "@mantine/hooks";
import { Loader2 } from "lucide-react";

export default function Blogs({ initialPosts }) {
  const { data: session } = useSession();
  const lastPostRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
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

  return (
    <div className="flex flex-col items-center justify-center z-2 space-y-3">
      <AddBlogModal session={session} />
      <div className="flex flex-col col-span-2 space-y-3 pb-10">
        {posts.map((blog) => (
          <li key={blog.id} className="list-none" ref={ref}>
            <BlogsCard blog={blog} />
          </li>
        ))}

        {isFetchingNextPage && (
          <li className="flex justify-center my-20">
            <Loader2 className="w-10 h-10 text-zinc-500 animate-spin my-10" />
          </li>
        )}
      </div>
    </div>
  );
}
