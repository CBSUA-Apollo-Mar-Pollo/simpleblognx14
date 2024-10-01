import React from "react";
import { Button } from "../ui/Button";
import { db } from "@/lib/db";
import Image from "next/image";
import { Pencil } from "lucide-react";
import Link from "next/link";

const UserPhotos = async ({ userId }) => {
  const userImages = await db.blog.findMany({
    where: {
      authorId: userId,
      image: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },

    select: {
      image: true,
      id: true,
    },
  });

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
    <div className="bg-white dark:bg-neutral-800 rounded-2xl py-2">
      <div className="flex justify-between items-center mx-2">
        <h2 className="text-xl font-bold text-neutral-800 px-5 py-4 dark:text-white">
          Photos
        </h2>
        <Button variant="ghost" className="text-blue-600">
          Add photos/videos
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-2 m-5">
        {mergedImages.map((img) => (
          <Link
            href={`/postComment/${img?.postId}/${img.index}`}
            className="relative overflow-clip "
            key={img.id}
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
            <Button
              variant="ghost"
              className="absolute top-2 right-2 bg-neutral-600/80 hover:bg-neutral-800 rounded-full w-9 h-9 p-2.5"
            >
              <Pencil fill="white" className="text-white" />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPhotos;
