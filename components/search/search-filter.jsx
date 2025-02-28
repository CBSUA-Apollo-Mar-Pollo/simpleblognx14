"use client";
import React, { useState } from "react";
import { Checkbox } from "../ui/Checkbox";
import { cn } from "@/lib/utils";

const SearchFilter = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="ml-10 fixed top-20">
      <h1 className="w-[20vw] dark:text-white text-xl font-bold border border-neutral-300 dark:border-neutral-700 px-4 py-3 rounded-2xl">
        Search filters
      </h1>

      {/* people filter */}
      <div className="border border-neutral-300 dark:border-neutral-700 rounded-2xl mt-4">
        <div className="py-2 px-4">
          <h5 className="dark:text-white text-[16px] font-semibold">People</h5>

          <div className="mt-1 space-y-1">
            <div className="flex justify-between">
              <p className="dark:text-white text-[15px]">Anyone</p>
              <Checkbox className="rounded-full dark:border-white" />
            </div>
            <div className="flex justify-between">
              <p className="dark:text-white text-[15px]">Friends</p>
              <Checkbox className="rounded-full dark:border-white" />
            </div>
            <div className="flex justify-between">
              <p className="dark:text-white text-[15px]">Friends of friends</p>
              <Checkbox
                className={cn("border dark:border-white rounded-full", {
                  "bg-blue-500 border-blue-500": checked,
                })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* post filter */}
      <div className="border border-neutral-300 dark:border-neutral-700 rounded-2xl mt-4">
        <div className="py-2 px-4">
          <h5 className="dark:text-white text-[16px] font-semibold">Post</h5>

          <div className="mt-1 space-y-1">
            <div className="flex justify-between">
              <p className="dark:text-white text-[15px]">Recent posts</p>
              <Checkbox className="rounded-full dark:border-white" />
            </div>
            <div className="flex justify-between">
              <p className="dark:text-white text-[15px]">
                Post you`&apos;ve seen
              </p>
              <Checkbox className="rounded-full dark:border-white" />
            </div>

            <div className="py-2">
              <h5 className="dark:text-white text-[16px] font-semibold pb-1">
                Post from
              </h5>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="dark:text-white text-[15px]">Anyone</p>
                  <Checkbox
                    className={cn("border dark:border-white rounded-full", {
                      // "bg-blue-500 border-blue-500": checked,
                    })}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="dark:text-white text-[15px]">You</p>
                  <Checkbox
                    className={cn("border dark:border-white rounded-full", {
                      // "bg-blue-500 border-blue-500": checked,
                    })}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="dark:text-white text-[15px]">Your friends</p>
                  <Checkbox
                    className={cn("border dark:border-white rounded-full", {
                      // "bg-blue-500 border-blue-500": checked,
                    })}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="dark:text-white text-[15px]">
                    Your Community and Pages
                  </p>
                  <Checkbox
                    className={cn("border dark:border-white rounded-full", {
                      // "bg-blue-500 border-blue-500": checked,
                    })}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="dark:text-white text-[15px]">Public posts</p>
                  <Checkbox
                    className={cn("border dark:border-white rounded-full", {
                      // "bg-blue-500 border-blue-500": checked,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* location filter */}
      <div className="border border-neutral-300 dark:border-neutral-700 rounded-2xl mt-4">
        <div className="py-2 px-4">
          <h5 className="dark:text-white text-[16px] font-semibold">
            Location
          </h5>

          <div className="mt-1 space-y-1">
            <div className="flex justify-between">
              <p className="dark:text-white text-[15px]">Anywhere</p>
              <Checkbox className="rounded-full dark:border-white" />
            </div>
            <div className="flex justify-between">
              <p className="dark:text-white text-[15px]">Near me</p>
              <Checkbox className="rounded-full dark:border-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
