import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";
import { Camera, Loader2, X } from "lucide-react";
import Cropper from "react-easy-crop";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
import { Separator } from "@/components/ui/Separator";
import { Icons } from "@/components/utils/Icons";
import UpdateCoverPhotoButton from "./UpdateCoverPhotoButton";
import ProfilePIc from "./profile-pic";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { removeCoverPhoto } from "@/actions/remove-cover-photo";
import { getUserCoverPhotos } from "@/actions/get-user-cover-photos";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/Skeleton";

const BackgroundImage = ({
  imageSrc,
  setImageSrc,
  setCroppedAreaPixels,
  setOriginalFile,
  user,
  session,
}) => {
  console.log(session, "user data from background image");
  const fileInputRef = useRef(null);

  const [toggleRemoveCoverPhotoModal, setToggleRemoveCoverPhotoModal] =
    useState(false);
  const [toggleSelectCoverPhoto, setToggleSelectCoverPhoto] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file); // 👈 keep original file

    setImageSrc(URL.createObjectURL(file));
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const { mutate: handleRemoveCoverPhoto, isPending } = useMutation({
    mutationFn: async (userProfileId) => {
      const data = await removeCoverPhoto(userProfileId);
      return data;
    },
    onSuccess: () => {
      user.backgroundImage = null;
      setToggleRemoveCoverPhotoModal(false);
    },
  });

  const {
    data: coverPhotos,
    isLoading: isCoverPhotosFetching,
    isError,
  } = useQuery({
    queryKey: ["coverPhotos", session?.user?.id],
    queryFn: () => getUserCoverPhotos(session.user.id),
    enabled: !!toggleSelectCoverPhoto,
    staleTime: 1000 * 60 * 5,
  });

  const handleToggleSelectCoverPhoto = (isOpen) => {
    setToggleSelectCoverPhoto(isOpen);
  };

  const urlToFile = async (url, fileName) => {
    // 1. Fetch the data from the URL
    const response = await fetch(url);

    // 2. Convert the response to a Blob
    const blob = await response.blob();

    // 3. Create a File object from the Blob
    // Use the metadata from the blob (size/type) automatically
    return new File([blob], fileName, {
      type: blob.type,
      lastModified: new Date().getTime(),
    });
  };

  const loadUrlIntoState = async (url) => {
    try {
      // 1. Convert URL to File (using the function from before)
      const file = await urlToFile(url, "downloaded-image.jpg");

      // 2. Manual "onFileChange" logic
      setOriginalFile(file); // 👈 keep original file
      setImageSrc(URL.createObjectURL(file)); // 👈 create preview
    } catch (error) {
      console.error("Failed to load image from URL:", error);
    }
  };

  return (
    <div className="relative">
      {/* div if user is not yet to upload background image */}
      {imageSrc ? (
        <div className="relative">
          <div className="relative h-[55vh] rounded-b-3xl scroll-container bg-neutral-900 cursor-move">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={1}
              onZoomChange={() => {}}
              minZoom={1}
              maxZoom={1}
              aspect={3 / 1}
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              objectFit="cover"
              style={{
                containerStyle: {
                  width: "100%",
                  height: "100%",
                },
              }}
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

          {user?.id === session?.user.id && (
            <div className="relative">
              <div className="absolute bottom-5 right-8">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Button className="flex items-center gap-x-2 bg-white hover:bg-neutral-200 shadow-md drop-shadow-md rounded-lg">
                      <Camera className="text-neutral-50 h-6 w-6 fill-black dark:fill-neutral-200 dark:stroke-neutral-700 dark:hover:stroke-neutral-600" />
                      <span className="font-semibold text-sm text-black">
                        {user.backgroundImage
                          ? "Edit cover photo"
                          : "Add cover photo"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[20vw] mr-[9.4vw] rounded-lg drop-shadow-[0px_0px_7px_rgba(0,0,0,0.20)] shadow-md p-2 border-0">
                    {user.backgroundImage && (
                      <div>
                        <DropdownMenuItem
                          asChild
                          className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4 "
                        >
                          <Dialog
                            open={toggleSelectCoverPhoto}
                            onOpenChange={handleToggleSelectCoverPhoto}
                          >
                            <DialogTrigger className="flex items-center pl-2 py-2 gap-x-4 text-sm font-semibold hover:bg-neutral-200 w-full rounded">
                              <Icons.addCoverPhotoOutlineIcon className="h-5 w-5" />
                              <span>Choose cover photo</span>
                            </DialogTrigger>
                            <DialogContent className="[&>button]:hidden rounded-2xl p-0 min-w-[32vw]">
                              <DialogHeader className="pt-5">
                                <DialogTitle className="font-bold text-[20px]  text-black dark:text-neutral-50 text-center">
                                  Select photo
                                </DialogTitle>

                                <DialogClose asChild>
                                  <X className="w-9 h-9 absolute right-4 top-2.5 cursor-pointer p-1.5 bg-neutral-200 text-black dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
                                </DialogClose>
                              </DialogHeader>

                              <Separator className=" bg-neutral-300" />

                              <div className="">
                                <div className="flex justify-center w-full px-4 gap-x-2">
                                  <Button className="w-full bg-transparent hover:bg-transparent text-blue-600 text-[15px] font-semibold border-b-4 border-blue-600 rounded-none">
                                    Recent photos
                                  </Button>
                                  <Button className="w-full bg-transparent hover:bg-transparent text-black text-[15px] font-semibold">
                                    Photo albums
                                  </Button>
                                </div>

                                <div className="min-h-[40vh] px-4">
                                  {isError && (
                                    <p>Error fetching cover photos</p>
                                  )}

                                  {isCoverPhotosFetching && (
                                    <div className="grid grid-cols-3 gap-2 mt-4">
                                      {[...Array(9)].map((_, index) => (
                                        <div key={index}>
                                          <Skeleton className="h-[12vh] bg-neutral-800 rounded-none" />
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  <div className="grid grid-cols-3 gap-x-2 mt-4">
                                    {!isCoverPhotosFetching &&
                                      coverPhotos &&
                                      coverPhotos.map((coverPhoto, index) => (
                                        <button
                                          key={index}
                                          onClick={() =>
                                            loadUrlIntoState(coverPhoto.url)
                                          }
                                        >
                                          <Image
                                            sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes
                                            width={1200} // Example width, adjust based on design
                                            height={800} // Example height, adjust based on design
                                            priority={true}
                                            src={coverPhoto.url}
                                            alt="profile image"
                                            referrerPolicy="no-referrer"
                                            className="object-cover w-full transition max-h-[30rem] bg-neutral-700 border border-neutral-400"
                                            style={{
                                              aspectRatio: "16/ 10",
                                            }}
                                          />
                                        </button>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                          className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4"
                        >
                          <Icons.outlineUploadIcon className="h-5 w-5" />
                          Upload photo
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4">
                          <Icons.outlineRepositionIcon className="h-5 w-5" />
                          Reposition
                        </DropdownMenuItem>
                        <Separator className="my-1" />
                        {/* remove cover photo modal */}
                        <DropdownMenuItem
                          asChild
                          className="hover:cursor-pointer hover:bg-neutral-400  "
                        >
                          <Dialog
                            open={toggleRemoveCoverPhotoModal}
                            onOpenChange={setToggleRemoveCoverPhotoModal}
                          >
                            <DialogTrigger className="flex items-center pl-2 gap-x-4 text-sm font-semibold hover:bg-neutral-200 w-full py-1 rounded">
                              <Icons.outlineTrashIcon className="h-5 w-5" />
                              Remove
                            </DialogTrigger>
                            <DialogContent className="[&>button]:hidden rounded-2xl p-0">
                              <DialogHeader className="pt-5">
                                <DialogTitle className="font-bold text-[20px]  text-black dark:text-neutral-50 text-center">
                                  Remove cover photo
                                </DialogTitle>

                                <DialogClose asChild>
                                  <X className="w-9 h-9 absolute right-4 top-2.5 cursor-pointer p-1.5 bg-neutral-200 text-black dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
                                </DialogClose>
                              </DialogHeader>

                              <Separator className=" bg-neutral-300" />

                              <div className="pl-5">
                                <p className="">
                                  Are you sure you want to remove your cover
                                  photo ?
                                </p>

                                <div className="flex justify-end items-center mr-3 mb-4 mt-8 gap-x-2">
                                  <Button
                                    onClick={() =>
                                      setToggleRemoveCoverPhotoModal(false)
                                    }
                                    className="bg-transparent hover:bg-neutral-200 text-neutral-900 font-semibold"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleRemoveCoverPhoto(session.user.id)
                                    }
                                    className="px-10 rounded-lg bg-blue-700 hover:bg-blue-500"
                                  >
                                    Confirm
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </DropdownMenuItem>
                      </div>
                    )}

                    {user.backgroundImage === null && (
                      <div>
                        <DropdownMenuItem className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4">
                          <Icons.addCoverPhotoOutlineIcon className="h-5 w-5" />
                          <span>Choose cover photo</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                          className="hover:cursor-pointer hover:bg-neutral-400 font-semibold gap-x-4"
                        >
                          <Icons.outlineUploadIcon className="h-5 w-5" />
                          Upload photo
                        </DropdownMenuItem>
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

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
