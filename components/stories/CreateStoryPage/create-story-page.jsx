"use client";

import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import CreateStoryPageSidebar from "./create-storypage-sidebar";
import CraeateStoryPageContent from "./create-storypage-content";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Separator } from "@/components/ui/Separator";
import { Button } from "@/components/ui/Button";
import { uploadFiles } from "@/lib/uploadThing";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const CreateStoryPage = ({ session }) => {
  const [toggleAddText, setToggleAddText] = useState(false);
  const [image, setImage] = useState(null);
  const [isDiscarding, setIsDiscarding] = useState(false);
  const [storyPreview, setStoryPreview] = useState(false);
  const [cropImageLink, setCropImageLink] = useState(null);

  const { toast } = useToast();
  const router = useRouter();

  const handleClickDiscard = () => {
    setImage(null);
    setStoryPreview(false);
    setIsDiscarding(false);
  };

  const {
    mutate: createStory,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async () => {
      // Upload the image in upload thing
      let file = cropImageLink;
      const response = await uploadFiles("imageUploader", {
        files: [file],
      });

      const payload = {
        image: response[0].url,
        authorId: session.user.id,
      };

      const { data } = await axios.post("/api/story/create", payload);
      return data;
    },
    onError: (err) => {
      console.log(err);
      return toast({
        title: "There was a problem",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <div className="grid grid-cols-10 dark:bg-neutral-900 min-h-screen">
      <div className="col-span-2 border-r border-neutral-200 dark:border-neutral-800 relative min-h-screen">
        <CreateStoryPageSidebar
          session={session}
          setToggleAddText={setToggleAddText}
          image={image}
          setIsDiscarding={setIsDiscarding}
          storyPreview={storyPreview}
          createStory={createStory}
        />
      </div>

      <div className="col-span-8 bg-white dark:bg-neutral-900  ">
        <CraeateStoryPageContent
          session={session}
          toggleAddText={toggleAddText}
          setToggleAddText={setToggleAddText}
          image={image}
          setImage={setImage}
          storyPreview={storyPreview}
          setStoryPreview={setStoryPreview}
          setCropImageLink={setCropImageLink}
        />
      </div>

      <Dialog open={isDiscarding} onOpenChange={setIsDiscarding}>
        <DialogContent className="p-0 dark:bg-neutral-800 dark:border-0 dark:text-white min-w-[30vw]">
          <DialogHeader className="mt-3 pb-2 border-b dark:border-neutral-700">
            <DialogTitle className="text-center font-bold text-xl">
              Discard Story ?
            </DialogTitle>
          </DialogHeader>

          <div className="mx-5 mb-4">
            <p>
              Are you sure you want to discard this story? Your story won&apos;t
              be saved.
            </p>

            <div className="flex justify-end gap-x-2 mt-5">
              <Button
                variant="ghost"
                className="hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white"
              >
                Continue editing
              </Button>
              <Button
                onClick={handleClickDiscard}
                className="bg-blue-600 hover:bg-blue-500"
              >
                Discard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateStoryPage;
