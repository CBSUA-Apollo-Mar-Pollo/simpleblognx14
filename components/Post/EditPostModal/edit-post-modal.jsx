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
} from "../../ui/Dialog";
import { Textarea } from "../../ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import useCustomHooks from "@/hooks/use-custom-hooks";
import UserAvatar from "../../utils/UserAvatar";
import { Button } from "../../ui/Button";
import { Separator } from "../../ui/Separator";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/Select";
import { SelectContent } from "@radix-ui/react-select";
import {
  ALargeSmall,
  ArrowLeft,
  ChevronLeft,
  Dot,
  Globe,
  ImagePlus,
  LayoutGrid,
  Pen,
  Pencil,
  Play,
  Triangle,
  X,
} from "lucide-react";
import { LoaderContext } from "@/context/LoaderContext";
import ToolTipComp from "../../utils/ToolTipComp";
import { uploadFiles } from "@/lib/uploadThing";
import { useSession } from "next-auth/react";
import qs from "query-string";
import ImagePreviewEditPost from "../image-preview-edit-post";
import EmojiPicker from "../../PostComment/EmojiPicker";
import { cn, formatTimeToNow } from "@/lib/utils";
import { Icons } from "../../utils/Icons";
import { handleRemoveImage } from "@/actions/handleRemovImage";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import MultipleImageRender from "../multiple-image-render";
import Link from "next/link";
import SharedPostEdit from "./shared_post_edit";
import EditPostContent from "./edit-post-content";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PostAudienceSelection from "../post-audience-selection";

