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
import { Dot, Globe, ImagePlus, PenSquare, X } from "lucide-react";
import { UploadDropzone } from "@uploadthing/react";
import { LoaderContext } from "@/context/LoaderContext";
import { formatTimeToNow } from "@/lib/utils";
import { useRouter } from "next/navigation";
import MultipleImageRender from "./multiple-image-render";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import EmojiPicker from "../PostComment/EmojiPicker";
import ToolTipComp from "../utils/ToolTipComp";

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
      <DialogContent className=" min-w-[39vw] min-h-auto dark:bg-neutral-800 dark:border-0 p-0 dark:text-neutral-200 px-2">
        <DialogHeader className="pt-4 px-4">
          <DialogTitle className="text-2xl font-bold text-center">
            Share post
          </DialogTitle>
        </DialogHeader>

        <Separator className="dark:bg-neutral-700 border-1" />

        <div className="relative">
          <div className="grid gap-3 py-1">
            <SimpleBar style={{ maxHeight: "60vh" }}>
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

              <div className="grid items-center">
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

                {blog.sharedPostId ? (
                  <div className=" mx-1 mb-2">
                    <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 pt-1 mt-2 mb-3 mr-1">
                      {sharedPost?.image && (
                        <MultipleImageRender blog={sharedPost} />
                      )}
                      {/* shared post description */}
                      <div className=" gap-1 my-2 mx-4">
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

                      {/* shared post description */}
                      <div className=" gap-1 my-2 mx-4">
                        {/* profile image  */}
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
                )}
              </div>

              {sharedPost ? null : (
                <div className=" border border-gray-300 dark:border-neutral-600 rounded-md px-4 mx-1 flex justify-between items-center py-1 ">
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
        <DialogFooter className="pt-1 pb-3 mx-4 ">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-500"
            type="submit"
            onClick={() => {
              sharePost(blog ? blog.id : sharedPost.id);
              setIsLoading(true);
              setLoaderDescription("Posting");
            }}
          >
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SharePostModal;
