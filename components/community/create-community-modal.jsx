"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";
import { Button } from "../ui/Button";
import { Dot, Plus, Search, X } from "lucide-react";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";
import { cn } from "@/lib/utils";
import { TopicLists } from "@/constants/topic-list";

const CreateCommunityModal = () => {
  const [page, setPage] = useState(1);
  const [topicsSelected, setTopicsSelected] = useState([]);

  const formSchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { reset, formState, control, setValue, getValues } = form;

  const onSubmit = () => {
    console.log("handle submit");
  };

  const watchedFieldCommunityName = useWatch({
    control,
    name: "name",
  });

  const watchedFieldCommunityDescription = useWatch({
    control,
    name: "description",
  });

  console.log(watchedFieldCommunityName);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-500 rounded-full">
          <Plus className="h-5 w-5 mr-2" />
          Create Community
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[80vh] p-0">
        {page === 1 && (
          <div>
            <DialogHeader className="ml-4 mt-4">
              <DialogTitle className="font-bold text-2xl">
                Tell us about your community
              </DialogTitle>
              <DialogDescription className="text-black">
                a name and description help people understand what your
                community is all about.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-4 ml-7">
              {/* form  */}
              <div className="col-span-2  mt-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="space-y-2">
                                <label
                                  htmlFor="name"
                                  className="text-sm font-semibold text-neutral-700"
                                >
                                  Community name
                                </label>
                                <Input
                                  className="bg-neutral-100 rounded-2xl dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-100 placeholder:text-xs resize-none py-3"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="space-y-2">
                                <label
                                  htmlFor="description"
                                  className="text-sm font-semibold text-neutral-700"
                                >
                                  Description
                                </label>
                                <Textarea
                                  id="auto-resize-textarea"
                                  className="h-44 rounded-2xl border border-neutral-200 bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-100 placeholder:text-xs resize-none py-3"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </div>
              <div className="mt-8 mx-10 col-span-2">
                <div className="bg-neutral-100 rounded-2xl border border-neutral-200">
                  <div className="py-4 px-4">
                    <h3 className="font-semibold text-xl">
                      {watchedFieldCommunityName
                        ? "c/" + watchedFieldCommunityName
                        : "Community name"}
                    </h3>
                    <div className="flex items-center text-xs font-medium">
                      <span>1 member</span>
                      <Dot />
                      <span>1 online</span>
                    </div>
                    <p className="text-xs font-semibold text-neutral-600 mt-1">
                      {watchedFieldCommunityDescription
                        ? watchedFieldCommunityDescription
                        : "Community description"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 2 && (
          <div>
            <DialogHeader className="ml-4 mt-4">
              <DialogTitle className="font-bold text-2xl">
                Style your community
              </DialogTitle>
              <DialogDescription className="text-black">
                Add visual flair will catch potential members attention and help
                establish your community's culture!
              </DialogDescription>
              <DialogDescription className="text-black">
                You can edit this anytime.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-4 ml-7 mt-5">
              <div className="col-span-2 space-y-2 mt-4 mb-10">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Banner</span>
                  <Button className="h-8 px-3 text-xs">Add</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Icon</span>
                  <Button className="h-8 px-3 text-xs">Add</Button>
                </div>
              </div>

              <div className=" mx-10 col-span-2">
                <div className="bg-neutral-100 rounded-2xl border border-neutral-200">
                  <div className="py-4 px-4">
                    <div className="flex items-start gap-x-4">
                      <span className="bg-yellow-400 font-bold text-2xl rounded-full px-3 py-2 border-2 border-neutral-400 mt-1">
                        c/
                      </span>
                      <div>
                        <h3 className="font-semibold text-xl">
                          {watchedFieldCommunityName
                            ? "c/" + watchedFieldCommunityName
                            : "Community name"}
                        </h3>
                        <div className="flex items-center text-xs font-medium">
                          <span>1 member</span>
                          <Dot />
                          <span>1 online</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-neutral-600 mt-3">
                      {watchedFieldCommunityDescription
                        ? watchedFieldCommunityDescription
                        : "Community description"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 3 && (
          <div>
            <DialogHeader className="ml-4 mt-4">
              <DialogTitle className="font-bold text-2xl">
                Add topics
              </DialogTitle>
              <DialogDescription className="text-black">
                Add up to 3 topics to help interested users find your community.
              </DialogDescription>
            </DialogHeader>

            <div>
              {/* filter topic */}
              <div className="relative flex items-center mx-3 mt-4">
                <Search className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                <Input
                  placeholder="Filter topics"
                  className="h-9 pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-200/50 font-light rounded-full  text-sm dark:placeholder:text-white"
                />
              </div>

              {/* topics pick by the user */}

              <div className="mx-4 mt-4">
                <div className="">
                  <h4 className="font-extrabold text-md">
                    Topics {topicsSelected.length}/3
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-2 mt-3 gap-y-2 mb-2">
                    {topicsSelected.map((topic) => (
                      <span className="text-xs bg-neutral-200 text-neutral-700 px-4 py-2 rounded-full hover:bg-neutral-300 hover:cursor-pointer">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* list of topics */}
                <div className="max-h-[35vh] overflow-y-auto space-y-5 mt-2">
                  {TopicLists.map((item, index) => (
                    <div className="mt-2">
                      <span className="text-xs bg-yellow-600 text-white px-4 py-2 rounded-full">
                        {item.label}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2 mt-3 gap-y-2">
                        {item.topics.map((topic) => (
                          <span
                            onClick={() => {
                              if (
                                !topicsSelected.includes(topic) &&
                                topicsSelected.length !== 3
                              ) {
                                setTopicsSelected([...topicsSelected, topic]);
                              }
                            }}
                            className={cn(
                              "text-xs bg-neutral-100 text-neutral-700 px-3 py-2 rounded-full hover:bg-neutral-300 hover:cursor-pointer flex items-center gap-x-1",
                              {
                                "bg-neutral-300":
                                  topicsSelected.includes(topic),
                              }
                            )}
                          >
                            {topic}
                            {topicsSelected.includes(topic) && (
                              <button
                                onClick={() =>
                                  setTopicsSelected(
                                    topicsSelected.filter((t) => t !== topic)
                                  )
                                }
                                className="bg-neutral-100 rounded-full p-0.5"
                              >
                                {<X className="h-3 w-3 stroke-2" />}
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="mx-4 mb-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Dot
                className={cn("h-10 w-10 -mr-6 text-neutral-400", {
                  "text-neutral-950": page === 1,
                })}
              />
              <Dot
                className={cn("h-10 w-10 -mr-6 text-neutral-400", {
                  "text-neutral-950": page === 2,
                })}
              />
              <Dot
                className={cn("h-10 w-10 -mr-6 text-neutral-400", {
                  "text-neutral-950": page === 3,
                })}
              />
              <Dot
                className={cn("h-10 w-10 text-neutral-400", {
                  "text-neutral-950": page === 4,
                })}
              />
            </div>

            <div className="flex items-center gap-x-2 mr-5">
              <Button
                onClick={() =>
                  setPage((current) => {
                    if (current === 1) {
                      return current;
                    } else {
                      return (current -= 1);
                    }
                  })
                }
                className="bg-neutral-200 text-neutral-900 hover:bg-neutral-300 hover:text-black font-semibold"
              >
                {page === 1 ? "Cancel" : "Back"}
              </Button>
              <Button
                onClick={() =>
                  setPage((current) => {
                    if (current === 4) {
                      return current;
                    } else {
                      return (current += 1);
                    }
                  })
                }
                className="bg-blue-600 text-white hover:bg-blue-600/80 hover:text-white font-semibold"
              >
                Next
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
