import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import UpdateCoverPhotoButton from "./UpdateCoverPhotoButton";
import ProfilePIc from "./profile-pic";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Cropper from "react-easy-crop";

const BackgroundImage = ({
  imageSrc,
  setImageSrc,
  setCroppedAreaPixels,
  setOriginalFile,
  user,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef(null);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file); // 👈 keep original file

    setImageSrc(URL.createObjectURL(file));
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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

          <div className="absolute bottom-5 right-8">
            <Button
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className="flex items-center gap-x-2 bg-white hover:bg-neutral-200 shadow-md drop-shadow-md"
            >
              <Camera className="text-neutral-50 h-6 w-6 fill-black dark:fill-neutral-200 dark:stroke-neutral-700 dark:hover:stroke-neutral-600" />
              <span className="font-semibold text-sm text-black">
                {user.backgroundImage ? "Edit cover photo" : "Add cover photo"}
              </span>
            </Button>
          </div>

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
