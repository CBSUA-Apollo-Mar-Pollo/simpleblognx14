"use client";

import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Separator } from "../../ui/Separator";
import { MessageCircle } from "lucide-react";
import HeartVote from "../../PostVote/HeartVote";
import Link from "next/link";
import PostDescriptionCard from "../../PostComment/PostDescriptionCard";
import { useQuery } from "@tanstack/react-query";
import { getSharedPost } from "@/actions/getSharedPost";
import SharedPostCard from "./SharedPostCard";
import StandardPostCard from "./StandardPostCard";
import PostCardHeader from "./PostCardHeader";
import PostCardShareButton from "./PostCardShareButton";
import SharedPostCardLoader from "@/components/Loaders/SharedPostCardLoader";
import { storeToRecentPosts } from "@/actions/storeToRecentPosts";
import PostVote from "@/components/PostVote/PostVote";

const PostCard = ({ blog, session, deleteImage }) => {
  // get shared post data
  const { data: sharedPost } = useQuery({
    // Query key (unique identifier)
    queryKey: ["sharedPost", blog.sharedPostId],
    // Query function
    queryFn: async () => {
      const res = await getSharedPost(blog.sharedPostId);
      return res;
    },
  });

  console.log(blog);

  return (
    <Card className=" dark:bg-neutral-800 dark:border-0 dark:text-neutral-200 drop-shadow-sm border border-neutral-200 rounded-xl">
      <CardHeader className="py-2 px-0">
        <PostCardHeader
          blog={blog}
          session={session}
          deleteImage={deleteImage}
        />
      </CardHeader>

      <CardContent className="p-0">
        {/* post content */}
        {sharedPost ? (
          // shared post card component
          <SharedPostCard sharedPost={sharedPost} blog={blog} />
        ) : !blog.sharedPostId ? (
          //  /* normal post card component */
          <StandardPostCard blog={blog} />
        ) : (
          <SharedPostCardLoader />
        )}

        {blog.comments.length !== 0 &&
          (blog?.image ? (
            <Link
              href={`/postComment/${blog.id}`}
              className="py-1 flex items-center justify-end mr-4 text-sm hover:underline"
            >
              {blog.comments.length}{" "}
              {blog.comments.length === 1 ? "Comment" : "Comments"}
            </Link>
          ) : (
            <div className="pb-2 flex items-center justify-end mr-4 text-sm hover:underline">
              {blog.comments.length}{" "}
              {blog.comments.length === 1 ? "Comment" : "Comments"}
            </div>
          ))}
        <Separator className="dark:bg-neutral-700" />

        {/* home post vote comment and share */}
        <div className="grid grid-cols-4">
          {/* vote */}

          <PostVote />
          <HeartVote />

          {/* comment button */}
          {blog?.image ? (
            <Link
              onClick={() => storeToRecentPosts(blog.id)}
              href={`/postComment/${blog.id}/${0}`}
              className="flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded cursor-pointer"
            >
              <MessageCircle className="h-6 w-6 text-neutral-700" />
              <span className=" font-medium text-sm">Comment</span>
            </Link>
          ) : (
            <div
              className="flex items-center justify-center gap-2 hover:bg-gray-200 rounded cursor-pointer"
              onClick={() => storeToRecentPosts(blog.id)}
            >
              <PostDescriptionCard blog={blog} sharedPost={sharedPost} />
            </div>
          )}

          {/* share button*/}
          <PostCardShareButton
            blog={blog}
            session={session}
            sharedPost={sharedPost}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
