"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "../../ui/Button";
import { Separator } from "../../ui/Separator";
import { useSession } from "next-auth/react";
import BackgroundImage from "./BackgroundImage";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import ProfileButtons from "./ProfileButtons";
import { useRouter } from "next/navigation";

const ProfilePicture = ({ user, deleteImage }) => {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const toast = useToast();

  const { mutate: saveCoverImage, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        image: imageUrl,
      };

      const { data } = await axios.post("/api/userProf", payload);
      return data;
    },
    onError: (err) => {
      //  if there are any other errors beside the server error
      toast({
        title: "There was an error",
        description: "Could not save your cover photo",
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
          // Success
          window.location.reload();
        })
        .catch((error) => {
          setImageUrl("");
          router.refresh();
          return toast({
            description: "Something went wrong",
            variant: "destructive",
          });
        });
    },
  });

  return (
    <div className="relative">
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
              onClick={() => saveCoverImage()}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}

      <div className="mx-52">
        <BackgroundImage
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          session={session}
          user={user}
        />

        <div className="mt-3 w-full">
          <div className="ml-[16rem]">
            <h1 className="font-bold text-4xl">{user?.name}</h1>
            <span className="text-sm">{user.email}</span>
          </div>
        </div>

        <Separator className="mt-10 bg-neutral-300" />

        <div className="mr-10">
          <ProfileButtons userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
