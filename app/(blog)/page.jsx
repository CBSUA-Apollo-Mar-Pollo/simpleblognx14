import { db } from "@/lib/db";
import Blogs from "@/components/Blogs";

export default async function Home() {
  const blogs = await db.blog.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return <Blogs blogs={blogs} />;
}
