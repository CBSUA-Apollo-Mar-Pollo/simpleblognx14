"use client";
import React, { useContext, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import useCustomHooks from "@/hooks/use-custom-hooks";
import UserAvatar from "../utils/UserAvatar";
import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";
import {
  ALargeSmall,
  AlertCircle,
  ChevronLeft,
  ImagePlus,
  LayoutGrid,
  Pencil,
  Triangle,
  X,
} from "lucide-react";
import { LoaderContext } from "@/context/LoaderContext";
import { uploadFiles } from "@/lib/uploadThing";
import EmojiPicker from "../PostComment/EmojiPicker";
import ImagePreviewCreatePost from "./image-preview-create-post";
import { Icons } from "../utils/Icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import PostAudienceSelection from "./post-audience-selection";
import { useSession } from "next-auth/react";

const AddPostModal = ({
  openPostModal,
  setOpenPostModal,
  parentSelectedFiles,
  setParentSelectedFiles,
  parentImagePreviews,
  setParentImagePreviews,
  user,
  communityId,
}) => {
  const [localOpen, setLocalOpen] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { signinToast } = useCustomHooks();
  const [imageUrl, setImageUrl] = useState("");
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleTextBackgroundColor, setToggleTextBackgroundColor] =
    useState(false);

  const fileInputRef = useRef(null);

  const [localSelectedFiles, setLocalSelectedFiles] = useState([]);
  const [localImagePreviews, setLocalImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(null);

  // state for if the user is canceling the post with image or description
  const [isDiscarding, setIsDiscarding] = useState(false);

  const [isPostAudienceActive, setIsPostAudienceActive] = useState(false);

  const solidBackgroundColors = ["#696969", "#7f00ba", "#cf001c", "#000000"];

  const open = openPostModal ?? localOpen;
  const setOpen = setOpenPostModal ?? setLocalOpen;

  const selectedFiles = parentSelectedFiles ?? localSelectedFiles;
  const setSelectedFiles = setParentSelectedFiles ?? setLocalSelectedFiles;

  const imagePreviews = parentImagePreviews ?? localImagePreviews;
  const setImagePreviews = setParentImagePreviews ?? setLocalImagePreviews;

  const gradientBackgroundColors = [
    {
      grayToBlack: {
        from: "#3c4250",
        to: "#0e1015",
      },
      purpleToPink: {
        from: "#6e2de7",
        to: "#ff3cd3",
      },
      purpleToOrange: {
        from: "#8e2de2",
        to: "#f27121",
      },
      indigoToCyan: {
        from: "#4b6cb7",
        to: "#182848",
      },
      redToYellow: {
        from: "#f12711",
        to: "#f5af19",
      },
      sunset: {
        from: "#0b486b",
        to: "#f56217",
      },
      skyToPeach: {
        from: "#00c6ff",
        to: "#f7797d",
      },
      royal: {
        from: "#141e30",
        to: "#243b55",
      },
    },
  ];

  const gradients = gradientBackgroundColors[0];

  const {
    mutate: createBlog,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async () => {
      let images = [];
      const file = selectedFiles;
      if (selectedFiles.length > 0) {
        try {
          const response = await uploadFiles("imageUploader", { files: file });
          images = response;
        } catch (error) {
          setErrorMessage(
            "Error uploading image, please upload an image with the extension of the following: jpeg, png",
          );
          throw new UploadError(
            "Failed to upload image: " + error.message,
            400,
          );
        }
      }

      const payload = {
        description,
        selectedBackgroundColor,
        images,
        communityId,
      };

      const { data } = await axios.post("/api/blog", payload);
      return data;
    },
    onError: (err) => {
      setIsLoading(false);
      console.log(err);
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
    onSuccess: (newPost) => {
      setImageUrl("");
      setDescription("");
      setOpen(false);
      setIsLoading(false);

      // Update the query cache with the new post
      queryClient.setQueryData(["get-posts-infinite-query"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: [[newPost, ...oldData.pages[0]], ...oldData.pages.slice(1)],
        };
      });

      // Don't invalidate or refresh - just keep the optimistic update
      // This prevents the post from disappearing due to cache revalidation
    },
    onSettled: () => {
      setSelectedBackgroundColor(null);
      setSelectedFiles([]);
      setImagePreviews([]);
      setDescription("");
      setVideoPreviews([]);
    },
  });

  // Function to handle file selection from input
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
        }),
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

  const handleOpenChangePostModal = (nextOpen) => {
    const hasUnsavedChanges =
      selectedFiles.length > 0 || description.length > 0;

    if (!nextOpen && hasUnsavedChanges) {
      setIsDiscarding(true);

      // 🚫 Prevent close by NOT updating open state
      return;
    }

    setOpen(nextOpen);
  };

  const handleClickDiscard = () => {
    setIsDiscarding(false);
    setOpen(false);
  };

  const handleClickDiscardPost = () => {
    setSelectedBackgroundColor(null);
    setSelectedFiles([]);
    setImagePreviews([]);
    setDescription("");
    setVideoPreviews([]);
    setOpen(false);
    setIsDiscarding(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChangePostModal}>
        <DialogTrigger className="w-full">
          <Input
            className="rounded-full bg-neutral-50 dark:border-0 dark:bg-neutral-700 hover:cursor-pointer hover:bg-neutral-100"
            placeholder={`What's on your mind, ${
              session?.user.name.split(" ")[0] || user?.name.split(" ")[0]
            } ?`}
          />
        </DialogTrigger>

        <DialogContent className="[&>button]:hidden  min-w-[35vw]   dark:bg-neutral-800  dark:border-0 p-0 dark:text-neutral-200 rounded-xl">
          {/* Create post contest */}
          {!isPostAudienceActive && (
            <>
              <DialogHeader className="pt-4 px-4">
                <DialogTitle className="text-xl font-bold text-center">
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
                    className="h-12 w-12 "
                    user={{
                      name: session?.user.name || null || user?.name,
                      image: session?.user.image || null || user?.image,
                    }}
                  />
                  <div className="space-y-1">
                    <p className="font-semibold text-[15px] pl-1 dark:text-neutral-200">
                      {session?.user.name || user?.name}
                    </p>
                    <button
                      onClick={() => setIsPostAudienceActive(true)}
                      className="flex items-center gap-x-1 bg-neutral-200 dark:bg-neutral-700 px-3 py-1 rounded-lg"
                    >
                      <Icons.earthIcon className="h-3.5 w-3.5 dark:fill-white" />
                      <span className="text-[13px] font-semibold">Public</span>
                      <Triangle className="rotate-180 h-2 w-2 fill-neutral-800 dark:fill-white mb-[1px] ml-1" />
                    </button>
                  </div>
                </div>
                <div className="grid items-center  max-h-[60vh] overflow-auto">
                  <div
                    style={{
                      backgroundColor:
                        selectedBackgroundColor?.backgroundColorType ===
                          "solid" && selectedBackgroundColor?.color,
                      backgroundImage:
                        selectedBackgroundColor?.backgroundColorType ===
                        "gradient"
                          ? `linear-gradient(to bottom right, ${selectedBackgroundColor?.color.from}, ${selectedBackgroundColor?.color.to})`
                          : `url('${selectedBackgroundColor?.color}') `,
                      color: selectedBackgroundColor ? "white" : "black",
                    }}
                    className={`${
                      selectedBackgroundColor && "h-[40vh]"
                    } flex items-center justify-center `}
                  >
                    <Textarea
                      id="desc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={1}
                      placeholder={`What's on your mind, ${
                        session?.user.name.split(" ")[0] ||
                        user?.name.split(" ")[0]
                      }?`}
                      className={`
                    dark:bg-neutral-800 bg-transparent 
                    ${
                      selectedBackgroundColor !== null
                        ? "text-center text-2xl font-bold"
                        : "text-xl"
                    }
                    dark:text-white
                    focus-visible:ring-transparent focus:border-gray-500 focus:border-2 
                    border-none resize-none px-4
                    placeholder:${
                      selectedBackgroundColor !== null
                        ? "text-white"
                        : "text-neutral-500"
                    } 
                    dark:placeholder-neutral-300
                    ${selectedFiles.length > 0 ? "min-h-10" : " min-h-44"}
                  `}
                    />

                    {selectedFiles.length > 0 && (
                      <EmojiPicker
                        triggerClassName="mr-2 bg-transparent"
                        onChange={(emoji) =>
                          setDescription(description + emoji)
                        }
                      />
                    )}
                  </div>

                  {selectedFiles.length === 0 && (
                    <div className="flex items-center justify-between pt-2">
                      {!toggleTextBackgroundColor && (
                        <button
                          onClick={() => setToggleTextBackgroundColor(true)}
                          className="bg-gradient-to-br from-pink-500 via-purple-600 to-green-400 p-1 rounded-md ml-4 border border-white"
                        >
                          <ALargeSmall className="text-white" />
                        </button>
                      )}

                      {toggleTextBackgroundColor && (
                        <div className="ml-3 flex items-center gap-x-2">
                          <button
                            onClick={() => setToggleTextBackgroundColor(false)}
                            className="bg-neutral-300 p-1 rounded-md"
                          >
                            <ChevronLeft className="text-neutral-700" />
                          </button>

                          <button
                            onClick={() => setSelectedBackgroundColor(null)}
                            className="h-8 w-8 bg-white rounded-md border-2 border-neutral-400"
                          />

                          {solidBackgroundColors
                            .slice(0, 4)
                            .map((color, index) => (
                              <button
                                onClick={() =>
                                  setSelectedBackgroundColor({
                                    backgroundColorType: "solid",
                                    color: color,
                                  })
                                }
                                style={{ backgroundColor: color }}
                                key={index}
                                className={`h-8 w-8  rounded-md  `}
                              />
                            ))}

                          {Object.entries(gradients)
                            .slice(0, 4)
                            .map(([colorName, colors]) => (
                              <button
                                onClick={() =>
                                  setSelectedBackgroundColor({
                                    backgroundColorType: "gradient",
                                    color: colors,
                                  })
                                }
                                key={colorName}
                                style={{
                                  backgroundImage: `linear-gradient(to bottom right, ${colors.from}, ${colors.to})`,
                                }}
                                className={`h-8 w-8  rounded-md  `}
                              />
                            ))}

                          <button
                            onClick={() =>
                              setSelectedBackgroundColor({
                                backgroundColorType: "image",
                                color:
                                  "/abstract_background_image/19965192_6193255.jpg",
                              })
                            }
                          >
                            <img
                              src="/abstract_background_image/19965192_6193255.jpg"
                              className="h-8 w-8 object-fill rounded-md"
                            />
                          </button>

                          <button className="bg-neutral-300 p-1.5 rounded-md">
                            <LayoutGrid className=" fill-black " />
                          </button>
                        </div>
                      )}

                      <EmojiPicker
                        triggerClassName="mr-2 bg-transparent"
                        onChange={(emoji) =>
                          setDescription(description + emoji)
                        }
                      />
                    </div>
                  )}

                  {/* Image upload UI */}
                  {selectedFiles.length > 0 && (
                    <div className="flex items-center justify-center w-auto  dark:border-neutral-700 rounded-md relative my-2 mx-4">
                      <div
                        className="w-full"
                        onDrop={handleFileDrop}
                        onDragOver={handleDragOver}
                      >
                        <div className="relative">
                          <div className="z-10 absolute top-2 left-4 flex gap-x-2">
                            <Button
                              onClick={() =>
                                document.getElementById("fileInput").click()
                              }
                              variant="secondary"
                              className=" bg-white text-neutral-800 gap-x-2 hover:bg-neutral-200 drop-shadow-md rounded-lg px-3 h-9"
                            >
                              {" "}
                              <Pencil className="h-4 w-4 " />
                              <span className="text-[13px] font-semibold">
                                {selectedFiles.length > 1 ? "Edit all" : "Edit"}
                              </span>
                            </Button>
                            <Button
                              onClick={() =>
                                document.getElementById("fileInput").click()
                              }
                              variant="secondary"
                              className=" bg-white text-neutral-800 gap-x-2 hover:bg-neutral-200 drop-shadow-md rounded-lg px-3 h-9"
                            >
                              {" "}
                              <img
                                src="/ImageIcons/imageadd.png"
                                className="h-4 w-4"
                              />
                              <span className="text-[13px] font-semibold">
                                Add Photos/Videos
                              </span>
                            </Button>
                          </div>

                          <Button
                            onClick={() => {
                              setImagePreviews([]);
                              setSelectedFiles([]);
                            }}
                            className="absolute top-2 right-2 bg-white drop-shadow-md shadow-md border dark:bg-neutral-700 z-10 px-2.5 rounded-full hover:bg-neutral-600"
                          >
                            <X className="h-5 w-5 text-neutral-700" />
                          </Button>
                          <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*, video/*"
                            onChange={onFileChange}
                          />
                        </div>

                        <ImagePreviewCreatePost imagePreviews={imagePreviews} />
                      </div>
                    </div>
                  )}
                </div>

                <div className=" border border-gray-300 dark:border-neutral-600 rounded-md px-4 mx-4 flex justify-between items-center py-1 ">
                  <h1 className="font-semibold text-neutral-800 dark:text-neutral-300 text-sm">
                    Add to your post
                  </h1>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onFileChange}
                    style={{ display: "none" }}
                  />
                  <div className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          disabled={selectedBackgroundColor}
                          variant="ghost"
                          className="hover:bg-gray-100 p-2 rounded-full cursor-pointer focus:ring-0"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <ImagePlus
                            className={`${
                              selectedBackgroundColor
                                ? "text-neutral-500"
                                : "text-green-600"
                            }  h-6 w-6`}
                          />
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent className="bg-black/85 dark:bg-white/85 border-0">
                        <p className="text-white dark:text-black text-xs p-1 rounded-xl">
                          Photo/video
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className="hover:bg-gray-100 p-2 rounded-full cursor-pointer focus:ring-0"
                        >
                          <Icons.friendTagIcon className="fill-blue-600 h-7 w-7" />
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent className="bg-black/85 dark:bg-white/85 border-0">
                        <p className="text-white dark:text-black text-xs p-1 rounded-xl">
                          Tag people
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className="hover:bg-gray-100 p-0 rounded-full cursor-pointer focus:ring-0"
                        >
                          <Icons.smileEmoteIcon className="fill-yellow-600 h-9 w-9" />
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent className="bg-black/85 dark:bg-white/85 border-0">
                        <p className="text-white dark:text-black text-xs p-1 rounded-xl">
                          Feeling/Activity
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          disabled={selectedBackgroundColor}
                          variant="ghost"
                          className="hover:bg-gray-100 p-1 rounded-full cursor-pointer focus:ring-0"
                        >
                          <Icons.GifIcon
                            className={` ${
                              selectedBackgroundColor
                                ? "fill-neutral-600"
                                : "fill-cyan-600"
                            }  h-9 w-9`}
                          />
                        </Button>
                      </TooltipTrigger>

                      <TooltipContent className="bg-black/85 dark:bg-white/85 border-0">
                        <p className="text-white dark:text-black text-xs p-1 rounded-xl">
                          GIF
                        </p>
                      </TooltipContent>
                    </Tooltip>
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
                  disabled={selectedFiles.length === 0 && description === ""}
                  className={`w-full  ${
                    selectedFiles.length === 0 && description === ""
                      ? "bg-neutral-600"
                      : "bg-blue-600 hover:bg-blue-500"
                  } `}
                  type="submit"
                  onClick={() => {
                    createBlog();
                    setIsLoading(true);
                    setLoaderDescription("Posting");
                  }}
                >
                  Post
                </Button>
              </DialogFooter>
            </>
          )}

          {/* choose post audience */}
          {isPostAudienceActive && (
            <PostAudienceSelection
              setIsPostAudienceActive={setIsPostAudienceActive}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* modal render if the user is gonna discard the post */}
      <Dialog open={isDiscarding} onOpenChange={setIsDiscarding}>
        <DialogContent className="p-0 dark:bg-neutral-800 dark:border-0 dark:text-white min-w-[30vw] rounded-2xl">
          <DialogHeader className="mt-3 py-2 pl-4  ">
            <DialogTitle className="text-left font-bold text-xl">
              Discard this post?
            </DialogTitle>
          </DialogHeader>

          <div className="mx-5 mb-4">
            <p>if you discard now, you`ll lose this post.</p>

            <div className="flex justify-end gap-x-2 mt-5">
              <Button
                onClick={() => setIsDiscarding(false)}
                variant="ghost"
                className="hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white text-blue-600 font-semibold hover:text-blue-600"
              >
                Continue
              </Button>
              <Button
                onClick={handleClickDiscardPost}
                className="bg-blue-600 hover:bg-blue-500"
              >
                Discard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPostModal;
