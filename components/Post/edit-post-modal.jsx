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
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import useCustomHooks from "@/hooks/use-custom-hooks";
import UserAvatar from "../utils/UserAvatar";
import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import { SelectContent } from "@radix-ui/react-select";
import { Dot, Globe, ImagePlus, Pen, Pencil, Play, X } from "lucide-react";
import { LoaderContext } from "@/context/LoaderContext";
import ToolTipComp from "../utils/ToolTipComp";
import { uploadFiles } from "@/lib/uploadThing";
import { useSession } from "next-auth/react";
import qs from "query-string";
import ImagePreviewEditPost from "./image-preview-edit-post";
import EmojiPicker from "../PostComment/EmojiPicker";
import { cn, formatTimeToNow } from "@/lib/utils";
import { Icons } from "../utils/Icons";
import { handleRemoveImage } from "@/actions/handleRemovImage";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import MultipleImageRender from "./multiple-image-render";
import Link from "next/link";

const EditPostModal = ({ blog, deleteImage, sharedPost }) => {
  console.log(blog, "edit post blog");
  const { data: session } = useSession();
  const [description, setDescription] = useState(blog?.description || "");
  const [open, setOpen] = useState(false);
  const { signinToast } = useCustomHooks();
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(
    blog.image !== null ? [...blog.image] : []
  );
  const [videoPreviews, setVideoPreviews] = useState(
    blog.video !== null ? [...blog.video] : []
  );

  const [isHovered, setIsHovered] = useState(false);
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

  const isBase64ImageDataURL = (str) => {
    if (typeof str !== "string" || str.length < 50) return false; // Minimum length for Base64 data
    return /^data:image\/([a-zA-Z]*);base64,/.test(str);
  };

  const removeImage = async (index) => {
    let indexSum = 0;
    imagePreviews.map((img, index) => {
      if (typeof img === "object") {
        indexSum += index;
      }
    });

    setImagePreviews((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });

    setSelectedFiles((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(indexSum - index, 1);
      return newImages;
    });
  };

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

        <div className="relative">
          <div className="grid gap-3 py-1">
            <SimpleBar style={{ maxHeight: "60vh" }}>
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
              <div className="grid items-center ">
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

                {/* shared post content */}
                {sharedPost ? (
                  <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 pt-1 mt-2 mb-3 mr-1">
                    <MultipleImageRender blog={sharedPost} />

                    {/* the shared post description */}
                    <div className=" gap-1 my-2 ml-1">
                      {/* profile image  */}
                      <Link href={`/user/${sharedPost?.author.id}`}>
                        <div className="flex items-center gap-1">
                          <UserAvatar
                            post="post"
                            className="h-10 w-10 "
                            user={{
                              handleName: sharedPost.author?.handleName,
                              bio: sharedPost.author?.bio,
                              birthdate: sharedPost.author?.birthdate,
                              name: sharedPost.author?.name || null,
                              image: sharedPost.author?.image || null,
                            }}
                          />

                          <div className="px-2 pt-1">
                            <div className="flex items-center gap-x-1">
                              <p className="font-semibold text-sm">
                                {sharedPost?.author?.name}
                              </p>
                              {sharedPost?.userStatus && (
                                <span className="text-[13px] mt-[1px] font-light">
                                  {sharedPost?.userStatus}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center">
                              <p className=" text-xs text-gray-600 dark:text-neutral-200 ">
                                {formatTimeToNow(
                                  new Date(sharedPost?.createdAt)
                                )}
                              </p>
                              <Dot className="-mx-1 text-gray-600 dark:text-neutral-200" />
                              <Globe className="h-3 w-3 text-gray-600 dark:text-neutral-200" />
                            </div>
                          </div>
                        </div>
                      </Link>

                      {sharedPost?.description && (
                        <p className=" text-justify py-2 text-sm leading-relaxed mb-1 font-medium">
                          {sharedPost.description}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    onMouseEnter={handleMouseHover}
                    onMouseLeave={handleMouseLeave}
                    className="flex items-center justify-center w-auto border  border-gray-300 dark:border-neutral-700 rounded-md p-2 relative my-2 mx-4"
                  >
                    {/* Image upload UI */}

                    {selectedFiles.length > 0 ||
                    imagePreviews.length !== 0 ||
                    videoPreviews.length !== 0 ? (
                      <div
                        className="w-full"
                        onDrop={handleFileDrop}
                        onDragOver={handleDragOver}
                      >
                        <div
                          className={cn(
                            "relative",
                            isHovered ? "block" : "hidden"
                          )}
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
                                <span className=" text-neutral-800 font-semibold text-[15px]">
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
                                  // remove one image if there is only one image
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
                              // show modal for removing multiple images
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
                                            if (isBase64ImageDataURL(img)) {
                                              removeImage(index, img);
                                            } else {
                                              setIsLoading(true);
                                              setLoaderDescription(
                                                `Removing ${img.name}`
                                              );
                                              handleRemoveImage(img.key)
                                                .then((res) => {
                                                  imagePreviews.splice(
                                                    index,
                                                    1
                                                  );
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
                          <ImagePreviewEditPost
                            imagePreviews={imagePreviews}
                            blog={blog}
                          />
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
                              <source
                                src={videoPreviews[0].url}
                                type="video/mp4"
                              />
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

              {sharedPost ? null : (
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
              )}
            </SimpleBar>
          </div>
        </div>
        <DialogFooter className="py-1 mx-4 ">
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
