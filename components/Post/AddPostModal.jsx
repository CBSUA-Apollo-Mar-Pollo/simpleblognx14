"use client";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import useCustomHooks from "@/hooks/use-custom-hooks";
import Link from "next/link";
import UserAvatar from "../utils/UserAvatar";
import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";
import Image from "next/image";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { SelectContent } from "@radix-ui/react-select";
import { ImagePlus, X } from "lucide-react";
import { UploadDropzone } from "@uploadthing/react";
import { LoaderContext } from "@/context/LoaderContext";
import ToolTipComp from "../utils/ToolTipComp";
import { uploadFiles } from "@/lib/uploadThing";

const AddPostModal = ({ session, user }) => {
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

  const {
    mutate: createBlog,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async () => {
      let images = [];
      const file = selectedFiles;
      try {
        const response = await uploadFiles("imageUploader", { files: file });
        images = response;
      } catch (error) {
        setErrorMessage(
          "Error uploading image, please upload an image with the extension of the following: jpeg, png"
        );
        throw new UploadError("Failed to upload image: " + error.message, 400);
      }

      const payload = {
        description,
        images,
      };

      const { data } = await axios.post("/api/blog", payload);
      return data;
    },
    onError: (err) => {
      console.log(err);
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
    setSelectedFiles([...selectedFiles, ...fileArray]);
    previewImages(fileArray);
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Input
          className="rounded-full dark:border-0 dark:bg-neutral-700"
          placeholder={`What's on your mind, ${
            session?.user.name.split(" ")[0] || user?.name.split(" ")[0]
          } ?`}
        />
      </DialogTrigger>
      <DialogContent className="min-w-[39vw] min-h-auto dark:bg-neutral-800 dark:border-0 p-0 dark:text-neutral-200 px-2">
        <DialogHeader className="pt-4 px-4">
          <DialogTitle className="text-2xl font-bold text-center">
            Create post
          </DialogTitle>
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
          <div className="grid items-center  max-h-[60vh] overflow-auto">
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

            {/* Image upload UI */}
            {toggleImageUpload && (
              <div className="flex items-center justify-center w-auto border  border-gray-300 dark:border-neutral-700 rounded-md p-2 relative my-2 mx-4">
                {selectedFiles.length > 0 ? (
                  <div
                    className="w-full"
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                  >
                    <div className="relative">
                      <Button
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
                        variant="secondary"
                        className="z-10 absolute top-2 right-4 bg-white text-neutral-800 gap-x-2 hover:bg-neutral-200 drop-shadow-md"
                      >
                        {" "}
                        <img
                          src="/ImageIcons/imageadd.png"
                          className="h-6 w-6"
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

                    {imagePreviews.length === 1 && (
                      <div>
                        {imagePreviews.map((imageUrl, index) => (
                          <div key={index} className="relative">
                            <img
                              src={imageUrl}
                              alt="profile image"
                              className="w-full h-auto object-cover"
                              style={{ aspectRatio: "10/9" }} // Example aspect ratio (adjust as needed)
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {imagePreviews.length === 2 && (
                      <div
                        className={`${
                          imagePreviews.length === 2 &&
                          "grid grid-cols-2 gap-x-1"
                        }`}
                      >
                        {imagePreviews.map((imageUrl, index) => (
                          <div key={index} className="relative">
                            <img
                              src={imageUrl}
                              alt="profile image"
                              className="w-full h-auto object-cover"
                              style={{ aspectRatio: "6  /10" }} // Example aspect ratio (adjust as needed)
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {imagePreviews.length === 3 && (
                      <div
                        className={`${
                          imagePreviews.length === 3 &&
                          "grid grid-cols-8 gap-x-1"
                        }`}
                      >
                        <div className="relative col-span-5 mt-1">
                          <img
                            src={imagePreviews[0]}
                            alt="profile image"
                            className="w-full h-auto object-cover"
                            style={{ aspectRatio: "7/11" }} // Example aspect ratio (adjust as needed)
                          />
                        </div>
                        <div className="mt-[2px] flex flex-col space-y-[4px] col-span-3">
                          {imagePreviews.map((imageUrl, index) => {
                            if (index === 0) {
                              return null;
                            }

                            return (
                              <div key={index} className="relative">
                                <img
                                  src={imageUrl}
                                  alt="profile image"
                                  className="w-full h-auto object-cover"
                                  style={{ aspectRatio: "9/12" }} // Example aspect ratio (adjust as needed)
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {imagePreviews.length === 4 && (
                      <div className="flex flex-col">
                        <div className="relative grid grid-cols-2">
                          <img
                            src={imagePreviews[0]}
                            alt="profile image"
                            className="w-full h-auto object-cover"
                            style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                          />
                          <img
                            src={imagePreviews[1]}
                            alt="profile image"
                            className="w-full h-auto object-cover"
                            style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                          />
                        </div>
                        <div className="mt-[2px] grid grid-cols-2">
                          {imagePreviews.map((imageUrl, index) => {
                            if (index === 0) {
                              return null;
                            }

                            if (index === 1) {
                              return null;
                            }

                            return (
                              <div key={index} className="relative">
                                <img
                                  src={imageUrl}
                                  alt="profile image"
                                  className="w-full h-auto object-cover"
                                  style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {imagePreviews.length === 5 && (
                      <div className="flex flex-col">
                        <div className="relative grid grid-cols-2">
                          <img
                            src={imagePreviews[0]}
                            alt="profile image"
                            className="w-full h-auto object-cover"
                            style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                          />
                          <img
                            src={imagePreviews[1]}
                            alt="profile image"
                            className="w-full h-auto object-cover"
                            style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                          />
                        </div>
                        <div className="mt-[2px] grid grid-cols-3">
                          {imagePreviews.map((imageUrl, index) => {
                            if (index === 0) {
                              return null;
                            }

                            if (index === 1) {
                              return null;
                            }

                            return (
                              <div key={index} className="relative">
                                <img
                                  src={imageUrl}
                                  alt="profile image"
                                  className="w-full h-auto object-cover"
                                  style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {imagePreviews.length >= 6 && (
                      <div className="flex flex-col">
                        <div className="relative grid grid-cols-2">
                          <img
                            src={imagePreviews[0]}
                            alt="profile image"
                            className="w-full h-auto object-cover"
                            style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                          />
                          <img
                            src={imagePreviews[1]}
                            alt="profile image"
                            className="w-full h-auto object-cover"
                            style={{ aspectRatio: "12/12" }} // Example aspect ratio (adjust as needed)
                          />
                        </div>
                        <div className="mt-[2px] grid grid-cols-3">
                          {imagePreviews.map((imageUrl, index) => {
                            if (index === 0) {
                              return null;
                            }

                            if (index === 1) {
                              return null;
                            }

                            if (index >= 5) {
                              return null;
                            }

                            return (
                              <div key={index} className="relative ">
                                <img
                                  src={imageUrl}
                                  alt="profile image"
                                  className={`w-full h-auto object-cover ${
                                    index === 4 && "opacity-55"
                                  }`}
                                  style={{ aspectRatio: "5/5" }} // Example aspect ratio (adjust as needed)
                                />
                                {index === 4 && (
                                  <span className="absolute inset-0 flex items-center justify-center text-[3em]">
                                    +
                                    {imagePreviews.length > 5 &&
                                      imagePreviews.length - 5}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="absolute right-2 top-2 py-0 px-3 rounded-full bg-gray-100 dark:bg-neutral-400 z-10"
                      onClick={() =>
                        setToggleImageUpload((prevState) => !prevState)
                      }
                    >
                      <X className="w-4 h-4 font-bold" />
                    </Button>
                    <div
                      className="py-16 hover:bg-neutral-200 dark:hover:bg-neutral-600 w-full cursor-pointer relative"
                      onDrop={handleFileDrop}
                      onDragOver={handleDragOver}
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
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
            )}
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

export default AddPostModal;
