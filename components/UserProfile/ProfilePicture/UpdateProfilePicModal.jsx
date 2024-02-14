import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";

const UpdateProfilePicModal = ({ userId }) => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const { mutate: fetchUserImages, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        userId: userId,
      };
      const { data } = await axios.post(
        "/api/userProf/getUploadPhotos",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      setUserImages(data);
    },
  });

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  return (
    <Dialog onOpenChange={() => fetchUserImages()}>
      <DialogTrigger>
        <div className="flex items-center">
          <Camera className="text-neutral-200 h-8 w-8" fill="black" />
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 min-w-[45rem] bg-neutral-800 text-white border-none">
        <DialogHeader className="px-4 py-4 border-b-[1px] border-neutral-600">
          <DialogTitle className="text-xl text-center font-semibold text-white">
            Choose profile picture
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 py-1">
          {/* <Button className="w-full py-2">Upload photo</Button> */}
          <Avatar
            width={680}
            height={300}
            src={src}
            onClose={onClose}
            onCrop={onCrop}
          />

          {/* Uploads */}
          <div className="pt-4">
            <h2 className="py-1">Uploads</h2>

            {isLoading ? (
              <li className="flex justify-center my-20">
                <Loader2 className="w-10 h-10 text-zinc-500 animate-spin my-10" />
              </li>
            ) : (
              <div className="grid grid-cols-5 gap-2 my-4">
                {userImages?.map((img) => (
                  <Image
                    onClick={() => setSrc(img.image)}
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={img.image}
                    alt="profile image"
                    referrerPolicy="no-referrer"
                    className="w-[10rem] transition h-28 bg-black rounded-md object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePicModal;
