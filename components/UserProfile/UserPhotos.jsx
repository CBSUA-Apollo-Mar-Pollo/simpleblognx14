import React from "react";
import { Button } from "../ui/Button";
import { db } from "@/lib/db";
import Image from "next/image";
import { Pencil } from "lucide-react";
import Link from "next/link";

const UserPhotos = async ({ userId }) => {
  const userImages = await db.userPostedImages.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="bg-white rounded-md py-2">
      <div className="flex justify-between items-center mx-2">
        <h2 className="text-xl font-bold text-neutral-800 px-5 py-4">Photos</h2>
        <Button variant="ghost" className="text-blue-600">
          Add photos/videos
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-3 m-5">
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
                  className="w-96 transition h-44 bg-black rounded-md object-cover"
                />
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 bg-neutral-600 opacity-80 hover:bg-neutral-800 rounded-full w-9 h-9 p-2.5"
                >
                  <Pencil fill="white" className="text-white" />
                </Button>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserPhotos;
