import { db } from "@/lib/db";
import Blogs from "@/components/Blogs";
import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/auth";
import PopularCard from "@/components/PopularCard";

export default async function Home() {
  const session = await getAuthSession();
  const blogs = await db.blog.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className=" flex justify-between bg-stone-50">
      <div className="mt-[70px]">
        <Sidebar session={session} />
      </div>
      <div className="mt-[100px]">
        <Blogs blogs={blogs} />
      </div>
      <div className="mt-[100px] relative">
        <PopularCard />
      </div>
    </div>
  );
}
