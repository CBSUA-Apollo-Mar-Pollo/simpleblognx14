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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CurrentCityFormSchema = z.object({
  currentcity: z
    .string()
    .trim()
    .min(2, { message: "Hometown must be at least 2 characters long" })
    .max(50, { message: "Hometown must be at most 50 characters long" })
    .regex(/^[a-zA-Z\s,'-]+$/, {
      message:
        "Hometown can only contain letters, spaces, commas, apostrophes, and hyphens",
    }),
});
const CurrentCityForm = ({ setToggleCurrentCityForm, refetch }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(CurrentCityFormSchema),
    defaultValues: {
      currentcity: "",
    },
  });

  const formValueCurrentCity = form.watch("currentcity");

  const isCurrentCityEmpty = formValueCurrentCity === "";

  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: async (data) => {
      const { res } = await axios.post("/api/userProf/about/currentcity", data);
      return res;
    },
    onError: (err) => {
      console.log(err);
      return toast({
        title: "There was an error",
        description: "Couldn't not add home town, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      refetch();
      setToggleCurrentCityForm(false);
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="currentcity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Current City"
                  name="currentcity"
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
              disabled={isPending}
              onClick={() => setToggleCurrentCityForm(false)}
              variant="ghost"
              className="flex items-center bg-neutral-300 gap-x-2 h-10 px-2"
            >
              <span className="text-[15px] font-semibold">Cancel</span>
            </Button>
            <Button
              variant="ghost"
              disabled={isCurrentCityEmpty || isPending}
              className="flex items-center bg-blue-600 hover:bg-blue-700 hover:text-white text-white gap-x-2 h-10 px-4"
            >
              {isPending && (
                <Loader2 className="w-5 h-5 text-white animate-spin my-10 mr-1" />
              )}
              <span className="text-[15px] font-semibold">Save</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CurrentCityForm;
