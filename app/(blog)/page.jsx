import { db } from "@/lib/db";
import Blogs from "@/components/Blogs";
import Sidebar from "@/components/Sidebar";

export default async function Home() {
  const blogs = await db.blog.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex bg-stone-50">
      <div className="mt-[70px]">
        <Sidebar />
      </div>
      <div className="mt-[100px]">
        <Blogs blogs={blogs} />
      </div>
    </div>
  );
}
