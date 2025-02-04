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
import {
  BookOpen,
  Dot,
  Flag,
  Globe,
  ImagePlus,
  LinkIcon,
  PenSquare,
  X,
} from "lucide-react";
import { UploadDropzone } from "@uploadthing/react";
import { LoaderContext } from "@/context/LoaderContext";
import { formatTimeToNow } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MultipleImageRender from "./multiple-image-render";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import EmojiPicker from "../PostComment/EmojiPicker";
import ToolTipComp from "../utils/ToolTipComp";
import { Icons } from "../utils/Icons";

const SharePostModal = ({ session, user, blog, sharedPost }) => {
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const { signinToast } = useCustomHooks();
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);
  const router = useRouter();

  const { mutate: sharePost } = useMutation({
    mutationFn: async (id) => {
      const payload = {
        postId: id,
        description: description,
      };

      const { data } = await axios.post("/api/blog/sharePost", payload);
      return data;
    },
    onError: (err) => {
      //  if there are any other errors beside the server error
      setIsLoading(false);
      if (err.response?.status === 401) {
        return signinToast();
      }

      if (err.response?.status === 500) {
        return toast({
          description: "Couldn't share post",
          variant: "destructive",
        });
      }

      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
    onSuccess: async () => {
      window.location.reload();
      setDescription("");
      setOpen(false);
      setIsLoading(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full hover:bg-neutral-100 py-3 dark:text-neutral-200 dark:hover:bg-neutral-600 rounded">
        <div className="flex justify-start text-sm font-medium gap-x-3 ml-[1.2rem]">
          <PenSquare className="h-5 w-5" />
          <span>Share to Feed</span>
        </div>
      </DialogTrigger>
      <DialogContent className=" min-w-[35vw] min-h-auto dark:bg-neutral-800 dark:border-0 p-0 dark:text-neutral-200">
        <DialogHeader className="pt-4 px-4">
          <DialogTitle className="text-2xl font-bold text-center">
            Share
          </DialogTitle>
        </DialogHeader>

        <Separator className="dark:bg-neutral-700 border-1" />

        <div className="relative">
          <div className="grid gap-3 py-1">
            <SimpleBar style={{ maxHeight: "60vh" }}>
              <div className="flex items-center gap-2 px-4">
                <UserAvatar
                  className="h-12 w-12 "
                  user={{
                    name: session?.user.name || null || user?.name,
                    image: session?.user.image || null || user?.image,
                  }}
                />
                <div className="space-y-1">
                  <p className="font-semibold text-neutral-900 text-base pl-1 dark:text-neutral-200">
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

              <div className="mx-2 mb-2">
                <div className="flex items-center">
                  <Textarea
                    id="desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={1}
                    placeholder="Say something about this..."
                    className="dark:bg-neutral-800 dark:placeholder-neutral-300 focus-visible:ring-transparent focus:border-gray-500 focus:border-2 min-h-10 text-lg border-none resize-none px-4"
                  />

                  <EmojiPicker
                    triggerClassName="mr-5 bg-transparent"
                    onChange={(emoji) => setDescription(description + emoji)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    className=" bg-blue-600 hover:bg-blue-500 mt-4 px-10 "
                    type="submit"
                    onClick={() => {
                      sharePost(blog ? blog.id : sharedPost.id);
                      setIsLoading(true);
                      setLoaderDescription("Posting");
                    }}
                  >
                    Share now
                  </Button>
                </div>

                {/* {blog.sharedPostId ? (
                  <div className=" mx-1 mb-2">
                    <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 pt-1 mt-2 mb-3 mr-1">
                      {sharedPost?.image && (
                        <MultipleImageRender blog={sharedPost} />
                      )}
                 
                      <div className=" gap-1 my-2 mx-4">
                 
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

                        <p className=" text-justify py-2 text-sm leading-relaxed mb-1 font-medium">
                          {sharedPost.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=" mx-1 mb-2">
                    <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 pt-1 mt-2 mb-3 mr-1">
                      {blog.image && <MultipleImageRender blog={blog} />}

                  
                      <div className=" gap-1 my-2 mx-4">
                        <Link href={`/user/${blog?.author.id}`}>
                          <div className="flex items-center gap-1">
                            <UserAvatar
                              post="post"
                              className="h-10 w-10 "
                              user={{
                                handleName: blog.author?.handleName,
                                bio: blog.author?.bio,
                                birthdate: blog.author?.birthdate,
                                name: blog.author?.name || null,
                                image: blog.author?.image || null,
                              }}
                            />

                            <div className="px-2 pt-1">
                              <div className="flex items-center gap-x-1">
                                <p className="font-semibold text-sm">
                                  {blog?.author?.name}
                                </p>
                                {blog?.userStatus && (
                                  <span className="text-[13px] mt-[1px] font-light">
                                    {blog?.userStatus}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center">
                                <p className=" text-xs text-gray-600 dark:text-neutral-200 ">
                                  {formatTimeToNow(new Date(blog?.createdAt))}
                                </p>
                                <Dot className="-mx-1 text-gray-600 dark:text-neutral-200" />
                                <Globe className="h-3 w-3 text-gray-600 dark:text-neutral-200" />
                              </div>
                            </div>
                          </div>
                        </Link>

                        {blog.description && (
                          <p className=" text-justify py-2 text-sm leading-relaxed mb-1 font-medium">
                            {blog.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )} */}
              </div>

              <Separator className="bg-neutral-300 dark:bg-neutral-700 border-1 " />

              <div className="mx-6 my-4">
                <h2 className="font-semibold">Share to</h2>

                <div className="flex items-center gap-x-4 mt-2">
                  <div className="space-y-2 flex flex-col items-center">
                    <Button className="py-7 rounded-full bg-neutral-300">
                      <Icons.Messager className="h-7 w-6" />
                    </Button>
                    <p className="text-xs">Chatbox</p>
                  </div>
                  {blog.author.id === session?.user.id && (
                    <div className="space-y-2 flex flex-col items-center">
                      <Button className="py-7 rounded-full bg-neutral-300">
                        <BookOpen className="h-7 w-6 fill-black" />
                      </Button>
                      <p className="text-xs">Your story</p>
                    </div>
                  )}
                  <div className="space-y-2 flex flex-col items-center">
                    <Button className="py-7 rounded-full bg-neutral-300">
                      <LinkIcon className="h-7 w-6 text-black" />
                    </Button>
                    <p className="text-xs">Link</p>
                  </div>
                  <div className="space-y-2 flex flex-col items-center">
                    <Button className="py-7 rounded-full bg-neutral-300">
                      <Icons.Group className="h-7 w-6 text-black" />
                    </Button>
                    <p className="text-xs">Group</p>
                  </div>
                  <div className="space-y-2 flex flex-col items-center">
                    <Button className="py-7 rounded-full bg-neutral-300">
                      <Flag className="h-7 w-6 text-black fill-black" />
                    </Button>
                    <p className="text-xs">Page</p>
                  </div>
                </div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePostModal;
