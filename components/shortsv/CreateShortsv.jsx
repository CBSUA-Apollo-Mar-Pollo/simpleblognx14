"use client";

import { Pause, Play, Video, Volume2, VolumeX, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import ProfileImageAndIcons from "../PostComment/ProfileImageAndIcons";
import { UploadDropzone } from "@uploadthing/react";
import { Icons } from "../utils/Icons";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { LoaderContext } from "@/context/LoaderContext";
import { useSession } from "next-auth/react";

const CreateShortsv = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");
  const [toggleNext, setToggleNext] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);
  const { toast } = useToast();
  const close = () => {
    router.back();
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const { mutate: publishVideo } = useMutation({
    mutationFn: async () => {
      const payload = {
        text: textareaValue,
        videoUrl: videoUrl,
      };

      const { data } = await axios.post("/api/shortsv/publish", payload);
      return data;
    },
    onError: (err) => {
      setIsLoading(false);
      return toast({
        title: "There was a problem",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setTextareaValue("");
      setVideoUrl("");
      setToggleNext(false);
      setIsLoading(false);
      toast({
        description: "Your shortsv has been publish",
        variant: "success",
      });
      router.refresh();
    },
  });

  useEffect(() => {
    if (toggleNext) {
      const textarea = document.getElementById("auto-resize-textarea-shortsv");
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [textareaValue]);

  const handlePlayClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="absolute top-0 flex justify-between w-full items-center px-2 py-2">
        {/* close button and logo */}
        <div className="flex items-center justify-center gap-2 z-20">
          <div
            className="p-2 cursor-pointer hover:bg-gray-600 dark:bg-neutral-900  rounded-full transition"
            onClick={close}
          >
            <X className=" text-white w-8 h-8" />
          </div>
          <Link href="/" className="font-bold">
            <span className="py-[1px] px-4 rounded-full bg-yellow-400 text-3xl">
              E
            </span>
          </Link>
        </div>

        <div className="z-20">
          <ProfileImageAndIcons session={session} />
        </div>
      </div>

      <div className="h-screen relative grid grid-cols-4">
        <div className="col-span-1 bg-neutral-800 relative border-r border-neutral-700">
          <div className="absolute top-20 w-full px-4">
            <h3 className="text-white text-sm">Create a shortsv</h3>

            {toggleNext ? (
              <div>
                <h1 className="text-white font-bold text-2xl">Add details</h1>
                <Textarea
                  id="auto-resize-textarea-shortsv"
                  placeholder="Describe your shortv..."
                  value={textareaValue}
                  className="pt-3 pl-4 mt-2 min-h-[150px]  overflow-hidden rounded-md focus:outline-none border-0 bg-neutral-600 border-transparent focus:border-transparent placeholder:text-neutral-300 text-white  focus-visible:border-neutral-600 resize-none"
                  onChange={handleTextareaChange}
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl text-white font-semibold">
                  Upload video
                </h1>

                <div
                  onClick={() => {
                    videoUrl.length && setVideoUrl("");
                  }}
                  className=" border  border-neutral-700 rounded-md mt-4 py-5"
                >
                  {/* video upload button */}
                  <UploadDropzone
                    className="border-none w-full cursor-pointer"
                    endpoint="videoUploader"
                    onClientUploadComplete={(res) => {
                      console.log(res, "shorstv result of upload");
                      setVideoUrl(res[0].url);
                    }}
                    onUploadError={(error) => {
                      return toast({
                        title: "Error uploading video",
                        description: "video file size exceeds limit of 20mb",
                        variant: "destructive",
                      });
                    }}
                    content={{
                      uploadIcon() {
                        return (
                          <div className="bg-neutral-700 px-2 py-2 rounded-full">
                            <Icons.VideoUploadIcon className="w-7 h-7 fill-neutral-100" />
                          </div>
                        );
                      },
                      label() {
                        return videoUrl.length ? (
                          <h2 className="text-white text-lg">Replace video</h2>
                        ) : (
                          <h2 className="text-white text-lg">Add video</h2>
                        );
                      },
                      button({ ready, isUploading }) {},
                      allowedContent({ ready, fileTypes, isUploading }) {
                        return (
                          <p className="text-neutral-400 text-sm">
                            or drag and drop
                          </p>
                        );
                      },
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {/* button next and previous */}
          <div className="absolute bottom-0 w-full px-4 py-4">
            <div className="flex gap-x-2 my-4">
              <div
                className={`${
                  toggleNext ? "bg-neutral-500" : "bg-blue-500"
                } h-2 w-full rounded-md`}
              />
              <div
                className={`${
                  toggleNext ? "bg-blue-500" : "bg-neutral-500"
                } h-2 w-full rounded-md`}
              />
            </div>
            {toggleNext ? (
              <div className="flex gap-x-2">
                <Button
                  onClick={() => setToggleNext(false)}
                  className="w-full bg-neutral-600 hover:bg-blue-500"
                  disabled={videoUrl.length === 0 ? true : false}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    setLoaderDescription("Posting");
                    setIsLoading(true);
                    publishVideo();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500"
                  disabled={videoUrl.length === 0 ? true : false}
                >
                  Publish
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setToggleNext(true)}
                className="w-full bg-blue-600 hover:bg-blue-500"
                disabled={videoUrl.length === 0 ? true : false}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        {/* video preview */}
        <div className="col-span-3 bg-neutral-900 relative">
          <div className=" bg-neutral-800 mt-[4rem] mx-20 h-[90vh] rounded-xl relative">
            <h1 className="text-white py-4 px-5">Preview</h1>
            <div className="bg-neutral-900 mx-4 h-[87%] rounded-xl border border-neutral-700 flex items-center justify-center">
              {videoUrl.length ? (
                <div className="border border-neutral-700 rounded-xl my-10 relative">
                  {isPlaying ? (
                    <Pause
                      onClick={handlePlayClick}
                      className="fill-white stroke-none absolute top-5 left-5 flex items-start justify-start z-20 cursor-pointer"
                    />
                  ) : (
                    <Play
                      onClick={handlePlayClick}
                      className="fill-white stroke-none absolute top-5 left-5 flex items-start justify-start z-20 cursor-pointer"
                    />
                  )}

                  {isMuted ? (
                    <Volume2
                      onClick={() => setIsMuted(false)}
                      className="stroke-white absolute top-5 right-7 flex items-start justify-start z-20 cursor-pointer w-6 h-6"
                    />
                  ) : (
                    <VolumeX
                      onClick={() => setIsMuted(true)}
                      className="stroke-white absolute top-5 right-7 flex items-start justify-start z-20 cursor-pointer w-6 h-6"
                    />
                  )}
                  <video
                    key={videoUrl}
                    ref={videoRef}
                    loop
                    playsInline
                    autoPlay
                    crossOrigin="anonymous"
                    preload="metadata"
                    muted={!isMuted}
                    className="h-[70vh] w-[18vw] rounded-2xl z-10 bg-black"
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div>
                  <h1 className="text-center text-neutral-400 font-bold text-xl">
                    Your Video Preview
                  </h1>
                  <p className="text-neutral-400 font-normal">
                    Upload your video in order to see a preview here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateShortsv;
