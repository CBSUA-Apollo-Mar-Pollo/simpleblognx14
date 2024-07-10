"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/Dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  contactNumber: z
    .string()
    .min(11, { message: "Contact Number must be at least 11 characters" })
    .transform((x) => parseInt(x, 10))
    .refine((value) => /^\d+$/.test(value), {
      message: "please enter number only",
    })
    .refine((value) => value.toString().startsWith("63"), {
      message: "Contact Number must start with 63.",
    }),
  emailAddress: z
    .string()
    .email({ message: "Please enter a valid email address" }),
});

const ContactInfoModal = () => {
  const [toggleContentModal, setToggleContentModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactNumber: "",
      emailAddress: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full bg-white border border-neutral-200 dark:border-0 px-6 flex rounded-none rounded-t-2xl justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
        >
          Contact info
          <ChevronRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-neutral-800 border-0 dark:text-neutral-50 min-w-[35vw]">
        {/* render for mobile num */}
        {toggleContentModal && modalContent === "mobilenum" && (
          <div>
            <Button
              onClick={() => {
                setToggleContentModal(false);
                setModalContent(null);
              }}
              size="icon"
              variant="ghost"
              className="hover:bg-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-50 rounded-full mb-4"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>

            <div className="space-y-2">
              <h1 className="font-bold text-xl">Add a mobile number</h1>
              <DialogDescription className="dark:text-neutral-300 text-neutral-800">
                Manage your mobile numbers and emails to make sure your contact
                info is accurate and up to date.
              </DialogDescription>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mt-5">
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 text-[15px] font-semibold ml-2">
                            Philippines (63+)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]+"
                              placeholder="Enter mobile number"
                              className="dark:border-none h-16 rounded-2xl pl-5 border border-neutral-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-500 mt-3"
                  >
                    Next
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        )}

        {/* render for adding email address */}
        {toggleContentModal && modalContent === "emailadd" && (
          <div>
            <Button
              onClick={() => {
                setToggleContentModal(false);
                setModalContent(null);
              }}
              size="icon"
              variant="ghost"
              className="hover:bg-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-50 rounded-full mb-4"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>

            <div className="space-y-2">
              <h1 className="font-bold text-xl">Add an email address</h1>
              <DialogDescription className="dark:text-neutral-300 text-neutral-800 text-justify">
                We’ll use this email address across all of your accounts in
                Accounts Center to personalize experiences, like connecting
                people and improving ads on our products
              </DialogDescription>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mt-5">
                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter email address"
                              className="dark:border-none h-16 rounded-2xl pl-5 border border-neutral-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-500 mt-3"
                  >
                    Next
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        )}

        {toggleContentModal === false && modalContent === null && (
          <>
            <div className="space-y-2">
              <h1 className="font-bold text-2xl">Contact information</h1>
              <DialogDescription className="text-neutral-800 dark:text-neutral-300">
                Manage your mobile numbers and emails to make sure your contact
                info is accurate and up to date.
              </DialogDescription>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full font-semibold bg-neutral-100 border border-neutral-200 dark:border-0 px-6 rounded-2xl  flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
                >
                  Add new contact
                  <ChevronRight />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset="-0.1"
                align="start"
                className="flex flex-col w-[25vw] space-y-1 rounded-2xl"
              >
                <Button
                  onClick={() => {
                    setToggleContentModal(true);
                    setModalContent("mobilenum");
                  }}
                  className="flex justify-start hover:bg-neutral-200"
                  variant="ghost"
                >
                  Add mobile number
                </Button>
                <Separator />
                <Button
                  onClick={() => {
                    setToggleContentModal(true);
                    setModalContent("emailadd");
                  }}
                  className="flex justify-start hover:bg-neutral-200"
                  variant="ghost"
                >
                  Add email
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactInfoModal;
