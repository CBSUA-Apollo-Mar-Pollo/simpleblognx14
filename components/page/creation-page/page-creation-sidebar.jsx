"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/Textarea";
import { ChevronRight, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const PageCreationSideBar = ({ onSubmit, isSubmitDisabled, form }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center py-2 pl-3 gap-x-2">
        <Link href="/" className="p-2 bg-neutral-500 rounded-full">
          <X className="text-white" />
        </Link>
        <Link href="/" className="font-bold">
          <span className=" px-3.5 py-[2px] rounded-full bg-yellow-500/80 text-[27px] ">
            E
          </span>
        </Link>
      </div>

      <Separator className="my-2" />

      <div className="px-4 pt-3 flex-1 relative">
        <div className="flex items-center">
          <Link
            href="/pages"
            className="hover:underline text-xs font-semibold text-neutral-700"
          >
            Pages
          </Link>
          <ChevronRight className="stroke-2 h-3 w-3 text-neutral-800 mb-[1px]" />
          <p className="text-xs text-neutral-600">Create a page</p>
        </div>

        <div className="mt-2">
          <h1 className="font-bold text-2xl">Create a page</h1>
          <p className="text-justify text-neutral-600 font-light">
            This is your spotlight. Make sure it shines with all the info people
            need to connect with you.
          </p>

          <div className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-3">
                  <FormField
                    control={form.control}
                    name="pagename"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Page name(required)</FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 border-neutral-300 rounded-2xl focus:border-2  focus:border-blue-600 "
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-[12px] text-neutral-700">
                          Use the name of your business, brand, or organization,
                          or choose a name that clearly represents the purpose
                          of your Page."
                        </FormDescription>

                        <FormMessage className="text-[12px] ml-2" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pagecategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category(required)</FormLabel>
                        <FormControl>
                          <Input
                            className="h-14 border-neutral-300  rounded-2xl focus:border-2  focus:border-blue-600 "
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-[12px] text-neutral-700">
                          Your Page needs to have a category. Enter a category
                          that best describes you.
                        </FormDescription>

                        <FormMessage className="text-[12px] ml-2" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pagebio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            className="border border-neutral-300 resize-none  rounded-2xl focus:border-2  focus:border-blue-600 p-4"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-[12px] text-neutral-700">
                          Tell people a little about what you do.
                        </FormDescription>

                        <FormMessage className="text-[12px] ml-2" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full px-3">
                  <Button
                    disabled={isSubmitDisabled}
                    type="submit"
                    className="w-full"
                  >
                    Create page
                  </Button>

                  <p className="text-xs text-center text-neutral-700 mt-1">
                    By creating a Page, you agree to the Pages, Groups and
                    Events Policies
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCreationSideBar;
