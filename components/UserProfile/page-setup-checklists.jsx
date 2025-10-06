"use client";

import React from "react";
import { Card, CardContent } from "../ui/Card";
import { ChevronLeft, ChevronRight, UserCircle } from "lucide-react";
import { Icons } from "../utils/Icons";
import { Separator } from "../ui/Separator";

const PageSetupChecklists = () => {
  return (
    <div>
      <Card className="dark:bg-neutral-800 dark:border-0 shadow-md border rounded-2xl">
        <CardContent className="p-0 pb-2">
          <h2 className="text-xl font-bold py-4 dark:text-white ml-5 pr-10">
            Recommended next steps to get your Page ready to advertise
          </h2>
          <div className="">
            <div className="flex items-center justify-between mx-2 px-3 py-1 hover:bg-neutral-200 mb-1 rounded-md cursor-pointer">
              <div className="flex items-center gap-x-3 pt-1">
                <Icons.UserRoundIcon className="h-9 w-9" />
                <div>
                  <p className="font-semibold">Add profile picture (~1 min)</p>
                  <span className="text-xs text-neutral-500 font-light-">
                    Establish trust and credibility with your customers.
                  </span>
                </div>
              </div>
              <ChevronRight className="h-8 w-8 text-neutral-600" />
            </div>

            <div className="mx-4">
              <Separator className=" bg-neutral-300 mb-1 " />
            </div>

            <div className="flex items-center justify-between mx-2 px-3 py-1 hover:bg-neutral-200  mb-1 rounded-md cursor-pointer">
              <div className="flex items-center gap-x-3 pt-1">
                <Icons.ImageAddIcon className="h-8 w-8" />
                <div>
                  <p className="font-semibold">Add cover photo (~1 min)</p>
                  <span className="text-xs text-neutral-500 font-light-">
                    Make a great first impression with new audiences.
                  </span>
                </div>
              </div>
              <ChevronRight className="h-8 w-8 text-neutral-600" />
            </div>

            <div className="mx-4">
              <Separator className=" bg-neutral-300  " />
            </div>

            <div className="flex items-center justify-between mx-2 px-3 py-1 hover:bg-neutral-200 mt-1 rounded-md cursor-pointer">
              <div className="flex items-center gap-x-3 pt-1">
                <Icons.friendsIcon className="h-7 w-7" />
                <div>
                  <p className="font-semibold">
                    Invite friends to follow (~1 min)
                  </p>
                  <span className="text-xs text-neutral-500 font-light-">
                    get more ad results with 1000 followers.
                  </span>
                </div>
              </div>
              <ChevronRight className="h-8 w-8 text-neutral-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageSetupChecklists;
