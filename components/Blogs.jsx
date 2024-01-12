import React from "react";
import AddBlogModal from "./AddBlogModal";
import BlogsCard from "./BlogsCard";
import { getAuthSession } from "@/lib/auth";

export default async function Blogs({ blogs }) {
  const session = await getAuthSession();
  // console.log(session);
  return (
    <div className="flex flex-col items-center justify-center mt-[100px] z-2">
      <div className="my-5 w-5/12">
        <AddBlogModal session={session} />
      </div>
      <div className=" flex items-center justify-center ">
        <div className="w-5/12 flex flex-col col-span-2 space-y-5 mb-10">
          {blogs.map((blog) => (
            <li key={blog.id} className="list-none">
              <BlogsCard blog={blog} />
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
