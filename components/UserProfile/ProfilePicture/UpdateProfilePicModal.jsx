import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { uploadFiles } from "@/lib/uploadThing";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar-edit";

const UpdateProfilePicModal = ({ userId }) => {
  const [src, setSrc] = useState(
    "https://utfs.io/f/dfc00bb0-e905-45e1-a6b3-b8794eedd42e-naku7h.webp"
  );
  const [userImages, setUserImages] = useState([]);
  const [toggleUpload, setToggleUpload] = useState(false);
  const avatarRef = useRef(null);
  const [file, setFile] = useState({
    name: "",
    type: "",
  });

  const [newfile, setNewfile] = useState();

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
    setToggleUpload(false);
  };

  const FileLoad = (e) => {
    setFile({ ...file, name: e.name, type: e.type });
  };

  const onCrop = (view) => {
    var arr = view.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const newfile = new File([u8arr], file.name, { type: file.type });

    setNewfile(newfile);
  };

  const save = () => {
    uploadFiles("imageUploader", {
      files: [newfile],
    })
      .then(async (response) => {
        const payload = {
          imageUrl: response[0].url,
        };
        await axios.post("/api/userProf/updateProfilePic", payload);
        setToggleUpload(false);
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors that occur during the upload
        console.error("Error uploading file:", error);
      });
  };
  return (
    <Dialog
      onOpenChange={() => {
        fetchUserImages();
        setToggleUpload(false);
      }}
    >
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

        <div className="px-4 py-1 max-h-[70vh] overflow-auto">
          {/* profile edit */}
          {toggleUpload ? (
            <Avatar
              ref={avatarRef}
              imageWidth={680}
              imageHeight={300}
              width={680}
              height={300}
              src={src}
              labelStyle={{
                color: "white",
                fontWeight: "500",
                cursor: "pointer",
                padding: "200px 250px",
              }}
              onClose={onClose}
              onCrop={onCrop}
              onFileLoad={FileLoad}
            />
          ) : (
            <Button
              className="w-full py-2"
              onClick={() => {
                setSrc("");
                setToggleUpload(true);
              }}
            >
              Upload photo
            </Button>
          )}

          <div className="flex justify-end gap-x-2 my-3">
            <Button
              className="text-white hover:bg-neutral-600"
              variant="ghost"
              onClick={() => setToggleUpload(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => save()}>Save</Button>
          </div>

          {/* Uploads */}
          {/* <div className="pt-4">
            <h2 className="py-1">Uploads</h2>

            {isLoading ? (
              <li className="flex justify-center my-20">
                <Loader2 className="w-10 h-10 text-zinc-500 animate-spin my-10" />
              </li>
            ) : (
              <div className="grid grid-cols-5 gap-2 my-4">
                {userImages?.map((img, index) => (
                  <Image
                    key={index}
                    onClick={() => setSrc(img.image)}
                    sizes="100vw"
                    width={0}
                    height={0}
                    src={img.image}
                    alt="profile image"
                    referrerPolicy="no-referrer"
                    className="w-[10rem] transition h-28 bg-black rounded-md object-cover cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePicModal;
