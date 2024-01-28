import { db } from "@/lib/db";
import Blogs from "@/components/Blogs";
import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/auth";
import PopularCard from "@/components/PopularCard";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import AddBlogModal from "@/components/AddBlogModal";

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
    <div className="grid grid-cols-3">
      <div className="mt-[73px] col-span-1 ">
        <Sidebar session={session} />
      </div>
      <div className="mt-[100px] space-y-3">
        <AddBlogModal session={session} />
        <Blogs initialPosts={blogs} />
      </div>
      <div className="mt-[100px] col-span-1 overflow-hidden">
        <PopularCard />
      </div>
    </div>
  );
}
