"use client";

import { handleRemoveImage } from "@/actions/handleRemovImage";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Icons } from "@/components/utils/Icons";
import { cn } from "@/lib/utils";
import { ImagePlus, Pencil, Play, X } from "lucide-react";
import React, { useState } from "react";
import ImagePreviewEditPost from "../image-preview-edit-post";
import Image from "next/image";

const EditPostContent = ({
  blog,
  selectedFiles,
  imagePreviews,
  videoPreviews,
  handleFileDrop,
  handleDragOver,
  handleFileSelect,
  removeImage,
  isBase64ImageDataURL,
  setIsLoading,
  setLoaderDescription,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isPostHaveImageOrVideos =
    selectedFiles.length > 0 ||
    imagePreviews.length !== 0 ||
    videoPreviews.length !== 0;

  return (
    <div
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      className="flex items-center justify-center w-auto"
    >
      {isPostHaveImageOrVideos && (
        <div
          className="w-full"
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
        >
          <div className={cn("relative", isHovered ? "block" : "hidden")}>
            <div
              className={cn(
                "absolute top-2 left-4 z-10 flex items-center w-full gap-x-2 px-2",
                imagePreviews.length === 1 && "justify-between"
              )}
            >
              <div className="flex items-center gap-x-2">
                <Button className="flex items-center gap-x-2 bg-neutral-50 hover:bg-neutral-200 drop-shadow-md">
                  <Pencil className="h-5 w-5 text-neutral-800" />
                  <span className=" text-neutral-800 font-semibold text-[15px]">
                    Edit
                  </span>
                </Button>
                <Button
                  onClick={() => document.getElementById("fileInput").click()}
                  variant="secondary"
                  className="  bg-white text-neutral-800 gap-x-2 hover:bg-neutral-200 drop-shadow-md"
                >
                  {" "}
                  <Image
                    src="/ImageIcons/imageadd.png"
                    className="h-6 w-6"
                    alt="Add image icon"
                    width={24}
                    height={24}
                  />
                  <span className="text-sm font-semibold">
                    Add Photos/Videos
                  </span>
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/*, video/*"
                  onChange={handleFileSelect}
                />
              </div>

              {/* remove one image if there is only one image */}
              {imagePreviews.length === 1 && (
                <Button
                  onClick={() => {
                    if (isBase64ImageDataURL(imagePreviews[0])) {
                      removeImage(0, imagePreviews[0]);
                    } else {
                      setIsLoading(true);
                      setLoaderDescription(`Removing ${imagePreviews[0].name}`);
                      handleRemoveImage(imagePreviews[0].key)
                        .then((res) => {
                          imagePreviews.splice(0, 1);
                          blog.image.splice(0, 1);
                          setIsLoading(false);
                        })
                        .catch((err) => {
                          console.log(err);
                          setIsLoading(false);
                        });
                    }
                  }}
                  className="rounded-full px-2 bg-neutral-800/80  hover:bg-neutral-800 h-8 w-8 mr-10"
                  variant="ghost"
                >
                  <X
                    size="icon"
                    className="h-[20px] w-[20px] text-neutral-50 "
                  />
                </Button>
              )}

              {/* show a modal for removing multiple images */}
              {imagePreviews.length > 1 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="rounded px-2 bg-neutral-100 hover:bg-neutral-300 gap-x-2"
                      variant="ghost"
                    >
                      <Icons.RemoveImageIcon
                        size="icon"
                        className="h-[25px] w-[25px] text-neutral-800"
                      />
                      <span>Remove image</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className=" [&>button]:hidden dark:bg-neutral-800 text-neutral-50 outline-none border-none min-w-[50vw]">
                    <DialogHeader>
                      <DialogTitle className="font-bold text-black dark:text-neutral-50">
                        Select image to be removed
                      </DialogTitle>

                      <DialogClose asChild>
                        <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-200 text-black dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
                      </DialogClose>
                    </DialogHeader>

                    <div
                      className={cn(
                        "grid  gap-2 max-h-[60vh] overflow-y-auto pr-2",
                        imagePreviews.length === 2
                          ? "grid-cols-2"
                          : "grid-cols-3"
                      )}
                    >
                      {imagePreviews.map((img, index) => (
                        <div className="relative" key={img.key}>
                          <img
                            src={img.url || img}
                            alt={img.name || null}
                            className="w-full h-auto object-cover rounded-lg"
                            style={{ aspectRatio: "6/7" }}
                          />
                          <Button
                            onClick={() => {
                              if (isBase64ImageDataURL(img)) {
                                removeImage(index, img);
                              } else {
                                setIsLoading(true);
                                setLoaderDescription(`Removing ${img.name}`);
                                handleRemoveImage(img.key)
                                  .then((res) => {
                                    imagePreviews.splice(index, 1);
                                    blog.image.splice(index, 1);
                                    setIsLoading(false);
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    setIsLoading(false);
                                  });
                              }
                            }}
                            className="absolute top-1 right-1 rounded-full px-2 bg-neutral-800/80  hover:bg-neutral-800 h-8 w-8"
                            variant="ghost"
                          >
                            <X
                              size="icon"
                              className="h-[20px] w-[20px] text-neutral-50 "
                            />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* preview the images */}
          {blog.image && (
            <ImagePreviewEditPost imagePreviews={imagePreviews} blog={blog} />
          )}

          {imagePreviews && !blog.image && (
            <ImagePreviewEditPost imagePreviews={imagePreviews} />
          )}

          {blog.video && (
            <div className="relative flex flex-col items-center hover:cursor-pointer bg-neutral-950">
              <video
                className="object-cover border-0 max-h-[55vh]"
                preload="metadata"
                playsInline
                loop
                muted
              >
                <source src={videoPreviews[0].url} type="video/mp4" />
              </video>
              <Button
                variant="ghost"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  border-[4px] rounded-full h-24 w-28 px-[10px] py-[50px] bg-neutral-900/60 hover:bg-neutral-900/60"
              >
                <Play className="h-16 w-16 text-neutral-50 fill-white ml-2" />
              </Button>
              <Button
                variant="ghost"
                className="absolute top-2 right-3 bg-neutral-800 rounded-full px-[10px] hover:bg-neutral-600"
              >
                <X className="stroke-2 text-white h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* {!isPostHaveImageOrVideos && (
        <>
          {!blog?.textBackgroundStyle && (
            <div
              className="py-16 hover:bg-neutral-200 dark:hover:bg-neutral-600 w-full cursor-pointer  border  border-gray-300 dark:border-neutral-700 rounded-md  relative my-2 mx-4"
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="dark:bg-neutral-700 py-2 px-2 rounded-full">
                    <ImagePlus className="h-7 w-7" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-center font-medium text-[17px] dark:text-neutral-100">
                    Add Photos/Videos
                  </p>
                  <span className="text-xs dark:text-neutral-400">
                    or drag and drop
                  </span>
                </div>
              </div>
           
            </div>
          )}
        </>
      )} */}

      <input
        id="fileInput"
        type="file"
        multiple
        className="hidden"
        accept="image/*, video/*"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default EditPostContent;
