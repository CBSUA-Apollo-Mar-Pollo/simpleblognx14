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

const SharePostModal = ({ session, user, blog }) => {
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
      <DialogTrigger className="w-full hover:bg-neutral-100 py-2">
        <div className="flex justify-start text-sm font-medium gap-x-3 ml-[1.2rem]">
          <PenSquare className="h-5 w-5" />
          <span>Share to Feed</span>
        </div>
      </DialogTrigger>
      <DialogContent className="p-2 min-w-[40vw]">
        <DialogHeader className="py-2 px-4">
          <DialogTitle className="text-2xl font-bold text-center">
            Write post
          </DialogTitle>
        </DialogHeader>
        <Separator />
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
              <p className="font-semibold text-gray-700 text-base pl-1">
                {session?.user.name || user?.name}
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
                session?.user.name.split(" ")[0] || user?.name.split(" ")[0]
              }?`}
              className="focus-visible:ring-transparent focus:border-gray-500 focus:border-2 min-h-12 font-medium text-base border-none resize-none"
            />

            <div className=" mx-1 mb-2">
              <div className="rounded-2xl border border-neutral-300">
                {blog.image && (
                  <Link
                    href={`/postComment/${blog.id}`}
                    className="relative overflow-clip w-full "
                    // ref={pRef}
                  >
                    <Image
                      sizes="100vw"
                      width={0}
                      height={0}
                      src={blog.image}
                      alt="profile image"
                      referrerPolicy="no-referrer"
                      className="object-contain w-full transition max-h-[30rem] bg-black rounded-t-2xl "
                    />
                  </Link>
                )}
                {/* shared post description */}
                <div className=" gap-1 my-2 mx-4">
                  {/* profile image  */}
                  <Link href={`/user/${blog?.author.id}`}>
                    <div className="flex items-center gap-1">
                      <UserAvatar
                        className="h-9 w-9 "
                        user={{
                          name: blog.author?.name || null,
                          image: blog.author?.image || null,
                        }}
                      />

                      <div className="px-2 pt-1">
                        <p className="font-semibold text-sm">
                          {blog?.author?.name}
                        </p>
                        <div className="flex items-center">
                          <p className=" text-xs text-gray-600 ">
                            {formatTimeToNow(new Date(blog?.createdAt))}
                          </p>
                          <Dot className="-mx-1 text-gray-600" />
                          <Globe className="h-3 w-3 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  <p className=" text-justify py-2 text-sm leading-relaxed mb-1 font-medium">
                    {blog.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" border border-gray-300 rounded-md px-4 flex justify-between items-center py-1">
            <h1 className="font-semibold text-gray-600">Add to your post</h1>
            <div>
              <Button
                variant="ghost"
                disabled={true}
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
            disabled={description.length === 0}
            onClick={() => {
              sharePost(blog.id);
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
