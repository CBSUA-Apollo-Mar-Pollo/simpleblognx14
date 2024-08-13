"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import { ImagePlus, Sticker, ThumbsUp } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "../ui/Form";
import { Textarea } from "../ui/Textarea";
import EmojiPicker from "../PostComment/EmojiPicker";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

const messageSchema = z.object({
  content: z.string(),
});

const ChatInput = ({ session, conversationId, userProfile }) => {
  const router = useRouter();
  const formRef = useRef(null);
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: async (values) => {
      let sessionId = session?.user.id;
      const url = qs.stringifyUrl({
        url: "/api/socket/direct-messages",
        query: {
          conversationId,
          sessionId,
        },
      });

      await axios.post(url, values);
      form.reset();
      router.refresh();
    },
    onError: (err) => {
      console.log(err, "chat input");
    },
  });

  const { reset, formState, control, setValue, getValues } = form;

  const watchedField = useWatch({
    control,
    name: "content",
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Prevent default behavior of adding a newline
      event.preventDefault();
      // You can also add additional logic here if needed
      if (formRef.current) {
        formRef.current.requestSubmit(); // Programmatically submit the form
      }
    }
  };

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (userProfile) {
      const textArea = document.getElementById("auto-resize-textarea");
      if (watchedField.length !== 0 && watchedField.length >= 90) {
        textArea.style.height = `${textArea.scrollHeight}px`;
        if (watchedField.length >= 500) {
          textArea.style.borderRadius = "10px";
        }
      } else {
        textArea.style.borderRadius = "50px";
        textArea.style.height = `0px`;
      }
    }
  }, [watchedField]);
  return (
    <div className="flex items-end pl-1 pr-4 gap-x-2 mb-1">
      <div className="flex items-center">
        <Button variant="ghost" size="icon">
          <ImagePlus className="text-neutral-800" />
        </Button>
        <Button variant="ghost" size="icon">
          <Sticker className="text-neutral-800" />
        </Button>
        <Button variant="ghost" size="icon" className="">
          <span className="font-medium p-1 border border-neutral-400 rounded-md text-xs">
            GIF
          </span>
        </Button>
      </div>
      <div className="relative flex-1">
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      onKeyDown={handleKeyDown}
                      id="auto-resize-textarea"
                      placeholder="Aa"
                      className="rounded-3xl bg-neutral-200 pl-5 min-h-[5.5vh]  h-[5.5vh] resize-none pr-14 max-h-[20vh] overflow-y-auto "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hidden"
            ></Button>
          </form>
        </Form>
      </div>
      <EmojiPicker />
      <Button variant="ghost" size="icon">
        <ThumbsUp className="text-neutral-800" />
      </Button>
    </div>
  );
};

export default ChatInput;
