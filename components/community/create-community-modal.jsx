"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Dot, Plus } from "lucide-react";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Textarea } from "../ui/Textarea";
import { Input } from "../ui/Input";

const CreateCommunityModal = () => {
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

      <DialogContent className="min-w-[80vh]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Tell us about your community
          </DialogTitle>
          <DialogDescription className="text-black">
            a name and description help people understand what your community is
            all about.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-4">
          {/* form  */}
          <div className="col-span-2 ">
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
          <div className="mt-4 mx-10 col-span-2">
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
