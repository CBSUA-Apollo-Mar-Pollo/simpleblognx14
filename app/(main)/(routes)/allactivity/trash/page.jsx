import React from "react";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import {
  CalendarDays,
  ChevronDown,
  CircleEllipsisIcon,
  List,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import AllActivitySideBar from "@/components/allactivity/all-activity-sidebar";
import TrashPosts from "@/components/allactivity/trash-posts";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

const TrashPage = async () => {
  const session = await getAuthSession();
  const trashPosts = await db.post.findMany({
    where: {
      authorId: session?.user.id,
      trashed: true,
    },
    include: {
      author: {
        select: {
          id: true,
          type: true,
          name: true,
          bio: true,
          email: true,
          image: true,
          category: true,
        },
      },
      comments: true,
      votes: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  const now = new Date();
  const expiredPosts = trashPosts.filter((post) => {
    const trashedAt = new Date(post.trashedAt);
    const diffDays = (now - trashedAt) / (1000 * 60 * 60 * 24);
    return diffDays > 30;
  });

  const expiredPostIds = expiredPosts.map((post) => post.id);

  await db.post.deleteMany({
    where: {
      id: {
        in: expiredPostIds,
      },
    },
  });

  return (
    <div className="flex">
      <AllActivitySideBar />
      <TrashPosts trashPosts={trashPosts} />
    </div>
  );
};

export default TrashPage;
