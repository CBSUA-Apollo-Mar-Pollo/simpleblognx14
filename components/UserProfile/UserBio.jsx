"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/Card";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icons } from "../utils/Icons";
import { Dot, Pencil, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button, buttonVariants } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const MAX_CHARS = 100;

const UserBio = ({ userImages, user }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [toggleEditBioInput, setToggleEditBioInput] = useState(false);
  const [bioInput, setBioInput] = useState(user?.bio || "");
  const [keyCharactersAmount, setKeyCharactersAmount] = useState(
    MAX_CHARS - bioInput.length
  );

  useEffect(() => {
    setKeyCharactersAmount(MAX_CHARS - bioInput.length);
  }, [bioInput]);

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

  const { mutate: updateBio, isPending } = useMutation({
    mutationFn: async () => {
      const payload = { bio: bioInput };

      const { data } = await axios.post("/api/userProf/updateBio", payload);
      return data;
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      setToggleEditBioInput(false);
      router.refresh();
    },
  });

  return (
    <div className="space-y-3">
      <Card className="dark:bg-neutral-800 dark:border-0 shadow-md border rounded-2xl">
        <CardContent className="p-0 pb-4">
          <h2 className="text-xl font-bold pt-4 pb-1 dark:text-white ml-5">
            Intro
          </h2>
          <div className="flex flex-col space-y-4 w-full">
            {user?.bio && !toggleEditBioInput && (
              <div className="flex flex-col justify-between items-center mx-4 space-y-2">
                <div className="flex gap-x-2">
                  {/* <Icons.BioIcon className="h-6 w-6 dark:fill-neutral-200" /> */}
                  <span className=" dark:text-neutral-200">{user.bio}</span>
                </div>
              </div>
            )}

            {/* render for page profile */}
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

            {/* render for user profile */}
            {session?.user?.id === user.id && (
              <div className="mx-4 flex flex-col space-y-3 ">
                {toggleEditBioInput && (
                  <div className="my-2">
                    <div>
                      <Textarea
                        onChange={(e) => setBioInput(e.target.value)}
                        value={bioInput}
                        maxLength={MAX_CHARS}
                        className="resize-none text-center bg-neutral-100 focus:bg-white border border-neutral-300 focus:border focus:border-neutral-700 rounded-md"
                      />
                      <p className="text-end text-xs text-neutral-600 mt-1">
                        {keyCharactersAmount} characters remaining
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-x-2">
                        <Icons.earthIcon className="h-6 w-6" />
                        <span className="text-sm">Public</span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <Button
                          onClick={() => setToggleEditBioInput(false)}
                          variant="ghost"
                          className="bg-neutral-300 hover:bg-neutral-400 font-semibold h-9 px-3 py-3"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={updateBio}
                          disabled={
                            user.bio === bioInput ||
                            bioInput.length === 0 ||
                            isPending
                          }
                          variant="ghost"
                          className="bg-neutral-300 hover:bg-neutral-400 font-semibold h-9 px-3 py-3"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {!toggleEditBioInput && (
                  <Button
                    onClick={() => setToggleEditBioInput((prev) => !prev)}
                    variant="ghost"
                    className="bg-neutral-300 hover:bg-neutral-400 font-semibold h-9"
                  >
                    {user.bio ? "Edit Bio" : "Add Bio"}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="bg-neutral-300 hover:bg-neutral-400 font-semibold h-9"
                >
                  Edit details
                </Button>
                <Button
                  variant="ghost"
                  className="bg-neutral-300 hover:bg-neutral-400 font-semibold h-9"
                >
                  Add Featured
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
