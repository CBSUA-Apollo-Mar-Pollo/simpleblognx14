import SearchFilter from "@/components/search/search-filter";
import SearchPageContent from "@/components/search/search-page-content";

import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

export async function generateMetadata({ searchParams }) {
  return {
    title: `Search - ${searchParams.q} | Estorya`,
  };
}

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
    <div className="grid grid-cols-4">
      <div className="col-span-1 w-full relative">
        <SearchFilter />
      </div>
      <div className="col-span-2 flex justify-center">
        <SearchPageContent
          people={people}
          initialPosts={posts}
          session={session}
          searchQuery={searchQuery}
          filter={params.filter}
        />
      </div>
      <div className="col-span-1">hs</div>
    </div>
  );
};

export default SearchQueryPage;
