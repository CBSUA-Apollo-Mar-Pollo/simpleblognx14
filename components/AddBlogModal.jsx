"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import useCustomHooks from "@/hooks/use-custom-hooks";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/Button";
import { Separator } from "./ui/Separator";
import Image from "next/image";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";
import { SelectContent } from "@radix-ui/react-select";
import { ImagePlus } from "lucide-react";

const AddBlogModal = ({ session }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const { signinToast } = useCustomHooks();

  const { mutate: createBlog, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        description,
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
      setTitle("");
      setDescription("");
      setOpen(false);
      router.refresh();
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create post</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="grid gap-3 py-1">
          <div className="flex items-center gap-2">
            <Image
              width={45}
              height={45}
              src={session.user.image}
              alt="profile image"
              referrerPolicy="no-referrer"
              className="rounded-full"
            />
            <div className="space-y-1">
              <p className="font-semibold text-gray-700 text-base pl-1">
                {session.user.name}
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
          <div className="grid items-center">
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={1}
              placeholder={`What's on your mind, ${
                session.user.name.split(" ")[0]
              }`}
              className="focus-visible:ring-transparent focus:border-gray-500 focus:border-2 min-h-32 text-lg border-none"
            />
          </div>

          <div className=" border border-gray-300 rounded-md px-4 flex justify-between items-center py-1">
            <h1 className="font-semibold text-gray-600">Add to your post</h1>
            <div>
              <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer">
                <ImagePlus className="text-green-600 " />
              </div>
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
