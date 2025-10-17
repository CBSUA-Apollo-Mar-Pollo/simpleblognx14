import { getDominantColor } from "@/data/getDominantColor";
import MultipleImageRender from "@/components/Post/multiple-image-render";

import { Card, CardHeader } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import UserAvatar from "@/components/utils/UserAvatar";
import VideoRenderer from "@/components/utils/video-renderer";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatTimeToNow } from "@/lib/utils";

import { Dot, Settings, X } from "lucide-react";

import Link from "next/link";
import { UTApi } from "uploadthing/server";

const PostDetailPage = async ({ params }) => {
  const session = await getAuthSession();
  const { authorName, postId } = params;
  const post = await db.blog.findFirst({
    where: {
      id: postId,
    },
    include: {
      author: true,
    },
  });

  const dominantColorPost = post?.image?.[0]?.url
    ? getDominantColor(post.image[0].url)
    : null;

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 w-full h-screen flex justify-center ">
      <Card className="dark:bg-neutral-800 dark:border-0 dark:text-neutral-200 drop-shadow-sm border border-neutral-200 rounded-none md:rounded-xl mt-4 h-fit pb-10 min-w-[40vw] max-w-[40vw]">
        <CardHeader className="pt-2 pb-1 px-0 flex items-center justify-center w-full relative">
          <p className="mt-2.5 font-bold text-xl">
            {post.author.name}&apos;s post
          </p>
          <Link
            href="/"
            className="absolute top-1 right-4 p-2 rounded-full bg-neutral-200 dark:bg-neutral-700  hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <X className="text-black dark:text-white" />
          </Link>
        </CardHeader>

        <Separator className="mt-4 dark:bg-neutral-700" />

        <div className="flex items-center gap-x-1 px-3 mt-2">
          <UserAvatar
            post="post"
            className="h-10 w-10 hover:bg-slate-100"
            user={{
              id: post?.author.id,
              handleName: post.author?.handleName,
              bio: post.author?.bio,
              birthdate: post.author?.birthdate,
              name: post.author?.name || null,
              image: post.author?.image || null,
            }}
          />

          <div className="flex items-center gap-1">
            <div className="px-2 pt-1">
              <div className="flex items-center gap-x-1">
                <p className="font-semibold text-sm hover:underline text-[12px]">
                  {post?.author?.name}
                </p>
                {post.userStatus && (
                  <span className="text-[13px] font-light">
                    {post.userStatus}
                  </span>
                )}
              </div>
              <div className="flex items-center ">
                <p className=" text-xs text-gray-600 dark:text-neutral-200">
                  {formatTimeToNow(new Date(post?.createdAt))}
                </p>
                <Dot className="-mx-1 text-gray-600 dark:text-neutral-200" />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Settings className="h-4 w-4 text-gray-600 dark:text-neutral-200" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/85 dark:bg-white/85 border-0">
                    <p className="text-white dark:text-black text-xs p-1 rounded-xl">
                      Only you can see posts in your trash.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 mt-1">
          <p className="">{post.description}</p>
        </div>

        {post.video && <VideoRenderer post={post} />}

        {post.image && (
          <MultipleImageRender
            blog={post}
            dominantColorPost={dominantColorPost}
          />
        )}
      </Card>
    </div>
  );
};

export default PostDetailPage;
