"use client";

import React, { useState } from "react";
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

const CreateCommunityModal = () => {
  const [page, setPage] = useState(1);
  const [topicsSelected, setTopicsSelected] = useState([]);

  const formSchema = z.object({
    name: z.string(),
    description: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { reset, formState, control, setValue, getValues } = form;

  const onSubmit = () => {
    console.log("handle submit");
  };

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
            {...{ watchedFieldCommunityName, watchedFieldCommunityDescription }}
          />
        )}

        {page === 3 && (
          <ModalPage3 {...{ topicsSelected, setTopicsSelected }} />
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
                className="bg-neutral-200 text-neutral-900 hover:bg-neutral-300 hover:text-black font-semibold"
              >
                {page === 1 ? "Cancel" : "Back"}
              </Button>
              <Button
                onClick={() =>
                  setPage((current) => {
                    if (current === 4) {
                      return current;
                    } else {
                      return (current += 1);
                    }
                  })
                }
                className="bg-blue-600 text-white hover:bg-blue-600/80 hover:text-white font-semibold"
              >
                Next
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
