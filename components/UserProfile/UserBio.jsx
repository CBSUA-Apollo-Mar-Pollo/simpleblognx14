import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button, buttonVariants } from "../ui/Button";
import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const UserBio = async ({ userId }) => {
  const userImages = await db.userPostedImages.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });
  return (
    <div className="space-y-3">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold py-4">Intro</h2>
          <div className="flex flex-col space-y-4">
            <Button>Add Bio</Button>
            <Button>Edit details</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className=" py-0.5">
          <div className="flex items-center justify-between p-0.5 w-full">
            <h2 className="text-xl font-bold py-4">Photos</h2>
            <Link
              href={`/user/${userId}/photos`}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "font-medium text-md text-blue-500"
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
                    image: img.image,
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
      </Card>
    </div>
  );
};

export default UserBio;
