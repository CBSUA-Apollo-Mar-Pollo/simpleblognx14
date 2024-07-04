"use client";

import { Button, buttonVariants } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Forward, PlusCircle } from "lucide-react";
import React from "react";
import SharePostModal from "../SharePostModal";
import { useToast } from "@/hooks/use-toast";
import useCustomHooks from "@/hooks/use-custom-hooks";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PostCardShareButton = ({ blog, session, sharedPost }) => {
  // share post function using useMutation from tanstack query
  const { toast } = useToast();
  const { signinToast } = useCustomHooks();
  const { mutate: sharePost, isLoading } = useMutation({
    mutationFn: async (id) => {
      const payload = {
        postId: id,
      };
      const { data } = await axios.post("/api/blog/sharePost", payload);
      return data;
    },
    onError: (err) => {
      console.log(err);
      //  if there are any other errors beside the server error

      if (err.response?.status === 401) {
        return signinToast();
      }

      if (err.response?.status === 500) {
        return toast({
          description: "Couldn't share post",
          variant: "destructive",
        });
      }

      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
    onSuccess: async (data) => {
      return toast({
        description: "Shared to your profile",
        action: (
          <Link
            href={`/sharedPost/${data}`}
            className={cn(buttonVariants({ variant: "default" }), "bg-white")}
            onClick={() => dismiss()}
          >
            <span className="text-neutral-800 dark:text-white">View post</span>
          </Link>
        ),
      });
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-neutral-600 px-4 py-1 rounded cursor-pointer focus-visible:outline-none">
        <Forward className="h-6 w-6 text-neutral-700" />
        <span className=" font-medium text-sm">Share</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-[18vw] dark:bg-neutral-700 dark:border-0"
      >
        <div className="flex flex-col dark:bg-neutral-700">
          <Button
            variant="ghost"
            className="flex justify-start gap-x-3 dark:text-neutral-200 dark:hover:bg-neutral-600"
            onClick={() => {
              sharePost(blog.id);
              toast({
                description: "Posting...",
              });
            }}
          >
            <Forward className="h-6 w-6" />
            <span>Share now</span>
          </Button>

          <SharePostModal
            session={session}
            sharedPost={sharedPost}
            blog={blog}
          />

          <Button
            variant="ghost"
            className="flex justify-start gap-x-3 dark:text-neutral-200 dark:hover:bg-neutral-600"
          >
            <PlusCircle className="h-5 w-5" />
            <span> Share to your story</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostCardShareButton;
