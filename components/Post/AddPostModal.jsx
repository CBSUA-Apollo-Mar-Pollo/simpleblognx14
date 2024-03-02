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

const AddPostModal = ({ session, user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const { signinToast } = useCustomHooks();
  const [toggleImageUpload, setToggleImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);

  const { mutate: createBlog, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        description,
        imageUrl,
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <div className="flex flex-row items-center space-x-4 border py-3 px-5 rounded-lg bg-white dark:bg-neutral-800 dark:border-0">
          <Link href={`/user/${session?.user.id}`}>
            <UserAvatar
              className="h-10 w-10 "
              user={{
                name: session?.user.name || null || user?.name,
                image: session?.user.image || null || user?.image,
              }}
            />
          </Link>
          <Input
            className="rounded-full dark:border-0 dark:bg-neutral-700"
            placeholder={`What's on your mind, ${
              session?.user.name.split(" ")[0] || user?.name.split(" ")[0]
            }`}
          />
        </div>
      </DialogTrigger>
      <DialogContent className=" min-w-[39vw] max-h-[80vh] dark:bg-neutral-800 dark:border-0 p-0 dark:text-neutral-200 px-2">
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
          <div className="grid items-center max-h-72 overflow-auto">
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={1}
              placeholder={`What's on your mind, ${
                session?.user.name.split(" ")[0] || user?.name.split(" ")[0]
              }?`}
              className="dark:bg-neutral-800 dark:placeholder-neutral-300 focus-visible:ring-transparent focus:border-gray-500 focus:border-2 min-h-24 text-lg border-none resize-none px-4"
            />

            {/* Image upload UI */}
            {toggleImageUpload && (
              <div className="flex items-center justify-center w-auto border  border-gray-300 dark:border-neutral-700 rounded-md p-2 relative my-2 mx-4">
                {imageUrl.length ? (
                  <div className="">
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      style={{ width: "100%", height: "auto" }}
                      src={imageUrl}
                      alt="profile image"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="absolute right-2 top-2 py-0 px-3 rounded-full bg-gray-100 dark:bg-neutral-400"
                      onClick={() =>
                        setToggleImageUpload((prevState) => !prevState)
                      }
                    >
                      <X className="w-4 h-4 font-bold" />
                    </Button>
                    <UploadDropzone
                      className="border-none w-full cursor-pointer"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        setImageUrl(res[0].url);
                      }}
                    />
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
        <DialogFooter className="py-2 mx-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-500"
            type="submit"
            isLoading={isLoading}
            disabled={description.length === 0 && imageUrl.length === 0}
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
