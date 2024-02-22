"use client";

import React, { useEffect, useState } from "react";
import UserAvatar from "../utils/UserAvatar";
import { Textarea } from "../ui/Textarea";
import { Camera, SendHorizonal } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Button } from "../ui/Button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const CreateComment = ({
  session,
  postId,
  className,
  getComments,
  refetch,
  replyToName,
  commentId,
  replyToId,
  setIsReplying,
  commentProps,
}) => {
  const [textareaValue, setTextareaValue] = useState(
    replyToName ? "@" + replyToName + " " : ""
  );
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }) => {
      const payload = {
        postId,
        text,
        replyToId,
        commentId,
      };

      const { data } = await axios.patch("/api/posts/postComment", payload);
      return data;
    },
    onError: (err) => {
      console.log(err, "error");
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid data",
            description: "Text cannot be empty",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setTextareaValue("");
      router.refresh();
      if (typeof getComments === "function") {
        getComments();
      }
      if (typeof refetch === "function") {
        refetch();
      }
    },
  });

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      // Prevent default form submission behavior
      event.preventDefault();

      // Call the comment function with the postId and textareaValue
      comment({
        postId,
        text: textareaValue,
        replyToId: replyToId ?? commentProps?.id,
      });
      if (typeof setIsReplying === "function") {
        setIsReplying(false);
      }

      // Clear the textarea after successful comment
      setTextareaValue("");
    }
  };

  useEffect(() => {
    const textarea = document.getElementById("auto-resize-textarea");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [textareaValue]);

  return (
    <div className={`flex gap-x-3 px-4 py-2 bg-neutral-800 ${className}`}>
      <UserAvatar
        className="h-9 w-9 "
        user={{
          name: session?.user?.name || null,
          image: session?.user?.image || null,
        }}
      />

      {/* TODO: create a component for comment section */}

      <div className="relative flex-1">
        <Textarea
          id="auto-resize-textarea"
          className="pt-3 pl-4 min-h-[2px] pb-10 overflow-hidden rounded-2xl focus:outline-none border-0 bg-neutral-600 border-transparent focus:border-transparent placeholder:text-neutral-300 text-white  focus-visible:border-neutral-600 resize-none"
          placeholder={`${
            replyToName ? "@" + replyToName : "Write an answer..."
          }`}
          value={textareaValue}
          onChange={handleTextareaChange}
          onKeyDown={handleEnterPress} // Add event handler for key presses
        />
        {/* icons */}

        <div className="absolute bottom-0 flex items-center justify-between w-full space-y-1 px-2">
          <div className="hover:bg-neutral-700 rounded-full cursor-pointer mt-1">
            <Camera className="mx-2 my-2 p-0.5 text-neutral-300" />
          </div>
          <Button
            type="submit"
            variant="ghost"
            disabled={textareaValue.length === 0}
            className="hover:bg-neutral-700 rounded-full cursor-pointer flex items-center focus:ring-0"
            onClick={() => {
              comment({
                postId,
                text: textareaValue,
                replyToId: replyToId ?? commentProps.id,
              });

              if (typeof setIsReplying === "function") {
                setIsReplying(false);
              }
            }}
          >
            <SendHorizonal className=" text-neutral-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
