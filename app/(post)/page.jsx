import { db } from "@/lib/db";

import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/auth";
import PopularCard from "@/components/PopularCard";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import AddPostModal from "@/components/AddPostModal";
import Posts from "@/components/Posts";

export default async function HomePage() {
  const session = await getAuthSession();
  const posts = await db.blog.findMany({
    include: {
      author: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });
  return (
    <div className="grid grid-cols-4 ">
      <div className=" col-span-1 relative">
        <Sidebar session={session} />
      </div>
      <div className="mt-5 space-y-3 col-span-2 mx-[5rem] ">
        {session?.user && <AddPostModal session={session} />}
        <Posts initialPosts={posts} session={session} />
      </div>
      <div className=" col-span-1 relative">
        <PopularCard />
      </div>
    </div>
  );
}
