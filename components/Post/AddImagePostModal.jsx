"use client";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Textarea } from "../ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import useCustomHooks from "@/hooks/use-custom-hooks";
import UserAvatar from "../utils/UserAvatar";
import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";
import Image from "next/image";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { SelectContent } from "@radix-ui/react-select";
import { AlertCircle, ImagePlus, Pencil, Play, X } from "lucide-react";
import { UploadDropzone } from "@uploadthing/react";
import { LoaderContext } from "@/context/LoaderContext";
import ToolTipComp from "../utils/ToolTipComp";
import { uploadFiles } from "@/lib/uploadThing";
import EmojiPicker from "../PostComment/EmojiPicker";
import ImagePreviewCreatePost from "./image-preview-create-post";
import { cn } from "@/lib/utils";

const AddGalleryPostModal = ({ session, user, communityId }) => {
  const [toggleButton, setToggleButton] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const { signinToast } = useCustomHooks();
  const [toggleImageUpload, setToggleImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  class UploadError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isUploadError = true; // Optional property to differentiate upload errors
    }
  }

  const {
    mutate: createBlog,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async () => {
      let images = [];
      let videos = [];
      const files = selectedFiles;

      for (const file of files) {
        if (file.type.startsWith("image/")) {
          try {
            const response = await uploadFiles("imageUploader", {
              files: [file],
            }); // Upload the individual file
            images = [...images, ...response]; // Append to images array
          } catch (error) {
            setErrorMessage(
              "Error uploading image, please upload an image with the extension of the following: jpeg, png"
            );
            throw new UploadError(
              "Failed to upload image: " + error.message,
              400
            );
          }
        } else if (file.type.startsWith("video/")) {
          try {
            const response = await uploadFiles("videoUploader", {
              files: [file],
            }); // Upload the individual file
            videos = [...videos, ...response]; // Append to images array
          } catch (error) {
            setErrorMessage(
              "Error uploading video, please upload a video file."
            );
            throw new UploadError(
              "Failed to upload video: " + error.message,
              400
            );
          }
        } else {
          setErrorMessage("Unsupported file type.");
        }
      }

      const payload = {
        description,
        images,
        videos,
        communityId,
      };

      const { data } = await axios.post("/api/blog", payload);
      return data;
    },
    onError: (err) => {
      setIsLoading(false);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setOpen(false);
          return signinToast();
        }

        if (err.response?.status === 400) {
          return toast({
            title: "Error",
            description: err.response.data,
            variant: "destructive",
          });
        }

        if (err.response?.status === 500) {
          return toast({
            title: "Error",
            description: "Couldn't create the blog",
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setImageUrl("");
      setDescription("");
      setOpen(false);
      setIsLoading(false);
      window.location.reload();
    },
  });

  // Function to handle file selection from input
  const handleFileSelect = (event) => {
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
  };

  // Function to handle file drop
  const handleFileDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const fileArray = Array.from(files);
    setSelectedFiles([...selectedFiles, ...fileArray]);
    previewImages(fileArray);
  };

  // Prevent default behavior on drag over to enable drop
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to preview images
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
        })
      );
    });

    Promise.all(promises)
      .then((imageUrls) => {
        setImagePreviews([...imagePreviews, ...imageUrls]);
      })
      .catch((error) => console.error("Error loading images:", error));
  };

  const previewVideos = (files) => {
    const videoUrls = files.map((file) => URL.createObjectURL(file));
    setVideoPreviews([...videoPreviews, ...videoUrls]);
  };

  const handleMouseEnter = (id) => {
    setToggleButton(true);
  };
  const handleMouseLeave = () => {
    setToggleButton(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-x-3">
        <img src="/ImageIcons/gallery.png" className="h-8 w-8" />
        <span className="dark:text-neutral-100 text-sm lg:block hidden">
          Photo/Video
        </span>
      </DialogTrigger>
      <DialogContent className="[&>button]:hidden  min-w-[30vw] min-h-auto  dark:bg-neutral-800 dark:border-0 p-0 dark:text-neutral-200 px-2">
        <DialogHeader className="pt-4 px-4">
          <DialogTitle className="text-2xl font-bold text-center">
            Create post
          </DialogTitle>

          <DialogClose asChild>
            <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
          </DialogClose>
        </DialogHeader>
        <Separator className="dark:bg-neutral-700 border-1" />
        <div className="grid gap-3 py-1">
          <div className="flex items-center gap-2 px-4">
            <UserAvatar
              className="h-10 w-10 "
              user={{
                name: session?.user.name || null || user?.name,
                image: session?.user.image || null || user?.image,
              }}
            />
            <div className="space-y-1">
              <p className="font-semibold text-gray-700 text-base pl-1 dark:text-neutral-200">
                {session?.user.name || user?.name}
              </p>
              <Select>
                <SelectTrigger className="h-6 w-24 font-medium text-sm focus:ring-0 dark:bg-neutral-600 dark:border-0">
                  <SelectValue
                    placeholder="Public"
                    className="font-semibold "
                  />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-neutral-800 dark:border-0 border w-[110px] rounded">
                  <SelectItem
                    value="Private"
                    className="cursor-pointer font-medium "
                  >
                    Private
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid items-center max-h-[50vh] overflow-auto">
            <div className="flex items-center">
              <Textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={1}
                placeholder={`What's on your mind, ${
                  session?.user.name.split(" ")[0] || user?.name.split(" ")[0]
                }?`}
                className="dark:bg-neutral-800 dark:placeholder-neutral-300 focus-visible:ring-transparent focus:border-gray-500 focus:border-2 min-h-10 text-lg border-none resize-none px-4"
              />
              <EmojiPicker
                triggerClassName="mr-5 bg-transparent"
                onChange={(emoji) => setDescription(description + emoji)}
              />
            </div>

            {/* Image upload UI */}
            <div
              onMouseEnter={() => handleMouseEnter()}
              onMouseLeave={() => handleMouseLeave()}
              className="flex items-center justify-center w-auto border  border-gray-300 dark:border-neutral-700 rounded-md p-2 relative my-2 mx-4"
            >
              {selectedFiles.length > 0 ? (
                <div
                  className="w-full"
                  onDrop={handleFileDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="relative">
                    {toggleButton && (
                      <>
                        <Button
                          variant="secondary"
                          className="z-10 absolute top-2 left-56 bg-white text-neutral-800 gap-x-2 hover:bg-neutral-200 drop-shadow-lg"
                        >
                          <Pencil className="fill-black stroke-transparent  h-5 w-5" />
                          <span className="text-sm font-semibold">Edit</span>
                        </Button>
                        <Button
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                          variant="secondary"
                          className="z-10 absolute top-2 left-4 bg-white text-neutral-800 gap-x-2 hover:bg-neutral-200 drop-shadow-md"
                        >
                          <img
                            src="/ImageIcons/imageadd.png"
                            className="h-6 w-6"
                          />
                          <span className="text-sm font-semibold">
                            Add Photos/Videos
                          </span>
                        </Button>
                      </>
                    )}
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      accept="image/*, video/*"
                      onChange={handleFileSelect}
                    />
                  </div>

                  {imagePreviews.length !== 0 && (
                    <ImagePreviewCreatePost imagePreviews={imagePreviews} />
                  )}

                  {videoPreviews.length !== 0 && (
                    <div
                      className={cn("relative", {
                        "opacity-90": toggleButton,
                      })}
                    >
                      <video
                        className="object-cover w-full h-full rounded-lg z-20"
                        preload="metadata"
                        playsInline
                        loop
                        muted
                      >
                        <source src={videoPreviews[0]} type="video/mp4" />
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
              ) : (
                <>
                  <div
                    className="py-16 hover:bg-neutral-200 dark:hover:bg-neutral-600 w-full cursor-pointer"
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
                    <input
                      id="fileInput"
                      type="file"
                      multiple
                      className="hidden"
                      accept="image/*, video/*"
                      onChange={handleFileSelect}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className=" border border-gray-300 dark:border-neutral-600 rounded-md px-4 mx-4 flex justify-between items-center py-1 ">
            <h1 className="font-semibold text-gray-600 dark:text-neutral-300">
              Add to your post
            </h1>
            <div>
              <ToolTipComp content="Add Photo/Video">
                <Button
                  variant="ghost"
                  className="hover:bg-gray-100 p-2 rounded-full cursor-pointer focus:ring-0"
                  onClick={() =>
                    setToggleImageUpload((prevState) => !prevState)
                  }
                >
                  <ImagePlus className="text-green-600 " />
                </Button>
              </ToolTipComp>
            </div>
          </div>
        </div>
        {isError && (
          <div className="flex items-start gap-x-2 mx-6 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span className="text-xs">{errorMessage}</span>
          </div>
        )}
        <DialogFooter className="py-2 mx-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-500"
            type="submit"
            disabled={isLoading}
            onClick={() => {
              createBlog();
              setIsLoading(true);
              setLoaderDescription("Posting");
            }}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGalleryPostModal;
