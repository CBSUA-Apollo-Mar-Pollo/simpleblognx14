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
import { Button } from "./ui/Button";
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

const AddBlogModal = ({ session }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const { signinToast } = useCustomHooks();

  const { mutate: createBlog, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        title,
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
          <div className="flex flex-row items-center space-x-4 border py-3 px-5 rounded-lg">
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
          <DialogTitle className="text-3xl font-bold">
            Create a blog
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-8 py-8">
          <div className="grid items-center gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2"
            />
          </div>
          <div className="grid items-center gap-4">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={1}
              placeholder="What are your thoughts"
              className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-500 focus:border-2 min-h-32"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            type="submit"
            isLoading={isLoading}
            onClick={() => createBlog()}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlogModal;
