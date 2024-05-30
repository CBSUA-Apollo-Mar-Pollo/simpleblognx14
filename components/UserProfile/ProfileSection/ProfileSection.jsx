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
import { MessageCircleMore, Pencil, UserPlus } from "lucide-react";

const ProfileSection = ({ user, deleteImage }) => {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { setIsLoading } = useContext(LoaderContext);
  const { resolvedTheme } = useTheme();

  const { mutate: saveCoverImage, isLoading } = useMutation({
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
        description: `${user.name} updated his cover photo`,
        imageUrl: imageUrl,
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

  const { data: dominantColor, error } = useQuery({
    queryKey: ["dominantColor", user.backgroundImage],
    queryFn: async () => {
      const res = await getDominantColor(user.backgroundImage);
      return res;
    },
  });

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
                setImageUrl("");
                deleteImage(imageUrl);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                saveCoverImage();
                setIsLoading(true);
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}

      <div className="mx-52 ">
        <BackgroundImage
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          session={session}
          user={user}
        />

        <div className="mt-5 w-full relative flex justify-between">
          <div className="ml-[16rem]">
            <h1 className="font-bold text-4xl dark:text-white">{user?.name}</h1>
            <span className="text-base font-medium dark:text-white">
              {user.handleName}
            </span>
          </div>

          {session?.user.id === user.id ? (
            <div className="mr-10 mt-4">
              <Button className="bg-neutral-200 hover:bg-neutral-300 drop-shadow-sm text-neutral-800 font-semibold px-4 flex items-center">
                <span className="pr-2">
                  <Pencil className="fill-black stroke-neutral-200 h-6 w-6" />
                </span>
                Edit Profile
              </Button>
            </div>
          ) : (
            <div className="mr-10 mt-4 flex gap-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700 drop-shadow-sm text-neutral-100 font-semibold px-4 flex items-center">
                <span className="pr-2">
                  <UserPlus className="fill-white  h-5 w-5" />
                </span>
                Add friend
              </Button>
              <Button className="bg-neutral-200 hover:bg-neutral-300 drop-shadow text-neutral-800 font-semibold px-3 flex items-center">
                <span className="pr-2">
                  <MessageCircleMore className="fill-neutral-800 stroke-neutral-200 h-8 w-8" />
                </span>
                Message
              </Button>
            </div>
          )}
        </div>

        <Separator className="mt-5 bg-neutral-300 dark:bg-neutral-600" />

        <div className="mr-10">
          <ProfileButtons userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
