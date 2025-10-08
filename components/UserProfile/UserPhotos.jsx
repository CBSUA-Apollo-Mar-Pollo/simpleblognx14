"use client";

import React from "react";
import { Button } from "../ui/Button";
import Image from "next/image";
import {
  BookImage,
  CalendarDays,
  Download,
  Navigation,
  Pencil,
  Search,
  Trash2,
  Triangle,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/Dropdown-menu";
import { Icons } from "../utils/Icons";

const UserPhotos = async ({ userImages }) => {
  const mergedImages = userImages
    .flatMap(({ id, image }) => {
      if (image) {
        return (Array.isArray(image) ? image : [image]).map((img, index) => ({
          image: img,
          postId: id,
          index, // Store the index of the image
        }));
      }
      return [];
    })
    .filter((item) => item.image !== null);

  return (
    <div className="bg-white drop-shadow-md shadow dark:bg-neutral-800 rounded-2xl py-2">
      <div className="flex justify-between items-center mx-2">
        <h2 className="text-xl font-bold text-neutral-800 px-5 py-4 dark:text-white">
          Photos
        </h2>
        <Button variant="ghost" className="text-blue-600">
          Add photos/videos
        </Button>
      </div>

      <div className="ml-5 space-x-2">
        <Button
          variant="ghost"
          className="px-4 py-1 font-semibold text-[14px] border-b-4 border-blue-600 text-blue-600 rounded-none"
        >
          Your photos
        </Button>
        <Button variant="ghost" className="px-2 py-1 font-semibold text-[14px]">
          Album
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-2 m-5">
        {mergedImages.map((img, index) => (
          <Link
            href={`/postComment/${img?.postId}/${img.index}`}
            className="relative overflow-clip border border-neutral-200 rounded-md "
            key={index}
          >
            <Image
              sizes="100vw"
              width={0}
              height={0}
              src={img.image.url}
              alt="profile image"
              referrerPolicy="no-referrer"
              className="w-96 transition h-44 bg-black rounded-md object-cover"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  variant="ghost"
                  className="absolute top-2 right-2 bg-neutral-600/80 hover:bg-neutral-800 rounded-full w-9 h-9 p-2.5"
                >
                  <Pencil fill="white" className="text-white" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="ml-[17.5rem] p-2 min-w-[18vw] bg-transparent border-0 drop-shadow-[0_4px_9px_rgba(0,0,0,0.4)] shadow-none">
                <div className="relative z-0">
                  <Triangle className="fill-white text-white h-10 w-10 rotate-90 absolute -top-3 z-30" />
                  <div className="bg-white mt-2 z-40 relative ml-[3.2px] rounded-xl p-2">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Search className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Change Alt Text</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Navigation className="absolute left-4 h-5 w-5 text-neutral-800 fill-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Edit Location</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Trash2 className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Delete photo</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <CalendarDays className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Edit Date</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Download className="absolute left-4 h-5 w-5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Download</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Icons.UserRoundIcon className="absolute left-3.5 h-6 w-6 fill-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Make profile picture</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <Icons.ImageAddIcon className="absolute left-4 h-6 w-6 fill-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Make cover photo</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-start space-x-5 hover:bg-neutral-200"
                    >
                      <BookImage className="absolute left-3.5 h-4.5 w-4.5 text-neutral-800 z-20 dark:text-neutral-300" />
                      <p className="font-semibold">Move to another album</p>
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPhotos;
