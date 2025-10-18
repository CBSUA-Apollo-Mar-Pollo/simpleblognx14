"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { Icons } from "@/components/utils/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const HomeTownFormSchema = z.object({
  hometown: z
    .string()
    .trim()
    .min(2, { message: "Hometown must be at least 2 characters long" })
    .max(50, { message: "Hometown must be at most 50 characters long" })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Hometown can only contain letters, spaces, apostrophes, and hyphens",
    }),
});

const HomeTownForm = ({ setToggleHomeTownForm }) => {
  const form = useForm({
    resolver: zodResolver(HomeTownFormSchema),
    defaultValues: {
      hometown: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="hometown"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Hometown"
                  name="hometown"
                  className="p-6 rounded-xl border-neutral-300 hover:border-2 hover:border-neutral-400 focus:border-blue-600"
                  {...field}
                />
              </FormControl>

              <FormMessage className="text-[12px] ml-2" />
            </FormItem>
          )}
        />

        <Separator className="my-3" />

        <div className="flex items-center justify-between mt-3">
          <Button
            variant="ghost"
            disabled={true}
            className="flex items-center bg-neutral-400 gap-x-2 h-8"
          >
            <Icons.earthIcon className="h-3.5 w-3.5" />
            <span className="text-[14px] font-semibold">Public</span>
          </Button>

          <div className="flex items-center gap-x-2">
            <Button
              onClick={() => setToggleHomeTownForm(false)}
              variant="ghost"
              className="flex items-center bg-neutral-300 gap-x-2 h-10 px-2"
            >
              <span className="text-[15px] font-semibold">Cancel</span>
            </Button>
            <Button
              variant="ghost"
              disabled={true}
              className="flex items-center bg-neutral-400 gap-x-2 h-10 px-4"
            >
              <span className="text-[15px] font-semibold">Save</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default HomeTownForm;
