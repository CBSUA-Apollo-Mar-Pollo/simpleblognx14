import SearchPageContent from "@/components/search/search-page-content";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

const SearchQueryPage = async ({ params, searchParams }) => {
  const searchQuery = searchParams.q;
  const people = await db.user.findMany({
    where: {
      OR: [
        { name: { contains: searchQuery } },
        { handleName: { contains: searchQuery } },
      ],
    },
  });

  const posts = await db.blog.findMany({
    where: {
      description: { contains: searchQuery },
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

  const session = getAuthSession();

  return (
    <SearchPageContent
      people={people}
      initialPosts={posts}
      session={session}
      searchQuery={searchQuery}
    />
  );
};

export default SearchQueryPage;
