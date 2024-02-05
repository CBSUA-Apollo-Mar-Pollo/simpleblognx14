"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import useCustomHooks from "@/hooks/use-custom-hooks";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/Button";
import { Separator } from "./ui/Separator";
import Image from "next/image";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";
import { SelectContent } from "@radix-ui/react-select";
import { ImagePlus, X } from "lucide-react";
import { UploadDropzone } from "@uploadthing/react";

const AddBlogModal = ({ session }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const { signinToast } = useCustomHooks();
  const [toggleImageUpload, setToggleImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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
      window.location.reload();
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {session && (
          <div className="flex flex-row items-center space-x-4 border py-3 px-5 rounded-lg bg-white">
            <Link href={`/user/${session.user.id}`}>
              <UserAvatar
                className="h-10 w-10 "
                user={{
                  name: session.user.name || null,
                  image: session.user.image || null,
                }}
              />
            </Link>
            <Input
              className="rounded-full "
              placeholder={`What's on your mind, ${
                session.user.name.split(" ")[0]
              }`}
            />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="p-2">
        <DialogHeader className="py-2 px-4">
          <DialogTitle className="text-2xl font-bold">Create post</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="grid gap-3 py-1">
          <div className="flex items-center gap-2 px-4">
            <UserAvatar
              className="h-10 w-10 "
              user={{
                name: session?.user.name || null,
                image: session?.user.image || null,
              }}
            />
            <div className="space-y-1">
              <p className="font-semibold text-gray-700 text-base pl-1">
                {session?.user.name}
              </p>
              <Select>
                <SelectTrigger className="h-6 w-24 font-medium text-sm focus:ring-0">
                  <SelectValue
                    placeholder="Public"
                    className="font-semibold "
                  />
                </SelectTrigger>
                <SelectContent className="bg-white border w-[110px] rounded">
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
          <div className="grid items-center max-h-64 overflow-auto">
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={1}
              placeholder={`What's on your mind, ${
                session?.user.name.split(" ")[0]
              }?`}
              className="focus-visible:ring-transparent focus:border-gray-500 focus:border-2 min-h-24 text-base border-none resize-none"
            />

            {/* Image upload UI */}
            {toggleImageUpload && (
              <div className="flex items-center justify-center w-full border border-gray-300 rounded-md p-2 relative">
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
                      className="absolute right-4 top-6 py-1 px-2 rounded-full bg-gray-100"
                      onClick={() =>
                        setToggleImageUpload((prevState) => !prevState)
                      }
                    >
                      <X className="w-5 h-5 font-bold" />
                    </Button>
                    <UploadDropzone
                      appearance={{
                        container: {
                          width: "100%",
                        },
                      }}
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

          <div className=" border border-gray-300 rounded-md px-4 flex justify-between items-center py-1">
            <h1 className="font-semibold text-gray-600">Add to your post</h1>
            <div>
              <Button
                variant="ghost"
                className="hover:bg-gray-100 p-2 rounded-full cursor-pointer focus:ring-0"
                onClick={() => setToggleImageUpload((prevState) => !prevState)}
              >
                <ImagePlus className="text-green-600 " />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            type="submit"
            isLoading={isLoading}
            disabled={description.length === 0}
            onClick={() => createBlog()}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogModal;
