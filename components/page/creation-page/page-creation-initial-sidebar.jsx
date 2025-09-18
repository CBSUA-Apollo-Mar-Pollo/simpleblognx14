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
import { pageCategories } from "@/constants/page-categories";
import { ChevronRight, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const PageCreationInitialSideBar = ({
  onSubmit,
  isSubmitDisabled,
  form,
  isLoading,
  formValues,
  setOpenLeavePageModal,
}) => {
  const router = useRouter();
  const containerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const { pagename, pagecategory } = form.watch();
  const handleFocus = () => setIsFocused(true);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center py-2 pl-3 gap-x-2">
        <Button
          onClick={() =>
            formValues ? setOpenLeavePageModal(true) : router.push("/")
          }
          className="p-2 bg-neutral-500 rounded-full"
        >
          <X className="text-white" />
        </Button>
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
                      <FormItem className="relative" ref={containerRef}>
                        <FormLabel>Category(required)</FormLabel>
                        <FormControl>
                          <Input
                            onFocus={handleFocus}
                            className="h-14  border-neutral-300  rounded-2xl focus:border-2  focus:border-blue-600 "
                            {...field}
                          />
                        </FormControl>
                        {isFocused && (
                          <div
                            onMouseDown={(e) => e.preventDefault()}
                            className="absolute top-[82px] left-0 bg-white border-2 border-gray-300 p-2 w-[20.3vw] shadow-lg rounded-xl"
                          >
                            {pagecategory.length === 0 && (
                              <h1 className="text-center p-2">
                                Type something to get started
                              </h1>
                            )}

                            {pagecategory.length > 0 && (
                              <SimpleBar
                                forceVisible="y"
                                style={{ maxHeight: "30vh" }}
                              >
                                {pageCategories
                                  .filter((item) =>
                                    item
                                      .toLowerCase()
                                      .includes(pagecategory.toLowerCase())
                                  )
                                  .map((item) => (
                                    <div
                                      key={item}
                                      className="p-2  cursor-pointer hover:bg-gray-100"
                                    >
                                      <p className="font-medium">{item}</p>
                                    </div>
                                  ))}
                              </SimpleBar>
                            )}
                          </div>
                        )}
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
                    disabled={isSubmitDisabled || isLoading}
                    type="submit"
                    className="w-full"
                  >
                    {isLoading && (
                      <Loader2 className="w-5 h-5 text-zinc-500 animate-spin my-10 mr-4" />
                    )}
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

export default PageCreationInitialSideBar;
