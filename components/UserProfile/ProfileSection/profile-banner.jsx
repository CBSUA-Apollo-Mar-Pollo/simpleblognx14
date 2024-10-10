"use client";

import React, { useContext, useState } from "react";
import { Button, buttonVariants } from "../../ui/Button";
import { Separator } from "../../ui/Separator";
import { useSession } from "next-auth/react";
import BackgroundImage from "./BackgroundImage";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import ProfileButtons from "./ProfileButtons";
import { useRouter } from "next/navigation";
import { LoaderContext } from "@/context/LoaderContext";
import { getDominantColor } from "@/actions/getDominantColor";
import { useTheme } from "next-themes";
import {
  Loader2,
  MessageCircleMore,
  Pencil,
  UserCheck,
  UserPlus,
  UserX,
} from "lucide-react";
import { checkIfIsAFriend } from "@/actions/checkIfIsAFriend";
import ProfilePic from "./profile-pic";

const ProfileBanner = ({ user, deleteImage }) => {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);
  const { resolvedTheme } = useTheme();
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const { mutate: saveCoverImage } = useMutation({
    mutationFn: async () => {
      const payload = {
        image: imageUrl,
      };

      const { data } = await axios.post("/api/userProf", payload);
      return data;
    },
    onError: (err) => {
      setIsLoading(false);
      //  if there are any other errors beside the server error
      return toast({
        title: "There was an error",
        description: "Could not update your cover photo",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      const payload = {
        userStatus: "updated his cover photo",
        images: imageUrl,
      };
      axios
        .post("/api/blog", payload)
        .then((response) => {
          setIsLoading(false);
          // Success
          window.location.reload();
        })
        .catch((error) => {
          setIsLoading(false);
          setImageUrl("");
          router.refresh();
          return toast({
            description: "Something went wrong",
            variant: "destructive",
          });
        });
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

  const { data: dominantColor, error } = useQuery({
    queryKey: ["dominantColor", user.backgroundImage],
    queryFn: async () => {
      const res = await getDominantColor(user.backgroundImage);
      return res;
    },
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
      className="relative "
      style={{
        backgroundImage:
          resolvedTheme === "light"
            ? `linear-gradient(to bottom,  rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 0.9) 0%, rgba(255, 255, 255, 1) 100%)`
            : `linear-gradient(to bottom, rgba(${dominantColor?.[0]}, ${dominantColor?.[1]}, ${dominantColor?.[2]}, 0.3) 0%, rgba(36,36,36, 1) 100%)`,
      }}
    >
      {/* display when this buttons when the user is changing his/her cover photo */}
      {imageUrl.length !== 0 && (
        <div className="bg-neutral-700 absolute top-0 z-10 opacity-80 text-white w-full">
          <div className="flex justify-end py-2 gap-x-4 mx-5">
            <Button
              onClick={() => {
                deleteImage(imageUrl);
                setImageUrl("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                saveCoverImage();
                setIsLoading(true);
                setLoaderDescription("Updating");
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}

      <div className="mx-52 ">
        <div className="">
          <BackgroundImage
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            session={session}
            user={user}
          />

          <div className="mt-10  grid grid-cols-10">
            <div className="col-span-2 relative">
              <ProfilePic user={user} session={session} />
            </div>

            <div className="-mt-4 w-full relative flex justify-between z-10 col-span-8">
              <div className="ml-2">
                <h1 className="font-semibold text-3xl dark:text-white">
                  {formattedName}
                </h1>
                <span className="text-base font-medium dark:text-white">
                  {user.handleName}
                </span>
              </div>

              {session?.user.id === user.id ? (
                <div className="mr-5">
                  <Button className="bg-white hover:bg-neutral-100 drop-shadow-sm text-neutral-800 font-semibold px-4 flex items-center">
                    <span className="pr-2">
                      <Pencil className="fill-black stroke-transparent  h-4 w-4" />
                    </span>
                    Edit Profile
                  </Button>
                </div>
              ) : (
                // if there is a logged in user show this ui
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

        <div className="mr-10">
          <ProfileButtons userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