const EditPostModal = ({ blog, deleteImage, sharedPost }) => {
  const { data: session } = useSession();
  const [description, setDescription] = useState(blog?.description || "");
  const [open, setOpen] = useState(false);
  const { signinToast } = useCustomHooks();
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);
  const [toggleTextBackgroundColor, setToggleTextBackgroundColor] =
    useState(false);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(null);
  const solidBackgroundColors = ["#696969", "#7f00ba", "#cf001c", "#000000"];
  const [isPostAudienceActive, setIsPostAudienceActive] = useState(false);
  const [isBackGroundColorCleared, setIsBackGroundColorCleared] =
    useState(false);

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

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(
    blog.image !== null ? [...blog.image] : []
  );
  const [videoPreviews, setVideoPreviews] = useState(
    blog.video !== null ? [...blog.video] : []
  );

  const { mutate: updatePost, isLoading } = useMutation({
    mutationFn: async () => {
      let images = [];
      const file = selectedFiles;

      if (selectedFiles.length !== 0) {
        await uploadFiles("imageUploader", {
          files: file,
        })
          .then(async (response) => {
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
        selectedBackgroundColor,
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

  let isBackgroundColorBeingEdited = selectedBackgroundColor;

  console.log(selectedBackgroundColor, "selectedBackgroundColor");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-x-2 cursor-pointer py-2 dark:hover:bg-neutral-600 w-full rounded px-2 hover:bg-gray-100">
        <Pen className="h-6 w-6 dark:text-neutral-300" />
        <span className="font-bold dark:text-neutral-300 text-[15px]">
          Edit post
        </span>
      </DialogTrigger>

      <DialogContent className="[&>button]:hidden drop-shadow-[0px_0px_5px_rgba(0,0,0,0.11)] min-w-[30vw] min-h-auto dark:bg-neutral-800 dark:border-0 p-0 dark:text-neutral-200">
        {/* main content of edit post modal */}
        {!isPostAudienceActive && (
          <>
            <DialogHeader className="pt-4 px-4 relative">
              <DialogTitle className="text-2xl font-bold text-center">
                Edit post
              </DialogTitle>
              <DialogClose asChild>
                <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-200 rounded-full" />
              </DialogClose>
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

                  <div className="grid items-center my-2">
                    {/* Description of the post or background stylish that only contain  text */}

                    {/* a post that only contain a text with background style */}
                    {!selectedBackgroundColor && !isBackGroundColorCleared && (
                      <div
                        className={`${
                          blog?.textBackgroundStyle
                            ? "flex flex-col"
                            : "flex justify-between items-center"
                        }`}
                      >
                        <div
                          className={`${
                            blog?.textBackgroundStyle &&
                            "h-[40vh] flex items-center justify-center"
                          } ${!blog?.textBackgroundStyle && "w-full"}`}
                          style={{
                            backgroundColor:
                              blog?.textBackgroundStyle?.backgroundColorType ===
                                "solid" && blog?.textBackgroundStyle?.color,
                            backgroundImage:
                              blog?.textBackgroundStyle?.backgroundColorType ===
                              "gradient"
                                ? `linear-gradient(to bottom right, ${blog?.textBackgroundStyle?.color.from}, ${blog?.textBackgroundStyle?.color.to})`
                                : `url('${blog?.textBackgroundStyle?.color}') `,
                            color: blog?.textBackgroundStyle
                              ? "white"
                              : "black",
                          }}
                        >
                          <Textarea
                            id="desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={1}
                            placeholder={`What's on your mind, ${
                              session?.user.name.split(" ")[0]
                            }?`}
                            className={` bg-transparent ${
                              blog?.textBackgroundStyle
                                ? "text-center text-2xl font-bold "
                                : "text-xl"
                            }  dark:bg-neutral-800 dark:placeholder-neutral-300 focus-visible:ring-transparent focus:border-gray-500 focus:border-2 min-h-10 border-none resize-none px-4`}
                          />
                        </div>

                        <div className="flex justify-between my-2">
                          {!toggleTextBackgroundColor &&
                            blog?.textBackgroundStyle && (
                              <button
                                onClick={() =>
                                  setToggleTextBackgroundColor(true)
                                }
                                className="bg-gradient-to-br from-pink-500 via-purple-600 to-green-400 p-1 rounded-md ml-4 border border-white"
                              >
                                <ALargeSmall className="text-white" />
                              </button>
                            )}

                          {toggleTextBackgroundColor && (
                            <div className="ml-3 flex items-center gap-x-2">
                              <button
                                onClick={() =>
                                  setToggleTextBackgroundColor(false)
                                }
                                className="bg-neutral-300 p-1 rounded-md"
                              >
                                <ChevronLeft className="text-neutral-700" />
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedBackgroundColor(null);
                                  setIsBackGroundColorCleared(true);
                                }}
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
                            triggerClassName="mr-5 bg-transparent"
                            onChange={(emoji) =>
                              setDescription(description + emoji)
                            }
                          />
                        </div>
                      </div>
                    )}

                    {/* show this when the user change the background style of the text post */}
                    {isBackgroundColorBeingEdited && (
                      <>
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
                                onClick={() =>
                                  setToggleTextBackgroundColor(false)
                                }
                                className="bg-neutral-300 p-1 rounded-md"
                              >
                                <ChevronLeft className="text-neutral-700" />
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedBackgroundColor(null);
                                  setIsBackGroundColorCleared(true);
                                }}
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
                      </>
                    )}

                    {/* show this when the user pick white backgrond */}
                    {selectedBackgroundColor === null &&
                      isBackGroundColorCleared && (
                        <div className="flex flex-col items-center">
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

                          <div className="flex items-center justify-between pt-2">
                            {!toggleTextBackgroundColor && (
                              <button
                                onClick={() =>
                                  setToggleTextBackgroundColor(true)
                                }
                                className="bg-gradient-to-br from-pink-500 via-purple-600 to-green-400 p-1 rounded-md ml-4 border border-white"
                              >
                                <ALargeSmall className="text-white" />
                              </button>
                            )}

                            {toggleTextBackgroundColor && (
                              <div className="ml-3 flex items-center gap-x-2">
                                <button
                                  onClick={() =>
                                    setToggleTextBackgroundColor(false)
                                  }
                                  className="bg-neutral-300 p-1 rounded-md"
                                >
                                  <ChevronLeft className="text-neutral-700" />
                                </button>

                                <button
                                  onClick={() =>
                                    setSelectedBackgroundColor(null)
                                  }
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
                        </div>
                      )}

                    {/* shared post content */}
                    {sharedPost && <SharedPostEdit sharedPost={sharedPost} />}

                    {/* post content */}
                    {!sharedPost && (
                      <EditPostContent
                        blog={blog}
                        selectedFiles={selectedFiles}
                        imagePreviews={imagePreviews}
                        videoPreviews={videoPreviews}
                        handleFileDrop={handleFileDrop}
                        handleDragOver={handleDragOver}
                        handleFileSelect={handleFileSelect}
                        removeImage={removeImage}
                        isBase64ImageDataURL={isBase64ImageDataURL}
                        setIsLoading={setIsLoading}
                        setLoaderDescription={setLoaderDescription}
                      />
                    )}
                  </div>

                  {sharedPost ? null : (
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
                                document.getElementById("fileInput").click()
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
                  )}
                </SimpleBar>
              </div>
            </div>
            <DialogFooter className="pt-1 pb-4 mx-4 ">
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
          </>
        )}

        {/* post audience content for changing the post audience */}
        {isPostAudienceActive && (
          <PostAudienceSelection
            setIsPostAudienceActive={setIsPostAudienceActive}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
