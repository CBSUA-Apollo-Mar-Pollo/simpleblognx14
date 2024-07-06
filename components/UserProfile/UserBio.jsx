import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button, buttonVariants } from "../ui/Button";
import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icons } from "../utils/Icons";
import { Pencil } from "lucide-react";

const UserBio = async ({ user }) => {
  const userImages = await db.userPostedImages.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return (
    <div className="space-y-3">
      <Card className="dark:bg-neutral-800 dark:border-0">
        <CardContent>
          <h2 className="text-xl font-bold py-4 dark:text-white">Intro</h2>
          <div className="flex flex-col space-y-4 w-full">
            {user.bio ? (
              <div className="flex justify-between items-center mx-2">
                <div className="flex gap-x-2">
                  <Icons.BioIcon className="h-6 w-6 dark:fill-neutral-200" />
                  <span className="font-medium dark:text-neutral-200">
                    {user.bio}
                  </span>
                </div>
                <Link href="/settings" className="rounded-full px-3">
                  <Pencil className="h-4 w-4 dark:fill-neutral-200 dark:stroke-neutral-200" />
                </Link>
              </div>
            ) : (
              <Link
                href="/settings"
                className={cn(
                  buttonVariants("secondary"),
                  "dark:bg-neutral-700 dark:hover:bg-neutral-500"
                )}
              >
                Add Bio
              </Link>
            )}
            <Button className="dark:bg-neutral-700 dark:hover:bg-neutral-500">
              Edit details
            </Button>
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

            {/* photos */}
            <div className="grid grid-cols-3 gap-2 py-2">
              {await Promise.all(
                userImages.map(async (img) => {
                  const postId = await db.blog.findFirst({
                    where: {
                      authorId: img.authorId,
                    },
                  });
                  return (
                    <Link
                      href={`/postComment/${postId?.id}`}
                      className="relative overflow-clip "
                      key={img.id}
                    >
                      <Image
                        sizes="100vw"
                        width={0}
                        height={0}
                        src={img.image}
                        alt="profile image"
                        referrerPolicy="no-referrer"
                        className="w-[10rem] transition h-32 bg-black rounded-md object-cover"
                      />
                    </Link>
                  );
                })
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default UserBio;
