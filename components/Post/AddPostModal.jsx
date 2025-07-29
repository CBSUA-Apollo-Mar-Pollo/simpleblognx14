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
import {
  ALargeSmall,
  AlertCircle,
  ArrowLeft,
  ChevronLeft,
  ImagePlus,
  LayoutGrid,
  MoveDown,
  Triangle,
  X,
} from "lucide-react";
import { UploadDropzone } from "@uploadthing/react";
import { LoaderContext } from "@/context/LoaderContext";
import ToolTipComp from "../utils/ToolTipComp";
import { uploadFiles } from "@/lib/uploadThing";
import EmojiPicker from "../PostComment/EmojiPicker";
import ImagePreviewCreatePost from "./image-preview-create-post";
import { Icons } from "../utils/Icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";
import { Checkbox } from "../ui/Checkbox";
import { Label } from "../ui/Label";

const AddPostModal = ({ session, user, communityId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const { signinToast } = useCustomHooks();
  const [toggleImageUpload, setToggleImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleTextBackgroundColor, setToggleTextBackgroundColor] =
    useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(null);

  const [isPostAudienceActive, setIsPostAudienceActive] = useState(false);

  const solidBackgroundColors = ["#696969", "#7f00ba", "#cf001c", "#000000"];

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
            "Error uploading image, please upload an image with the extension of the following: jpeg, png"
          );
          throw new UploadError(
            "Failed to upload image: " + error.message,
            400
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

  console.log(selectedBackgroundColor);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full ">
        <Input
          className="rounded-full bg-neutral-50 dark:border-0 dark:bg-neutral-700 hover:cursor-pointer hover:bg-neutral-100"
          placeholder={`What's on your mind, ${
            session?.user.name.split(" ")[0] || user?.name.split(" ")[0]
          } ?`}
        />
      </DialogTrigger>

      <DialogContent className="[&>button]:hidden  min-w-[30vw] min-h-auto  dark:bg-neutral-800  dark:border-0 p-0 dark:text-neutral-200 ">
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
                  className="h-10 w-10 "
                  user={{
                    name: session?.user.name || null || user?.name,
                    image: session?.user.image || null || user?.image,
                  }}
                />
                <div className="space-y-1">
                  <p className="font-semibold text-sm pl-1 dark:text-neutral-200">
                    {session?.user.name || user?.name}
                  </p>
                  <button
                    onClick={() => setIsPostAudienceActive(true)}
                    className="flex items-center gap-x-1 bg-neutral-200 px-2 py-0.5 rounded-lg"
                  >
                    <Icons.earthIcon className="h-3.5 w-3.5" />
                    <span className="text-[13px] font-medium">Public</span>
                    <Triangle className="rotate-180 h-2 w-2 fill-neutral-800 mb-[1px] ml-1" />
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
                    className={`dark:bg-neutral-800 bg-transparent  dark:placeholder-neutral-300 ${
                      selectedBackgroundColor
                        ? "text-center text-2xl font-bold"
                        : "text-xl"
                    } ${
                      selectedBackgroundColor !== null
                        ? "placeholder:text-white "
                        : "placeholder:text-black"
                    } focus-visible:ring-transparent focus:border-gray-500 focus:border-2 min-h-10  border-none resize-none px-4 `}
                  />
                </div>

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

                      {solidBackgroundColors.slice(0, 4).map((color, index) => (
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
                    onChange={(emoji) => setDescription(description + emoji)}
                  />
                </div>

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

                        <ImagePreviewCreatePost imagePreviews={imagePreviews} />
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
                <div className="flex items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        disabled={selectedBackgroundColor}
                        variant="ghost"
                        className="hover:bg-gray-100 p-2 rounded-full cursor-pointer focus:ring-0"
                        onClick={() =>
                          setToggleImageUpload((prevState) => !prevState)
                        }
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
          <>
            <DialogHeader className="pt-4 px-4">
              <DialogTitle className="text-xl font-bold text-center">
                Post audience
              </DialogTitle>

              <Button
                variant="ghost"
                onClick={() => setIsPostAudienceActive(false)}
                className="p-0 rounded-full"
                asChild
              >
                <ArrowLeft className="w-10 h-10 absolute left-4 top-1 cursor-pointer p-2 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 " />
              </Button>
            </DialogHeader>

            <Separator className="dark:bg-neutral-700 border-1" />

            <div className="px-2 max-h-[50vh] overflow-y-auto">
              <div className="px-2">
                <h1 className="font-semibold">Who can see your post? </h1>

                <p className="text-sm my-2 text-neutral-600">
                  Your post will show up in Feed, on your profile and in search
                  results.
                </p>

                <p className="text-sm text-neutral-600">
                  Your default audience is set to Only me, but you can change
                  the audience of this specific post.
                </p>
              </div>

              <RadioGroup
                defaultValue="Public"
                className="pl-1 pr-2 mt-4 space-y-1"
              >
                <label
                  htmlFor="public"
                  className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
                >
                  <div className="flex items-center gap-x-2">
                    <Icons.earthIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
                    <div>
                      <h1 className="font-semibold">Public</h1>
                      <p className="text-sm text-neutral-600">
                        Anyone on or off Estorias
                      </p>
                    </div>
                  </div>
                  <RadioGroupItem value="public" id="public" />
                </label>
                <label
                  htmlFor="friends"
                  className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
                >
                  <div className="flex items-center gap-x-2">
                    <Icons.friendsOnlyIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
                    <div>
                      <h1 className="font-semibold">Friends</h1>
                      <p className="text-sm text-neutral-600">
                        Your friends on estorias
                      </p>
                    </div>
                  </div>
                  <RadioGroupItem value="friends" id="friends" />
                </label>
                <label
                  htmlFor="exceptions"
                  className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
                >
                  <div className="flex items-center gap-x-2">
                    <Icons.friendsExceptionIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
                    <div>
                      <h1 className="font-semibold">Friends exceptions</h1>
                      <p className="text-sm text-neutral-600">
                        Don't show to some friends
                      </p>
                    </div>
                  </div>
                  <RadioGroupItem value="exceptions" id="exceptions" />
                </label>
                <label
                  htmlFor="specificfriends"
                  className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
                >
                  <div className="flex items-center gap-x-2">
                    <Icons.SpecificFriendsIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
                    <div>
                      <h1 className="font-semibold">Specific friends</h1>
                      <p className="text-sm text-neutral-600">
                        Only to show to some friends
                      </p>
                    </div>
                  </div>
                  <RadioGroupItem
                    value="specificfriends"
                    id="specificfriends"
                  />
                </label>
                <label
                  htmlFor="onlyme"
                  className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
                >
                  <div className="flex items-center gap-x-2">
                    <Icons.OnlyMeIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
                    <div>
                      <h1 className="font-semibold">Only me</h1>
                    </div>
                  </div>
                  <RadioGroupItem value="onlyme" id="onlyme" />
                </label>
                <label
                  htmlFor="custom"
                  className="flex items-center justify-between hover:bg-neutral-100 cursor-pointer px-4 py-1 rounded-md"
                >
                  <div className="flex items-center gap-x-2">
                    <Icons.CustomAudienceIcon className="h-14 w-14 p-3 bg-neutral-300 rounded-full" />
                    <div>
                      <h1 className="font-semibold">Custom</h1>
                      <p className="text-sm text-neutral-600">
                        Include and exclude friends and lists
                      </p>
                    </div>
                  </div>
                  <RadioGroupItem value="custom" id="custom" />
                </label>
              </RadioGroup>
            </div>

            <Separator className="dark:bg-neutral-700 border-1" />

            <div className="flex items-center gap-x-2 pl-3">
              <Checkbox id="setAsDefaultAudience" className="h-6 w-6" />
              <Label>set as default audience.</Label>
            </div>

            <DialogFooter className="px-2 pb-3">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-neutral-200 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button
                variant="ghost"
                className="bg-blue-600 text-white p-0 px-8 rounded-lg hover:bg-blue-500 hover:text-white"
              >
                Save
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddPostModal;
