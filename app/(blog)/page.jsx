import { db } from "@/lib/db";
import Blogs from "@/components/Blogs";
import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/auth";
import PopularCard from "@/components/PopularCard";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

export default async function Home() {
  const session = await getAuthSession();
  const blogs = await db.blog.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });
  return (
    <div className="grid grid-cols-7 bg-stone-50">
      <div className="mt-[70px] col-span-2 ">
        <Sidebar session={session} />
      </div>
      <div className="mt-[100px] col-span-3 ">
        <Blogs initialPosts={blogs} />
      </div>
      <div className="mt-[100px] col-span-1">
        <PopularCard />
      </div>
    </div>
  );
}
