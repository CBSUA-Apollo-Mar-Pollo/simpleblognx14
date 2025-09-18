"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import PageCreationInitialSideBar from "./page-creation-initial-sidebar";
import PageCreationInitialContentPreview from "./page-creation-initial-content-preview";
import PageCreationMultiStepSideBar from "./multi-step-sidebars/page-creation-multi-step-sidebar";

const PageCreationInputSchema = z.object({
  pagename: z.string(),
  pagecategory: z.string(),
  pagebio: z.string(),
});

const PageCreationComponent = ({ session }) => {
  const [openLeavePageModal, setOpenLeavePageModal] = useState(false);
  const [togglePreview, setTogglePreview] = useState(1);
  const [sideBarStepProcesssCounter, setSideBarStepProcessCounter] =
    useState(0);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(PageCreationInputSchema),
    defaultValues: {
      pagename: "",
      pagecategory: "",
      pagebio: "",
    },
  });

  const { pagename, pagecategory } = form.watch();
  const isSubmitDisabled = !pagename || !pagecategory;
  const formValues = form.watch();

  const {
    mutate: onSubmit,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.post("/api/page/creation", values);
      return data;
    },
    onError: (err) => {
      return toast({
        title: "There was an error",
        description: `Could not create ${formValues.pagename}, please try again`,
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      setSideBarStepProcessCounter(1);
      toast({
        description: (
          <>
            <strong>{formValues.pagename}</strong> was created. You can now add
            images or go to your Page to add more details.
          </>
        ),
        variant: "default",
      });
    },
  });

  useEffect(() => {
    const hasChanges = Object.values(formValues).some((value) => value !== "");
    setIsFormDirty(hasChanges);
  }, [formValues]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  useEffect(() => {
    // Save the current history state so we can prevent the back navigation
    const handlePopState = (event) => {
      if (isFormDirty) {
        console.log("User clicked the back button or navigated in history");

        // Prevent default back navigation
        event.preventDefault();

        // Show confirmation dialog
        const confirmLeave = window.confirm(
          "Changes you made may not be saved"
        );

        if (confirmLeave) {
          // Proceed with the back navigation
          router.back();
        } else {
          // Optionally, keep the user on the current page
          window.history.pushState(null, "", window.location.href);
        }
      }
    };

    // Push a new state to the history stack to prevent immediate back navigation
    window.history.pushState(null, "", window.location.href);

    // Attach the popstate event listener
    window.addEventListener("popstate", handlePopState);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isFormDirty, router]);

  return (
    <div className="grid grid-cols-9">
      {/* initial step in page creation */}
      {sideBarStepProcesssCounter === 0 && (
        <>
          <div className="col-span-2 bg-white drop-shadow-xl">
            <PageCreationInitialSideBar
              onSubmit={onSubmit}
              isSubmitDisabled={isSubmitDisabled}
              form={form}
              isLoading={isPending}
              formValues={formValues}
              setOpenLeavePageModal={setOpenLeavePageModal}
            />
          </div>
          <div className="col-span-7 bg-neutral-100 h-screen">
            <PageCreationInitialContentPreview
              session={session}
              formValues={formValues}
              togglePreview={togglePreview}
              setTogglePreview={setTogglePreview}
            />
          </div>
        </>
      )}

      {/* multi step additional inputs and preview */}
      {sideBarStepProcesssCounter !== 0 && (
        <>
          <div className="col-span-2 bg-white drop-shadow-xl">
            <PageCreationMultiStepSideBar
              sideBarStepProcesssCounter={sideBarStepProcesssCounter}
              setSideBarStepProcessCounter={setSideBarStepProcessCounter}
              onSubmit={onSubmit}
              isSubmitDisabled={isSubmitDisabled}
              form={form}
              isLoading={isPending}
              formValues={formValues}
              setOpenLeavePageModal={setOpenLeavePageModal}
              session={session}
            />
          </div>
          <div className="col-span-7 bg-neutral-100 h-screen">
            <PageCreationInitialContentPreview
              session={session}
              formValues={formValues}
              togglePreview={togglePreview}
              setTogglePreview={setTogglePreview}
            />
          </div>
        </>
      )}

      <Dialog open={openLeavePageModal} onOpenChange={setOpenLeavePageModal}>
        <DialogContent className="[&>button]:hidden p-0">
          <DialogHeader className="pt-4 relative">
            <DialogTitle className="text-start pl-7 font-bold text-xl dark:text-neutral-200">
              Leave page?
            </DialogTitle>
            <DialogClose asChild>
              <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
            </DialogClose>
          </DialogHeader>

          <Separator className="bg-neutral-300 h-[0.2px]" />

          <div className="px-4 pb-4">
            <p>
              Are you sure want to leave?Your changes will be lost if you leave
              this page.
            </p>

            <div className="mt-4 w-full flex justify-end gap-x-1">
              <Button
                onClick={() => setOpenLeavePageModal(false)}
                className="bg-transparent hover:bg-blue-100 text-blue-600 font-semibold px-5 py-2"
              >
                Stay on page
              </Button>
              <Button
                onClick={() => router.push("/")}
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl"
              >
                Leave page
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageCreationComponent;
