"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import { ImagePlus, Smile, Sticker, ThumbsUp } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "../ui/Form";
import { Textarea } from "../ui/Textarea";
import EmojiPicker from "../PostComment/EmojiPicker";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import qs from "query-string";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { ChatIcons } from "./chat-icons";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { cn } from "@/lib/utils";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const messageSchema = z.object({
  content: z.string(),
});

const EmojiPickerChat = ({ onChange, triggerClassName }) => {
  const { resolvedTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger
        className={cn(" rounded-full cursor-pointer", triggerClassName)}
      >
        <ChatIcons.Smiley className="h-5 w-5 0 fill-blue-600 transition" />
      </PopoverTrigger>

      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-8 mr-5"
      >
        <Picker
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};

const ChatWindowInput = ({ session, conversationId, userProfile }) => {
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
      console.log(values, "chat window");
      //   let sessionId = session?.user.id;
      //   const url = qs.stringifyUrl({
      //     url: "/api/socket/direct-messages",
      //     query: {
      //       conversationId,
      //       sessionId,
      //     },
      //   });

      //   await axios.post(url, values);
      //   form.reset();
      //   router.refresh();
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
      if (watchedField.length !== 0 && watchedField.length >= 15) {
        textArea.style.height = `${textArea.scrollHeight}px`;
        if (watchedField.length >= 15) {
          textArea.style.borderRadius = "10px";
        }
      } else {
        textArea.style.borderRadius = "50px";
        textArea.style.height = `0px`;
      }
    }
  }, [watchedField]);

  return (
    <div className="flex items-end pl-1 pr-1 gap-x-1 mb-1">
      {watchedField.length === 0 ? (
        <div className="flex items-center gap-x-1 mb-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChatIcons.ImageAdd className="fill-blue-600 text-blue-600 h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-[18px] w-[18px]">
            <ChatIcons.ChooseSticker className="fill-blue-600 text-blue-600 h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChatIcons.Gif className="fill-blue-600 text-blue-600 h-8 w-8" />
          </Button>
        </div>
      ) : (
        <Button variant="ghost" size="icon" className="h-6 w-6 mb-1.5">
          <ChatIcons.Plus className="fill-blue-600 text-blue-600 h-7 w-7" />
        </Button>
      )}
      <div className="relative flex-1">
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        disabled={isLoading}
                        onKeyDown={handleKeyDown}
                        id="auto-resize-textarea"
                        placeholder="Aa"
                        className="rounded-3xl bg-gray-200 pl-5 min-h-[4.7vh] h-[4.7vh] resize-none pr-8 max-h-[15vh] mb-[2px] overflow-y-auto "
                        {...field}
                      />
                      <div className="absolute bottom-[2px] right-2">
                        <EmojiPickerChat />
                      </div>
                    </div>
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

      <Button variant="ghost" size="icon">
        <ChatIcons.Like className="fill-blue-600 h-6 w-6" />
      </Button>
    </div>
  );
};

export default ChatWindowInput;
