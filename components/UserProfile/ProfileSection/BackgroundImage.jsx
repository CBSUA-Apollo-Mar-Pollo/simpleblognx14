import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import UpdateCoverPhotoButton from "./UpdateCoverPhotoButton";
import ProfilePIc from "./profile-pic";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Cropper from "react-easy-crop";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Separator } from "@/components/ui/Separator";
import { Icons } from "@/components/utils/Icons";

const BackgroundImage = ({
  imageSrc,
  setImageSrc,
  setCroppedAreaPixels,
  setOriginalFile,
  user,
  session,
}) => {
  const fileInputRef = useRef(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file); // 👈 keep original file

    setImageSrc(URL.createObjectURL(file));
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  console.log(user, "user");

  return (
    <div className="relative">
      {/* div if user is not yet to upload background image */}
      {imageSrc ? (
        <div className="relative">
          <div className=" h-[55vh] rounded-b-3xl scroll-container bg-neutral-900 cursor-move">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={1}
              onZoomChange={() => {}}
              minZoom={1}
              maxZoom={1}
              aspect={3.1 / 1.1}
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              objectFit="cover"
            />
          </div>
        </div>
      ) : (
        <div>
          {/* if the user has uploaded a cover photo display it */}
          {user.backgroundImage ? (
            <div className="overflow-hidden h-[45vh] rounded-b-3xl scroll-container bg-neutral-900 z-20">
              <Link
                href={`/postComment/${user.coverPhotoId}/0`}
                className="scroll-container"
              >
                <Image
                  sizes="100vw"
                  width={0}
                  height={0}
                  src={user.backgroundImage}
                  alt="profile image"
                  referrerPolicy="no-referrer"
                  className="w-[80vw] max-h-fit"
                  // style={{ transform: "translateY()" }} // Adjust the percentage as needed
                />
              </Link>
            </div>
          ) : (
            // show a blank cover photo
            <div className=" rounded-b-3xl scroll-container bg-neutral-400 dark:bg-neutral-800 h-[55vh]">
              <div className="w-[80vw]" />
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: "none" }}
          />

          {user?.id === session?.user.id && (
            <div className="relative">
              <div className="absolute bottom-5 right-8">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      // onClick={() => {
                      //   fileInputRef.current?.click();
                      // }}
                      className="flex items-center gap-x-2 bg-white hover:bg-neutral-200 shadow-md drop-shadow-md rounded-lg"
                    >
                      <Camera className="text-neutral-50 h-6 w-6 fill-black dark:fill-neutral-200 dark:stroke-neutral-700 dark:hover:stroke-neutral-600" />
                      <span className="font-semibold text-sm text-black">
                        {user.backgroundImage
                          ? "Edit cover photo"
                          : "Add cover photo"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[20vw] mr-[9.4vw] rounded-lg drop-shadow-[0px_0px_7px_rgba(0,0,0,0.20)] shadow-md p-2 border-0">
                    {user.backgroundImage && (
                      <div>
                        <DropdownMenuItem className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4">
                          <Icons.addCoverPhotoOutlineIcon className="h-5 w-5" />
                          <span>Choose cover photo</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                          className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4"
                        >
                          <Icons.outlineUploadIcon className="h-5 w-5" />
                          Upload photo
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4">
                          <Icons.outlineRepositionIcon className="h-5 w-5" />
                          Reposition
                        </DropdownMenuItem>
                        <Separator className="my-1" />
                        <DropdownMenuItem className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4">
                          <Icons.outlineTrashIcon className="h-5 w-5" />
                          Remove
                        </DropdownMenuItem>
                      </div>
                    )}

                    {user.BackgroundImage === null && (
                      <div>
                        <DropdownMenuItem className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4">
                          <Icons.addCoverPhotoOutlineIcon className="h-5 w-5" />
                          <span>Choose cover photo</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                          className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4"
                        >
                          <Icons.outlineUploadIcon className="h-5 w-5" />
                          Upload photo
                        </DropdownMenuItem>
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          {/* 
          <UpdateCoverPhotoButton
            setImageUrl={setImageUrl}
            user={user}
            session={session}
          /> */}
        </div>
      )}
    </div>
  );
};

export default BackgroundImage;
