import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { formatTimeToNow } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { Separator } from "./ui/Separator";
import { Dot, Forward, Globe, MessageCircle, ThumbsUp } from "lucide-react";

const BlogsCard = ({ blog }) => {
  return (
    <Card>
      <CardHeader className="py-3">
        <div className="flex items-center gap-1">
          <UserAvatar
            className="h-10 w-10 "
            user={{
              name: blog.author.name || null,
              image: blog.author.image || null,
            }}
          />

          <div className="px-2 pt-1">
            <p className="font-semibold text-sm">{blog.author.name}</p>
            <div className="flex items-center">
              <p className=" text-xs text-gray-600 ">
                {formatTimeToNow(new Date(blog?.createdAt))}
              </p>
              <Dot className="-mx-1 text-gray-600" />
              <Globe className="h-3 w-3 text-gray-600" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-1">
        <p className="px-8 text-justify leading-relaxed mb-5">
          {blog.description}
        </p>
        <Separator className="my-1" />
        <div className="flex justify-center">
          <div className="flex items-center gap-2  hover:bg-gray-200 px-10 py-1 rounded cursor-pointer">
            <ThumbsUp className="h-6 w-6" />
            <span className="pt-1 font-medium text-sm">Like</span>
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-200 px-10 py-1 rounded cursor-pointer">
            <MessageCircle className="h-6 w-6" />
            <span className=" font-medium text-sm">Comment</span>
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-200 px-10 py-1 rounded cursor-pointer">
            <Forward className="h-6 w-6" />
            <span className=" font-medium text-sm">Share</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogsCard;
