import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { formatTimeToNow } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { Separator } from "./ui/Separator";
import { Dot, Forward, Globe, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import CommentSection from "./CommentSection";
// import { Button } from "./ui/Button";

const BlogsCard = ({ blog }) => {
  // const pRef = useRef(null);
  return (
    <Card>
      <CardHeader className="py-3">
        <div className="flex items-center gap-1">
          <UserAvatar
            className="h-10 w-10 "
            user={{
              name: blog.author?.name || null,
              image: blog.author?.image || null,
            }}
          />

          <div className="px-2 pt-1">
            <p className="font-semibold text-sm">{blog.author?.name}</p>
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
      <CardContent className="p-0">
        <p className="px-3 text-justify leading-relaxed mb-1">
          {blog.description}
        </p>
        {blog.image && (
          <a
            href={`/postComment/${blog.id}`}
            className="relative overflow-clip w-full"
            // ref={pRef}
          >
            <Image
              sizes="100vw"
              width={0}
              height={0}
              src={blog.image}
              alt="profile image"
              referrerPolicy="no-referrer"
              className="object-contain w-full transition"
            />
            {/* {pRef.current?.clientHeight >= 300 ? (
              <div className="absolute bottom-0 left-0 h-16 w-full flex items-center justify-center">
                <Button className="px-36 text-xs bg-opacity-90">
                  SEE FULL IMAGE
                </Button>
              </div>
            ) : null} */}
          </a>
        )}
        <Separator className="" />
        <div className="flex justify-between my-2 mx-5">
          <div className="flex items-center gap-2  hover:bg-gray-200 px-10 py-1 rounded cursor-pointer">
            <ThumbsUp className="h-6 w-6" />
            <span className="pt-1 font-medium text-sm">Like</span>
          </div>
          <a
            href={`/postComment/${blog.id}`}
            className="flex items-center gap-2 hover:bg-gray-200 px-10 py-1 rounded cursor-pointer"
          >
            <MessageCircle className="h-6 w-6" />
            <span className=" font-medium text-sm">Comment</span>
          </a>
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
