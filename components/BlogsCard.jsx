import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Avatar } from "./ui/Avatar";
import Image from "next/image";
import { Dot } from "lucide-react";
import { formatTimeToNow } from "@/lib/utils";

const BlogsCard = ({ blog }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-1 mb-3">
          <Avatar className="h-9 w-9 ">
            <div className="relative aspect-square h-full w-full outline-none">
              <Image
                fill
                src={blog.author.image}
                alt="profile image"
                referrerPolicy="no-referrer"
              />
            </div>
          </Avatar>
          <span>
            <Dot className="h-10 w-10" />
          </span>
          <div>
            <p className="font-semibold text-base">{blog.author.name}</p>
            <p className=" text-xs text-gray-600 ">
              {formatTimeToNow(new Date(blog?.createdAt))}
            </p>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-wide">
          {blog.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="px-8 text-justify leading-relaxed">{blog.description}</p>
      </CardContent>
    </Card>
  );
};

export default BlogsCard;
