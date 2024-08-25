"use client";

import React from "react";
import { Button } from "../ui/Button";
import { clearRecentPosts } from "@/actions/clearRecentPosts";
import { useRouter } from "next/navigation";

const ClearButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        clearRecentPosts();
        router.refresh();
      }}
      size="sm"
      variant="ghost"
      className="text-blue-500  dark:hover:bg-neutral-800"
    >
      Clear
    </Button>
  );
};

export default ClearButton;
