"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import UserAvatar from "../utils/UserAvatar";
import { ImagePlus, MoreHorizontal, Sticker, ThumbsUp } from "lucide-react";
import { SocketIndicator } from "../socket-indicator";
import ChatWelcome from "./chat-welcome";
import { format } from "date-fns";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import EmojiPicker from "../PostComment/EmojiPicker";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/Form";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "../ui/Textarea";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import qs from "query-string";
import axios from "axios";

const messageSchema = z.object({
  content: z.string(),
});

const ConversationCard = ({
  session,
  userProfile,
  conversationDate,
  conversationId,
}) => {
  const formRef = useRef(null);
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate: onSubmit, isLoading } = useMutation({
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
    },
    onError: (err) => {
      console.log(err, "chat input");
    },
  });

  function formatDate(isoString) {
    if (conversationDate) {
      const date = new Date(isoString);
      return format(date, "M/d/yy, h:mm a");
    }
  }

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
    <div className="flex flex-col h-full">
      {/* Conditional content for when userProfile is not available */}
      {!userProfile && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Image width={480} height={480} src="/conversation.png" />
            <h1 className="text-2xl dark:text-neutral-200 font-medium">
              Click any of your friends to start a conversation.
            </h1>
          </div>
        </div>
      )}

      {/* Conditional content for when userProfile is available */}
      {userProfile && (
        <>
          <div className="flex items-center justify-between py-2 px-5 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-800">
            <div className="flex items-center gap-x-3">
              <UserAvatar
                className="h-12 w-12"
                user={{
                  name: userProfile.name || null,
                  image: userProfile.image || null,
                }}
              />
              <h2 className="dark:text-neutral-50 font-semibold text-lg">
                {userProfile.name}
              </h2>
            </div>
            <div className="flex items-center gap-x-2">
              <SocketIndicator />
              <MoreHorizontal className="dark:text-white" />
            </div>
          </div>

          <div className="flex-1 max-h-[82vh] overflow-y-auto">
            <div className="flex  h-full">
              <div className="flex-1 flex  justify-center items-end ">
                <div className="flex flex-col w-full">
                  <ChatWelcome
                    userProfile={userProfile}
                    date={formatDate(conversationDate)}
                  />

                  {/* messages output */}
                  <div>
                    <h1>sass</h1>
                  </div>

                  {/* input message and buttons */}
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
                        <form
                          ref={formRef}
                          onSubmit={form.handleSubmit(onSubmit)}
                        >
                          <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConversationCard;
