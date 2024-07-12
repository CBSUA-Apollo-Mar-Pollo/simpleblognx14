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
import { Textarea } from "../ui/Textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import useCustomHooks from "@/hooks/use-custom-hooks";
import UserAvatar from "../utils/UserAvatar";
import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { SelectContent } from "@radix-ui/react-select";
import { ImageMinus, ImagePlus, Pen, Pencil, X } from "lucide-react";
import { LoaderContext } from "@/context/LoaderContext";
import ToolTipComp from "../utils/ToolTipComp";
import { uploadFiles } from "@/lib/uploadThing";
import { useSession } from "next-auth/react";
import qs from "query-string";
import ImagePreviewEditPost from "./image-preview-edit-post";
import EmojiPicker from "../PostComment/EmojiPicker";
import { cn } from "@/lib/utils";
import { Icons } from "../utils/Icons";
import { handleRemoveImage } from "@/actions/handleRemovImage";

const EditPostModal = ({ blog, deleteImage }) => {
  const { data: session } = useSession();
  const [description, setDescription] = useState(blog?.description || "");
  const [open, setOpen] = useState(false);
  const { signinToast } = useCustomHooks();
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(
    blog.image !== null ? [...blog.image] : []
  );

  const [isHovered, setIsHovered] = useState(false);

  console.log(selectedFiles, "selectedFiles");

  console.log(blog.image, "blog image");

  const { mutate: updatePost, isLoading } = useMutation({
    mutationFn: async () => {
      let images = [];
      const file = selectedFiles;

      if (selectedFiles.length !== 0) {
        await uploadFiles("imageUploader", {
          files: file,
        })
          .then(async (response) => {
            console.log(response, "response from image uploader");
            images = response;
          })
          .catch((error) => {
            return toast({
              title: "Error",
              description: "Error uploading file",
              variant: "destructive",
            });
          });
      }

      const regex = /^data:image\/([a-zA-Z]*);base64,([^\"]*)$/;

      imagePreviews.map((img, index) => {
        if (regex.test(img)) {
          imagePreviews.splice(index, 1);
        }
      });

      const payload = {
        description,
        images: [...imagePreviews, ...images],
      };

      const url = qs.stringifyUrl({
        url: "/api/blog",
        query: {
          postId: blog.id,
        },
      });

      const { data } = await axios.patch(url, payload);
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

  const handleMouseHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function isBase64ImageDataURL(str) {
    // Regular expression to check if the string starts with data:image/[file-type];base64,
    const regex = /^data:image\/([a-zA-Z]*);base64,([^\"]*)$/;
    return regex.test(str);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-x-2 cursor-pointer py-2 dark:hover:bg-neutral-600 w-full rounded px-2 hover:bg-gray-100">
        <Pen className="h-6 w-6 dark:text-neutral-300" />
        <span className="font-bold dark:text-neutral-300 text-[15px]">
          Edit post
        </span>
      </DialogTrigger>
      <DialogContent className=" min-w-[39vw] min-h-auto dark:bg-neutral-800 dark:border-0 p-0 dark:text-neutral-200 px-2">
        <DialogHeader className="pt-4 px-4">
          <DialogTitle className="text-2xl font-bold text-center">
            Edit post
          </DialogTitle>
        </DialogHeader>
        <Separator className="dark:bg-neutral-700 border-1" />
        <div className="grid gap-3 py-1">
          <div className="flex items-center gap-2 px-4">
            <UserAvatar
              className="h-10 w-10"
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
                  session?.user.name.split(" ")[0]
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
              onMouseEnter={handleMouseHover}
              onMouseLeave={handleMouseLeave}
              className="flex items-center justify-center w-auto border  border-gray-300 dark:border-neutral-700 rounded-md p-2 relative my-2 mx-4"
            >
              {selectedFiles.length > 0 || imagePreviews.length !== 0 ? (
                <div
                  className="w-full"
                  onDrop={handleFileDrop}
                  onDragOver={handleDragOver}
                >
                  <div
                    className={cn("relative", isHovered ? "block" : "hidden")}
                  >
                    <div
                      className={cn(
                        "absolute top-2 left-4 z-10 flex items-center w-full gap-x-2",
                        imagePreviews.length === 1 && "justify-between"
                      )}
                    >
                      <div className="flex items-center gap-x-2">
                        <Button className="flex items-center gap-x-2 bg-neutral-50 hover:bg-neutral-200">
                          <Pencil className="h-5 w-5 text-neutral-800" />
                          <span className=" text-neutral-800 font-bold text-[15px]">
                            Edit
                          </span>
                        </Button>
                        <Button
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                          variant="secondary"
                          className="  bg-white text-neutral-800 gap-x-2 hover:bg-neutral-200 drop-shadow-md"
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

                      {imagePreviews.length === 1 ? (
                        <Button
                          onClick={() => {
                            handleRemoveImage(imagePreviews[0].key)
                              .then((res) => {
                                imagePreviews.splice(0, 1);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                          className="rounded-full px-2 bg-neutral-800/50  hover:bg-neutral-800 h-8 w-8 mr-7"
                          variant="ghost"
                        >
                          <X
                            size="icon"
                            className="h-[20px] w-[20px] text-neutral-50 "
                          />
                        </Button>
                      ) : (
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
                          <DialogContent className="bg-neutral-800 text-neutral-50 outline-none border-none min-w-[50vw]">
                            <DialogHeader>
                              <DialogTitle className="font-bold text-neutral-50">
                                Select image to be removed
                              </DialogTitle>
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
                                      handleRemoveImage(img.key)
                                        .then((res) => {
                                          imagePreviews.splice(index, 1);
                                          blog.image.splice(index, 1);
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
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
                  <ImagePreviewEditPost
                    imagePreviews={imagePreviews}
                    blog={blog}
                  />
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
        <DialogFooter className="py-2 mx-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-500"
            type="submit"
            disabled={isLoading}
            onClick={() => {
              updatePost();
              setIsLoading(true);
              setLoaderDescription("Posting");
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
