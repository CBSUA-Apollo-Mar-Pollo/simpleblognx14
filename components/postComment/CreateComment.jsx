"use client";

import React, { useEffect, useState } from "react";
import UserAvatar from "../utils/UserAvatar";
import { Textarea } from "../ui/Textarea";
import { Camera, Loader2, SendHorizonal } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Button } from "../ui/Button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { uploadFiles } from "@/lib/uploadThing";
import Image from "next/image";
import EmojiPicker from "./EmojiPicker";

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
  shortsvId,
  imageIndex,
}) => {
  const [textareaValue, setTextareaValue] = useState(
    replyToName ? "@" + replyToName + " " : ""
  );
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }) => {
      const payload = {
        postId: postId,
        shortsvId: shortsvId,
        text,
        replyToId,
        commentId,
        commentImageUrl: imageUrl,
        imageIndex,
      };

      const { data } = await axios.patch("/api/posts/postComment", payload);
      return data;
    },
    onError: (err) => {
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
      setImageUrl("");
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

  function handleFileChange(event) {
    setImageLoading(true);
    const file = event.target.files[0];

    console.log(file);
    uploadFiles("imageUploader", {
      files: [file],
    })
      .then(async (response) => {
        setImageUrl(response[0].url);
        setImageLoading(false);
      })
      .catch((error) => {
        setImageLoading(false);
        return toast({
          title: "Error",
          description: "Error uploading file",
          variant: "destructive",
        });
      });
    // Process the selected file here (e.g., upload, display preview)
  }

  return (
    <div
      className={`flex gap-x-3 px-4 py-2 bg-neutral-50 dark:bg-neutral-800 ${className}`}
    >
      <UserAvatar
        className="h-9 w-9 "
        user={{
          name: session?.user?.name || null,
          image: session?.user?.image || null,
        }}
      />

      <div className="flex-1">
        <div className="relative">
          <Textarea
            id="auto-resize-textarea"
            className="pt-3 pl-4 min-h-[2px] pb-10 overflow-hidden rounded-2xl focus:outline-none border-0 bg-neutral-200 dark:bg-neutral-600 border-transparent focus:border-transparent placeholder:text-neutral-700  dark:placeholder:text-neutral-300 text-neutral-700 dark:text-white  focus-visible:border-neutral-600 resize-none"
            placeholder={`${
              replyToName ? "@" + replyToName : "Write an answer..."
            }`}
            value={textareaValue}
            onChange={handleTextareaChange}
            onKeyDown={handleEnterPress} // Add event handler for key presses
          />
          {/* icons */}

          <div className="absolute bottom-0 flex items-center justify-between w-full pb-1 px-2">
            <div className="">
              <EmojiPicker
                onChange={(emoji) => setTextareaValue(textareaValue + emoji)}
              />
              <Button className="bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-full py-2 cursor-pointer mt-1 p-2">
                <label htmlFor="fileInput">
                  <Camera className=" text-neutral-500 dark:text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition cursor-pointer" />
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={(e) => handleFileChange(e)}
                />
              </Button>
            </div>
            <Button
              type="submit"
              variant="ghost"
              disabled={textareaValue.length === 0 && imageUrl === null}
              className=" bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-700/80 rounded-full cursor-pointer flex items-center focus:ring-0 p-2"
              // onClick={() => {
              //   comment({
              //     postId,
              //     text: textareaValue,
              //     replyToId: replyToId ?? commentProps?.id,
              //   });

              //   if (typeof setIsReplying === "function") {
              //     setIsReplying(false);
              //   }
              // }}
            >
              <SendHorizonal className="text-neutral-700 dark:text-neutral-300" />
            </Button>
          </div>
        </div>

        {/* image preview and loader */}
        {imageLoading ? (
          <div>
            <Loader2 className="w-6 h-6  animate-spin text-white" />
          </div>
        ) : (
          <>
            {imageUrl && (
              <div className="mt-2">
                <Image
                  sizes="100vw"
                  width={0}
                  height={0}
                  src={imageUrl}
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="object-contain w-auto transition rounded-xl"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateComment;
