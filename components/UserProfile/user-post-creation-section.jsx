"use client";

import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import Image from "next/image";

import galleryIcon from "@/public/ImageIcons/gallery.png";
import UserAvatar from "../utils/UserAvatar";
import AddPostModal from "../Post/AddPostModal";
import { Separator } from "../ui/Separator";

const UserPostCreationSection = ({ user }) => {
  const { data: session } = useSession();
  const fileInputRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  const onFileChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    const images = [];
    const videos = [];

    fileArray.forEach((file) => {
      // Check if the file type is an image or video
      if (file.type.startsWith("image/")) {
        images.push(file);
      } else if (file.type.startsWith("video/")) {
        videos.push(file);
      }
    });

    // Set selected files (you can customize how you want to store images and videos)
    setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);

    // Preview images or videos (modify the function to handle previews as needed)
    previewImages(images);
    previewVideos(videos); // Assuming you have a separate function for video previews

    setOpen(true);
  };

  const previewVideos = (files) => {
    const videoUrls = files.map((file) => URL.createObjectURL(file));
    setVideoPreviews([...videoPreviews, ...videoUrls]);
  };

  const previewImages = (files) => {
    const promises = [];
    files.forEach((file) => {
      const reader = new FileReader();
      promises.push(
        new Promise((resolve, reject) => {
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        }),
      );
    });

    Promise.all(promises)
      .then((imageUrls) => {
        setImagePreviews([...imagePreviews, ...imageUrls]);
      })
      .catch((error) => console.error("Error loading images:", error));
  };
  return (
    <>
      {session?.user.id === user?.id && (
        <div className=" border pt-3 pb-1 px-5 rounded-2xl bg-white shadow-md drop-shadow-sm dark:bg-neutral-800 dark:border-0">
          <div className="flex flex-row items-center space-x-4">
            <UserAvatar
              className="h-10 w-10 "
              user={{
                name: session?.user.name || null || user?.name,
                image: session?.user.image || null || user?.image,
              }}
            />
            <AddPostModal
              openPostModal={open}
              setOpenPostModal={setOpen}
              parentSelectedFiles={selectedFiles}
              setParentSelectedFiles={setSelectedFiles}
              parentImagePreviews={imagePreviews}
              setParentImagePreviews={setImagePreviews}
            />
          </div>

          <Separator className="mt-3 dark:bg-neutral-700" />

          <div className="flex items-center justify-center my-1 ">
            <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
              <Image
                src="/ImageIcons/live.png"
                className="h-8 w-8"
                alt="Live video icon"
                width={32}
                height={32}
              />
              <span className="dark:text-neutral-100 text-sm">Live video</span>
            </div>
            <div className="flex flex-1 items-center justify-center space-x-3 py-1 dark:hover:bg-neutral-700 rounded-md">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onFileChange}
                style={{ display: "none" }}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-x-3 cursor-pointer"
              >
                <Image
                  src={galleryIcon}
                  className="h-8 w-8"
                  alt="Gallery icon"
                  width={32}
                  height={32}
                />
                <span className="dark:text-neutral-100 text-sm lg:block hidden">
                  Photo/Video
                </span>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center space-x-3 py-2 dark:hover:bg-neutral-700 rounded-md">
              <Image
                src="/ImageIcons/smile.png"
                className="h-7 w-7"
                alt="Feeling or activity icon"
                width={28}
                height={28}
              />
              <span className="dark:text-neutral-100 text-sm">
                Feeling/Activity
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPostCreationSection;
