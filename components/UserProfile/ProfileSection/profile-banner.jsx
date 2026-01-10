"use client";

import React, { useContext, useState, useEffect } from "react";
import { Button, buttonVariants } from "../../ui/Button";
import { Separator } from "../../ui/Separator";
import { useSession } from "next-auth/react";
import BackgroundImage from "./BackgroundImage";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LoaderContext } from "@/context/LoaderContext";
import { getDominantColor } from "@/data/getDominantColor";
import { useTheme } from "next-themes";
import {
  Dot,
  Loader2,
  LucideBarChart,
  Megaphone,
  MessageCircleMore,
  Pencil,
  Plus,
  UserCheck,
  UserPlus,
  UserX,
} from "lucide-react";
import { checkIfIsAFriend } from "@/actions/checkIfIsAFriend";
import ProfilePic from "./profile-pic";
import Link from "next/link";
import { Icons } from "@/components/utils/Icons";
import getCroppedImg from "@/lib/crop-image";
import { uploadFiles } from "@/lib/uploadThing";

const ProfileBanner = ({ user, deleteImage }) => {
  const { data: session } = useSession();
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);
  const { resolvedTheme } = useTheme();
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { mutate: saveCoverImage } = useMutation({
    mutationFn: async () => {
      if (!originalFile) return;

      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      const croppedFile = new File([croppedBlob], originalFile.name, {
        type: croppedBlob.type,
      });

      const [uploaded] = await uploadFiles("imageUploader", {
        files: [croppedFile],
      });

      const payload = {
        imageUrl: uploaded,
      };

      const { data } = await axios.post("/api/userProf", payload);
      return data;
    },
    onMutate: () => {
      setIsLoading(true);
      setLoaderDescription("Updating");
    },
    onError: (err) => {
      //  if there are any other errors beside the server error
      return toast({
        title: "There was an error",
        description: "Could not update your cover photo",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      router.refresh();
    },
    onSettled: () => {
      setImageSrc(null);
      setIsLoading(false);
    },
  });

  const { mutate: handleCancelAndFriendRequest } = useMutation({
    mutationFn: async (request) => {
      const payload = {
        userId: user.id,
        request,
      };
      setIsRequestLoading(true);
      await axios.post("/api/friendRequest", payload);
    },
    onError: (err) => {
      refetch();
      setIsRequestLoading(false);
    },
    onSuccess: () => {
      refetch();
      setIsRequestLoading(false);
    },
  });

  const { data: dominantColor } = useQuery({
    queryKey: ["dominantColor", user?.backgroundImage],
    queryFn: () => getDominantColor(user.backgroundImage),
    enabled: !!user?.backgroundImage,
    suspense: true,
  });

  const { data: isAFriend, refetch } = useQuery({
    queryKey: ["isAFriend"],
    queryFn: async () => {
      const res = await checkIfIsAFriend(user.id);
      return res;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const formattedName = user?.name
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <div
      className=""
      style={{
        backgroundImage:
          resolvedTheme === "light"
            ? `linear-gradient(to bottom,  rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 1) 5%, rgba(255, 255, 255, 1) 100%)`
            : `linear-gradient(to bottom, rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 0.3) 0%, rgba(36,36,36, 1) 100%)`,
      }}
    >
      {/* display when this buttons when the user is changing cover photo */}
      {imageSrc !== null && (
        <div className="bg-neutral-700/50 absolute top-0 z-10  text-white w-full">
          <div className="flex items-center justify-between py-2 gap-x-4 mx-5">
            <div className="flex items-center gap-x-2 font-medium">
              <Icons.earthIcon className="h-6 w-6 fill-white" />
              <p className="text-[15px]">Your cover photo is public.</p>
            </div>
            <div className="flex items-center gap-x-4">
              <Button
                className="h-[4.5vh] px-8 bg-white hover:bg-neutral-200 text-black font-semibold"
                onClick={() => {
                  setImageSrc(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 h-[4.5vh] px-8"
                onClick={saveCoverImage}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="xl:mx-40 2xl:mx-52">
        <div className="">
          <BackgroundImage
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            setCroppedAreaPixels={setCroppedAreaPixels}
            setOriginalFile={setOriginalFile}
            user={user}
          />

          <div className="mt-10  grid grid-cols-10">
            {/* User Profile Picture */}
            <div className="col-span-2 relative">
              <ProfilePic user={user} session={session} />
            </div>

            <div className="-mt-4 w-full relative flex justify-between z-10 col-span-8">
              <div>
                <div className="xl:ml-8 2xl:ml-2">
                  <h1 className="font-bold text-3xl dark:text-white">
                    {formattedName}
                  </h1>
                  <span className="text-base font-medium dark:text-white">
                    {user.handleName}
                  </span>
                </div>

                {session?.user.type === "page" && (
                  <div className="flex items-center pl-2">
                    <p className="text-neutral-500 font-medium">0 followers</p>
                    <Dot />
                    <p className="text-neutral-500 font-medium">0 following</p>
                  </div>
                )}
              </div>

              {session?.user.id === user.id ? (
                <div className="mr-5">
                  {session?.user.type === "page" && (
                    <div className=" flex flex-col items-end gap-x-2">
                      <div className="flex items-center gap-x-2">
                        <Link
                          href="/stories/create"
                          className="bg-blue-600 hover:bg-blue-400 drop-shadow-sm text-neutral-800 font-semibold px-4 py-2 flex items-center rounded-md"
                        >
                          <span className="pr-2">
                            <LucideBarChart className=" text-white h-5 w-5" />
                          </span>
                          <span className="text-white text-sm">
                            Professional dashboard
                          </span>
                        </Link>
                        <Button className="bg-white hover:bg-neutral-100 drop-shadow-sm text-neutral-800 font-semibold px-4 flex items-center">
                          <span className="pr-2">
                            <Pencil className="fill-black stroke-transparent  h-4 w-4" />
                          </span>
                          Edit
                        </Button>
                      </div>
                      <Button className="bg-white hover:bg-neutral-100 drop-shadow-sm text-neutral-800 font-semibold px-4 mt-2 ">
                        <span className="pr-2">
                          <Megaphone className="fill-black stroke-transparent  h-6 w-6" />
                        </span>
                        Advertise
                      </Button>
                    </div>
                  )}

                  {session?.user.type === "user" && (
                    <div className=" flex items-center gap-x-2">
                      <Link
                        href="/stories/create"
                        className="bg-blue-600 hover:bg-blue-400 drop-shadow-sm text-neutral-800 font-semibold px-4 py-2 flex items-center rounded-md"
                      >
                        <span className="pr-2">
                          <Plus className=" text-white h-5 w-5" />
                        </span>
                        <span className="text-white text-sm">Add to story</span>
                      </Link>
                      <Button className="bg-white hover:bg-neutral-100 drop-shadow shadow text-neutral-800 font-semibold px-4 flex items-center">
                        <span className="pr-2">
                          <Pencil className="fill-black stroke-transparent  h-4 w-4" />
                        </span>
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                // if there is a logged in user show this ui
                isMounted &&
                session?.user && (
                  <div className=" mr-5 flex gap-x-2">
                    {isAFriend === "onhold" ? (
                      <Button
                        onClick={() => handleCancelAndFriendRequest("false")}
                        className="bg-blue-600 hover:bg-blue-700 drop-shadow-sm text-neutral-100 font-semibold px-4 flex items-center"
                      >
                        <span className="pr-2">
                          {isRequestLoading ? (
                            <Loader2 className="w-6 h-6  animate-spin text-white" />
                          ) : (
                            <UserX className="fill-white  h-5 w-5" />
                          )}
                        </span>
                        Cancel Request
                      </Button>
                    ) : isAFriend === true ? (
                      <Button className="bg-blue-600 hover:bg-blue-700 drop-shadow-sm text-neutral-100 font-semibold px-4 flex items-center">
                        <span className="pr-2">
                          <UserCheck className="fill-white  h-5 w-5" />
                        </span>
                        Friends
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleCancelAndFriendRequest("onhold")}
                        className="bg-blue-600 hover:bg-blue-700 drop-shadow-sm text-neutral-100 font-semibold px-4 flex items-center"
                      >
                        <span className="pr-2">
                          {isRequestLoading ? (
                            <Loader2 className="w-6 h-6  animate-spin text-white" />
                          ) : (
                            <UserPlus className="fill-white  h-5 w-5" />
                          )}
                        </span>
                        Add friend
                      </Button>
                    )}

                    <Button className="bg-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-300/90 drop-shadow text-neutral-800 font-semibold px-3 flex items-center">
                      <span className="pr-2">
                        <MessageCircleMore className="fill-neutral-800 stroke-neutral-200 h-8 w-8" />
                      </span>
                      Message
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <Separator className="mt-7 bg-neutral-300 dark:bg-neutral-700" />
      </div>
    </div>
  );
};

export default ProfileBanner;
