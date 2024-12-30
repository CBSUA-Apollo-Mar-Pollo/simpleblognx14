"use client";

import React, { useContext, useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Dot, Plus } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../../ui/Dialog";

import { Button } from "../../ui/Button";

import ModalPage1 from "./modal-page-1";
import ModalPage2 from "./modal-page-2";
import ModalPage3 from "./modal-page-3";
import ModalPage4 from "./modal-page-4";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { uploadFiles } from "@/lib/uploadThing";
import { useRouter } from "next/navigation";
import useCustomHooks from "@/hooks/use-custom-hooks";
import { LoaderContext } from "@/context/LoaderContext";
import { toast } from "@/hooks/use-toast";

const CreateCommunityModal = () => {
  const router = useRouter();
  const { setIsLoading, setLoaderDescription } = useContext(LoaderContext);
  const [page, setPage] = useState(1);
  const [topicsSelected, setTopicsSelected] = useState([]);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewIcon, setPreviewIcon] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState("Public");
  const [selectedVisibility, setSelectedVisibility] = useState("Visible");
  const { signinToast } = useCustomHooks();

  const handleBannerFileSelect = (event) => {
    const banner = event.target.files[0];
    if (banner) {
      const objectUrl = URL.createObjectURL(banner);
      setPreviewBanner(objectUrl);
      setBannerFile(banner);
    }
  };

  const handleIconFileSelect = (event) => {
    const icon = event.target.files[0];

    if (icon) {
      const objectUrl = URL.createObjectURL(icon);
      setPreviewIcon(objectUrl);
      setIconFile(icon);
    }
  };

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "Please add a name for your community." }),
    description: z.string().min(8, {
      message: "Please add at least 8 characters to describe your community.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    reset,
    formState: { errors },
    control,
    setValue,
    getValues,
    trigger,
  } = form;

  const values = getValues();

  const { mutate: onSubmit, isLoading } = useMutation({
    mutationFn: async () => {
      let images = [];
      const files = [bannerFile, iconFile];
      for (const file of files) {
        try {
          const response = await uploadFiles("imageUploader", {
            files: [file],
          });

          images = [...images, ...response];
        } catch (error) {
          throw new UploadError(
            "Failed to upload image: " + error.message,
            400
          );
        }
      }

      const payload = {
        name: values.name,
        description: values.description,
        banner: images[0],
        icon: images[1],
        topics: topicsSelected,
        visibility: selectedVisibility,
        accessType: selectedPrivacy,
      };

      const data = await axios.post("/api/community", payload);
      return data;
    },
    onError: (err) => {
      setIsLoading(false);
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return signinToast();
        }

        if (err.response?.status === 409) {
          return toast({
            title: "Error",
            description: "Community already exists",
            variant: "destructive",
          });
        }

        if (err.response?.status === 500) {
          return toast({
            title: "Error",
            description: "Could not create community! Please try again later.",
            variant: "destructive",
          });
        }
      }

      console.log(err);
    },
    onSuccess: ({ data }) => {
      setIsLoading(false);
      return router.push(`/communities/${data}`);
    },
  });

  const watchedFieldCommunityName = useWatch({
    control,
    name: "name",
  });

  const watchedFieldCommunityDescription = useWatch({
    control,
    name: "description",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-500 rounded-full">
          <Plus className="h-5 w-5 mr-2" />
          Create Community
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[80vh] p-0">
        {page === 1 && (
          <ModalPage1
            {...{
              form,
              onSubmit,
              watchedFieldCommunityName,
              watchedFieldCommunityDescription,
            }}
          />
        )}

        {page === 2 && (
          <ModalPage2
            {...{
              watchedFieldCommunityName,
              watchedFieldCommunityDescription,
              handleBannerFileSelect,
              handleIconFileSelect,
              previewBanner,
              previewIcon,
            }}
          />
        )}

        {page === 3 && (
          <ModalPage3 {...{ topicsSelected, setTopicsSelected }} />
        )}

        {page === 4 && (
          <ModalPage4
            {...{
              selectedPrivacy,
              setSelectedPrivacy,
              selectedVisibility,
              setSelectedVisibility,
            }}
          />
        )}

        <DialogFooter className="mx-4 mb-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Dot
                className={cn("h-10 w-10 -mr-6 text-neutral-400", {
                  "text-neutral-950": page === 1,
                })}
              />
              <Dot
                className={cn("h-10 w-10 -mr-6 text-neutral-400", {
                  "text-neutral-950": page === 2,
                })}
              />
              <Dot
                className={cn("h-10 w-10 -mr-6 text-neutral-400", {
                  "text-neutral-950": page === 3,
                })}
              />
              <Dot
                className={cn("h-10 w-10 text-neutral-400", {
                  "text-neutral-950": page === 4,
                })}
              />
            </div>

            <div className="flex items-center gap-x-2 mr-5">
              <Button
                onClick={() =>
                  setPage((current) => {
                    if (current === 1) {
                      return current;
                    } else {
                      return (current -= 1);
                    }
                  })
                }
                className="bg-neutral-200 text-neutral-900 hover:bg-neutral-300 hover:text-black font-semibold rounded-full"
              >
                {page === 1 ? "Cancel" : "Back"}
              </Button>

              {page === 4 ? (
                <Button
                  onClick={() => {
                    onSubmit();
                    setIsLoading(true);
                    setLoaderDescription("Creating community");
                  }}
                  className="bg-blue-600 text-white hover:bg-blue-600/80 hover:text-white font-semibold rounded-full"
                >
                  Create Community
                </Button>
              ) : (
                <Button
                  disabled={page === 1 && !values.name}
                  onClick={async () => {
                    // Wait for validation to finish
                    const isValid = await trigger();

                    // Check if validation passed
                    if (!isValid) {
                      return; // If there are errors, don't proceed
                    } else {
                      setPage((current) => {
                        if (current === 4) {
                          return current;
                        } else {
                          return current + 1;
                        }
                      });
                    }
                  }}
                  className="bg-blue-600 text-white hover:bg-blue-600/80 hover:text-white font-semibold rounded-full"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
