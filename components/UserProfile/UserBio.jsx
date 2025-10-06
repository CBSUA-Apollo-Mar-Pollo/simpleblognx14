"use client";

import React from "react";
import { Card, CardContent } from "../ui/Card";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icons } from "../utils/Icons";
import { Dot, Pencil, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button, buttonVariants } from "../ui/Button";

const UserBio = ({ userImages, user }) => {
  const { data: session } = useSession();
  const mergedImages = userImages
    .filter(({ trashed }) => !trashed) // Filter out trashed items first
    .flatMap(({ id, image }) => {
      if (image) {
        return (Array.isArray(image) ? image : [image]).map((img, index) => ({
          image: img,
          postId: id,
          index,
        }));
      }
      return [];
    })
    .filter((item) => item.image !== null);

  return (
    <div className="space-y-3">
      <Card className="dark:bg-neutral-800 dark:border-0 shadow-md border rounded-2xl">
        <CardContent className="p-0">
          <h2 className="text-xl font-bold py-4 dark:text-white ml-5">Intro</h2>
          <div className="flex flex-col space-y-4 w-full">
            {user?.bio && (
              <div className="flex flex-col justify-between items-center mx-4 space-y-2 mb-2">
                <div className="flex gap-x-2">
                  {/* <Icons.BioIcon className="h-6 w-6 dark:fill-neutral-200" /> */}
                  <span className=" dark:text-neutral-200">{user.bio}</span>
                </div>
                <Link
                  href="/settings"
                  className="rounded-md px-3 p-1.5 bg-neutral-200 w-full text-center font-semibold"
                >
                  Edit Bio
                </Link>
              </div>
            )}

            {user.type === "page" && (
              <div className="flex flex-col space-y-3 mx-5 pb-5">
                <div className="flex items-center">
                  <div className="mr-3">
                    <Icons.informationIcon className="h-5 w-5 fill-neutral-400" />
                  </div>
                  <p className="font-semibold">Page</p>
                  <Dot />
                  <p>{user.category.map((item) => item)}</p>
                </div>

                <div className="flex items-center">
                  <div className="mr-3">
                    <Star className="h-6 w-6 fill-neutral-500 text-neutral-500" />
                  </div>
                  <p>Not yet rated (0 Reviews)</p>
                  <div className="pl-1">
                    <Icons.informationIcon className="h-5 w-5 fill-neutral-600" />
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="bg-neutral-300 font-semibold"
                >
                  Edit Details
                </Button>
                <Button
                  variant="ghost"
                  className="bg-neutral-300 font-semibold"
                >
                  Add Featured
                </Button>
              </div>
            )}

            {session?.user?.id === user.id && !user?.bio && (
              <div className="mx-10 flex flex-col space-y-2 mb-3">
                <Link
                  href="/settings"
                  className={cn(
                    buttonVariants("secondary"),
                    "dark:bg-neutral-700 dark:hover:bg-neutral-500"
                  )}
                >
                  Add Bio
                </Link>

                <Button className="dark:bg-neutral-700 dark:hover:bg-neutral-500">
                  Edit details
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-neutral-800 dark:border-0">
        {userImages.length !== 0 && (
          <CardContent className=" py-0.5">
            <div className="flex items-center justify-between p-0.5 w-full">
              <h2 className="text-xl font-bold py-4 dark:text-white">Photos</h2>
              <Link
                href={`/user/${user.id}/photos`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "font-medium text-md text-blue-500 dark:hover:bg-neutral-700 dark:text-blue-400 dark:hover:text-blue-300"
                )}
              >
                See all photos
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2">
              {mergedImages.slice(0, 6).map((img, index) => (
                <Link
                  href={`/postComment/${img?.postId}/${img.index}`}
                  className="relative overflow-clip "
                  key={index}
                >
                  <Image
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={img.image.url}
                    alt="profile image"
                    referrerPolicy="no-referrer"
                    className="w-[10rem] transition h-32 bg-black rounded-md object-cover"
                  />
                </Link>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default UserBio;
