"use client";

import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const PageCreationSideBar = () => {
  return (
    <div>
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

      <div className="px-4 pt-3">
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
        </div>
      </div>
    </div>
  );
};

export default PageCreationSideBar;
