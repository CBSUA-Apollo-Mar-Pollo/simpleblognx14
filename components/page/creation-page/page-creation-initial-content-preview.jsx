"use client";

import NotificationMenu from "@/components/Notification/NotificationMenu";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import ChatBoxMenu from "@/components/utils/ChatBoxMenu";
import { Icons } from "@/components/utils/Icons";
import Menu from "@/components/utils/Menu";
import UserAccountNav from "@/components/utils/UserAccountNav";
import {
  ChevronDown,
  Dot,
  Monitor,
  MoreHorizontal,
  Plus,
  Settings2,
  Smartphone,
  Triangle,
  User,
} from "lucide-react";
import React, { useState } from "react";

const PageCreationInitialContentPreview = ({
  session,
  formValues,
  togglePreview,
  setTogglePreview,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end py-2 pr-4">
        <div className="flex items-center gap-x-3">
          <Menu contentClassName="-mr-[7vw]" />
          <ChatBoxMenu />
          <NotificationMenu />
          <UserAccountNav user={session.user} />
        </div>
      </div>

      <div
        className={`${
          togglePreview === 1 ? "mx-48" : "mx-[23vw]"
        }   bg-white  drop-shadow-[0px_0px_8px_rgba(0,0,0,0.2)] h-full mt-2 mb-10 rounded-xl p-4`}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">
            {togglePreview === 1 ? "Desktop" : "Mobile"} preview
          </h1>
          <div className="flex items-center gap-x-1">
            <Button
              onClick={() => setTogglePreview(1)}
              className={`${
                togglePreview === 1
                  ? "bg-blue-50 hover:bg-blue-100"
                  : "bg-white hover:bg-neutral-200"
              }  rounded-full p-0`}
            >
              <Monitor
                className={`${
                  togglePreview === 1 ? "text-blue-500" : "text-black"
                }  p-2 h-10 w-10  `}
              />
            </Button>
            <Button
              onClick={() => setTogglePreview(2)}
              className={`${
                togglePreview === 2
                  ? "bg-blue-50 hover:bg-blue-100"
                  : "bg-white hover:bg-neutral-200"
              }  rounded-full p-0`}
            >
              <Smartphone
                className={`${
                  togglePreview === 2 ? "text-blue-500" : "text-black"
                }  p-2 h-10 w-10  `}
              />
            </Button>
          </div>
        </div>

        <div className="border rounded-md mt-4 max-h-[77vh] overflow-y-auto">
          <div className="relative drop-shadow bg-white">
            <div
              className={`${
                togglePreview === 1 ? "h-[40vh]" : "h-[25vh]"
              }  bg-neutral-100 rounded-md`}
            />
            <div
              className={`absolute ${
                togglePreview === 1 ? "top-[32vh]" : "top-[17vh]"
              } left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-neutral-300 rounded-full border-4 border-white`}
            >
              <User className="fill-white text-white h-40 w-40" />
            </div>
            <h1
              className={`${
                formValues.pagename ? "text-neutral-800" : "text-neutral-400"
              } mt-8 text-3xl font-bold text-center `}
            >
              {formValues.pagename ? formValues.pagename : "Page name"}
            </h1>
            <p
              className={`${
                formValues.pagebio ? "text-neutral-800" : "text-neutral-500"
              } text-center `}
            >
              {" "}
              {formValues.pagebio ? formValues.pagebio : null}
            </p>

            <div className="px-4 my-4">
              <Separator className="bg-neutral-300 h-[0.7px]" />
            </div>

            <div
              className={`${
                togglePreview === 1 ? "mx-6" : "mx-4"
              } flex items-center justify-between gap-x-6`}
            >
              {togglePreview === 1 ? (
                <div className="flex items-center gap-x-6">
                  <p className="font-semibold text-neutral-700 text-[15px]">
                    Posts
                  </p>
                  <p className="font-semibold text-neutral-700 text-[15px]">
                    About
                  </p>
                  <p className="font-semibold text-neutral-700 text-[15px]">
                    Followers
                  </p>
                  <p className="font-semibold text-neutral-700 text-[15px]">
                    Photos
                  </p>
                  <p className="font-semibold text-neutral-700 text-[15px]">
                    Videos
                  </p>
                  <div className="flex items-center gap-x-1">
                    <p className="font-semibold text-neutral-700 text-[15px]">
                      More
                    </p>
                    <Triangle className="rotate-180 text-transparent fill-neutral-700 h-2 w-3  " />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-x-6">
                  <p className="font-semibold text-neutral-700 text-[15px]">
                    Posts
                  </p>
                  <div className="flex items-center gap-x-1">
                    <p className="font-semibold text-neutral-700 text-[15px]">
                      More
                    </p>
                    <Triangle className="rotate-180 text-transparent fill-neutral-700 h-2 w-3  " />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-x-2 pb-3">
                <Button disabled={true} className="flex gap-x-1 rounded-lg">
                  <Plus className="h-5 w-5" />
                  Follow
                </Button>
                <Button disabled={true} className="flex gap-x-2 rounded-lg">
                  <Icons.Messager className="h-5 w-5 fill-white" />
                  Message
                </Button>
                <Button disabled={true} className="flex gap-x-2 rounded-lg">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-neutral-200 pt-4 flex flex-col space-y-5 pb-4">
            <div
              className={`${
                togglePreview === 1 ? "mx-28 " : "mx-4"
              } bg-white p-4 rounded-xl drop-shadow`}
            >
              <h1 className="font-bold text-xl">Intro</h1>

              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex items-center gap-x-2">
                  <Icons.followCheckIcon className="h-6 w-6 fill-neutral-400 mr-2" />
                  <span className="font-semibold text-sm">0</span>
                  <p className="font-semibold text-sm">Followers</p>
                </div>
                <div className="flex items-center">
                  <Icons.informationIcon className="h-6 w-6 fill-neutral-400 mr-4" />
                  <span className="font-semibold text-sm">Page</span>
                  <Dot className="w-3 h-3" />
                  <p className="font-normal text-sm">Category</p>
                </div>
              </div>
            </div>

            <div
              className={`${
                togglePreview === 1 ? "mx-28" : "mx-4"
              } bg-white  p-3 rounded-xl drop-shadow mb-4 flex items-center justify-between`}
            >
              <h1 className="font-bold text-xl">Posts</h1>
              <Button className="gap-x-2 rounded-md px-3 py-2 bg-neutral-300 text-neutral-800">
                <Settings2 className="h-5 w-5" />
                <span className="font-semibold">Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCreationInitialContentPreview;
