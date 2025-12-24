"use client";

import { getPopularCommunities } from "@/actions/getPopularCommunities";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PopularCommunities = () => {
  const { data: communities } = useQuery({
    queryKey: ["popularCommunities"],
    queryFn: async () => getPopularCommunities(),
    suspense: true,
  });

  if (!communities.length) {
    return null;
  }

  return (
    <div className="bg-neutral-200/50 dark:bg-neutral-800  rounded-lg pb-2 mx-4 mt-2">
      <h1 className="pt-3 pb-1 dark:text-white font-semibold pl-4">
        Popular communities
      </h1>
      <div className="space-y-2">
        {communities.map((community) => (
          <Link
            href={`/communities/${community.id}`}
            className="flex items-center gap-x-3 hover:bg-neutral-300 px-2 py-2 mx-2 rounded-lg transition duration-150 ease-in-out"
            key={community.id}
          >
            <Image
              src={community.icon}
              className="h-10 w-10 rounded-full"
              alt="Community icon"
              width={40}
              height={40}
            />
            <div className="flex flex-col">
              <h4 className="text-sm dark:text-white font-semibold">
                {community.name}
              </h4>
              <p className="text-xs font-light dark:text-white">
                {community.members.length}{" "}
                <span className="text-xs">
                  {community.members.length > 1 ? "members" : "member"}{" "}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCommunities;
