"use client";

import React, { useEffect, useState } from "react";
import UserAvatar from "../utils/UserAvatar";
import { formatTimeToNow } from "@/lib/utils";
import {
  Dot,
  Globe,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";
import { useMutation } from "@tanstack/react-query";
import EmojiPicker from "./EmojiPicker";
import axios from "axios";
import qs from "query-string";
import { useRouter } from "next/navigation";

const descriptionSchema = z.object({
  description: z.string(),
});

const PostDescription = ({ post, commentAmt, session, index }) => {
  const router = useRouter();
  const [toggleEditDescription, setToggleEditDescription] = useState(false);

  const form = useForm({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: (() => {
        // Try image first
        const imageDesc = post.image?.[index]?.description;
        // Try video if image not found
        const videoDesc = post.video?.[index]?.description;

        // Pick whichever exists, fallback to empty string
        const desc = imageDesc ?? videoDesc ?? "";
        return desc + (desc ? " " : ""); // add space only if not empty
      })(),
    },
  });

  const { reset, formState, control, setValue, getValues } = form;

  const { mutate: onSubmit, isLoading } = useMutation({
    mutationFn: async (values) => {
      const imageToUpdate = post.image[index];
      // Update the properties of the original image object
      Object.assign(imageToUpdate, values);

      const payload = {
        images: post.image,
      };

      const url = qs.stringifyUrl({
        url: "/api/blog/postDescription",
        query: {
          postId: post.id,
        },
      });

      const { data } = await axios.patch(url, payload);
      return data;
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      setToggleEditDescription(false);
      router.refresh();
    },
  });

  const watchedField = useWatch({
    control,
    name: "description", // Replace with the field name you want to watch
  });

  useEffect(() => {
    if (session?.user.id) {
      const textarea = document.getElementById("auto-resize-textarea");
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [watchedField, toggleEditDescription]);

  return (
    <div className="my-2 mx-3">
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-start">
          <UserAvatar
            className="h-10 w-10 mt-2"
            user={{
              name: post.author?.name || null,
              image: post.author?.image || null,
            }}
          />

          <div className="px-2 pt-1  text-neutral-700 dark:text-white">
            <div className="gap-x-1 flex items-center">
              <p className="font-semibold text-sm hover:underline text-[12px]">
                {post?.author?.name}
              </p>
              {post.userStatus && (
                <span className="text-[13px] font-light">
                  {post.userStatus}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <p className=" text-xs text-neutral-700 dark:text-neutral-200 ">
                {formatTimeToNow(new Date(post?.createdAt))}
              </p>
              <Dot className="-mx-1 text-neutral-700 dark:text-gray-200" />
              <Globe className="h-3 w-3 text-neutral-500 dark:text-gray-200" />
            </div>
          </div>
        </div>

        {/* TODO: add a edit settings for the post  */}
        {session?.user && (
          <div className="hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 py-2 px-2 rounded-full cursor-pointer">
            <MoreHorizontal className="text-neutral-700 dark:text-white" />
          </div>
        )}
      </div>

      {!toggleEditDescription && (
        <p
          style={{ whiteSpace: "pre-line" }}
          className="text-sm dark:text-neutral-50 mt-2"
        >
          {post.image?.length === 1 || post.video?.length === 1
            ? post.description
            : post.image?.[index]?.description ||
              post.video?.[index]?.description}
        </p>
      )}

      {post.author.id === session?.user.id &&
        (toggleEditDescription ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mt-4">
                <div className="relative bg-neutral-100 dark:bg-neutral-700 rounded-lg pb-1 pr-1">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            id="auto-resize-textarea"
                            placeholder="Add a description"
                            className="bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-100 placeholder:text-xs resize-none py-3"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end ">
                    <EmojiPicker
                      triggerClassName="mr-1 bg-transparent"
                      onChange={(emoji) =>
                        setValue(
                          "description",
                          getValues("description") + emoji
                        )
                      }
                    />
                  </div>
                </div>

                <div className=" flex gap-x-2">
                  <Button
                    type="submit"
                    size="sm"
                    className="my-2 bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-500"
                  >
                    Done Editing
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setToggleEditDescription(false);
                      reset();
                    }}
                    className="my-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-500"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        ) : (
          <div className="text-neutral-700 dark:text-neutral-200 mt-2">
            <Button
              size="sm"
              onClick={() => setToggleEditDescription(true)}
              className=" bg-neutral-200 text-neutral-800 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-300 text-sm mt-1"
            >
              Edit
            </Button>
          </div>
        ))}

      {commentAmt !== 0 && (
        <div className="flex items-center justify-end gap-x-1 text-neutral-700 dark:text-neutral-400">
          {commentAmt}
          <MessageCircle className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default PostDescription;
