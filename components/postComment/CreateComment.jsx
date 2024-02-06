"use client";

import React, { useEffect, useState } from "react";
import UserAvatar from "../UserAvatar";
import { Textarea } from "../ui/Textarea";
import { Camera, SendHorizonal } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Button } from "../ui/Button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const CreateComment = ({ session, postId, className, fetch }) => {
  const [textareaValue, setTextareaValue] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text }) => {
      const payload = {
        postId,
        text,
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
      if (typeof fetch === "function") {
        fetch();
      }
    },
  });

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  useEffect(() => {
    const textarea = document.getElementById("auto-resize-textarea");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [textareaValue]);

  return (
    <div className={`flex gap-x-4 px-4 py-2 bg-neutral-800 ${className}`}>
      <UserAvatar
        className="h-10 w-10 "
        user={{
          name: session?.user?.name || null,
          image: session?.user?.image || null,
        }}
      />

      {/* TODO: create a component for comment section */}

      <div className="relative flex-1">
        <Textarea
          id="auto-resize-textarea"
          className="pt-3 pl-4 pb-10 max-h-auto overflow-hidden h-auto rounded-2xl focus:outline-none border-0 bg-neutral-600 border-transparent focus:border-transparent placeholder:text-neutral-300 text-white  focus-visible:border-neutral-600 resize-none"
          placeholder="write an answer..."
          value={textareaValue}
          onChange={handleTextareaChange}
        />
        {/* icons */}

        <div className="absolute bottom-0 flex items-center justify-between w-full space-y-1 px-2">
          <div className="hover:bg-neutral-700 rounded-full cursor-pointer mt-1">
            <Camera className="mx-2 my-2 p-0.5 text-neutral-300" />
          </div>
          <Button
            variant="ghost"
            disabled={textareaValue.length === 0}
            className="hover:bg-neutral-700 rounded-full cursor-pointer flex items-center focus:ring-0"
            onClick={() => comment({ postId, text: textareaValue })}
          >
            <SendHorizonal className=" text-neutral-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
