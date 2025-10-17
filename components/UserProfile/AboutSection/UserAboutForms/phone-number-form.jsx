"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import CountriesPhoneFormatSelectInput from "@/components/utils/countries-phone-format-select-input";
import { Icons } from "@/components/utils/Icons";
import { countries } from "@/constants/countries-phone-formats";
import { phoneNumberRegex } from "@/lib/phone-number-regex";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const PhoneNumberForm = ({ setToggleAddPhoneNumber }) => {
  const [selectedCode, setSelectedCode] = useState(countries[0]);
  const PhoneInfoForm = useForm({
    mode: "all",
    resolver: zodResolver(
      z.object({
        phonenumber: z
          .string()
          .regex(
            /^[\d +()-]*$/,
            "Given phone number must be a valid telephone number."
          )
          .min(10, "Must be at least 10 digits")
          .refine((value) => isValidPhoneNumber(value, selectedCode.code), {
            message: "Given phone number must be a valid telephone number.",
          }),
      })
    ),
    defaultValues: {
      phonenumber: "",
    },
  });

  const { control, trigger } = PhoneInfoForm;

  const isPhoneValid = !PhoneInfoForm.formState.errors.phonenumber;
  const phoneValue = useWatch({
    control,
    name: "phonenumber",
  });
  const hasText = phoneValue.trim() !== "";

  console.log(hasText, "has TExt");

  // Debounce state to detect when user stops typing
  const [debouncedPhone, setDebouncedPhone] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPhone(phoneValue);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(handler);
  }, [phoneValue]);

  // Trigger validation when user stops typing
  useEffect(() => {
    if (debouncedPhone !== "") {
      trigger("phonenumber"); // manually validate the field
    }
  }, [debouncedPhone, trigger]);

  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: async ({ phonenumber: number }) => {
      const { data } = await axios.post("/api/userProf/about/phonenumber", {
        number,
        selectedCode,
      });
      return data;
    },
  });

  return (
    <Form {...PhoneInfoForm}>
      <form onSubmit={PhoneInfoForm.handleSubmit(onSubmit)}>
        <FormField
          control={PhoneInfoForm.control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start justify-center gap-x-2 relative">
                <CountriesPhoneFormatSelectInput
                  setSelectedCode={setSelectedCode}
                />
                <div className="flex flex-col w-full items-start gap-x-2 relative">
                  <FormControl>
                    <Input
                      disabled={isPending}
                      id="Phone number"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      pattern="^[0-9+\-()\s]*$"
                      className={cn(
                        "h-12 border-neutral-300 rounded-lg focus:border-2",
                        {
                          "focus:border-blue-600": isPhoneValid,
                          "focus:border-red-600": !isPhoneValid,
                        }
                      )}
                      {...field}
                    />
                  </FormControl>
                  {isPhoneValid && hasText && (
                    <Image
                      className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"
                      width={24}
                      height={24}
                      src={"/ImageIcons/check.png"}
                    />
                  )}

                  {!isPhoneValid && hasText && (
                    <Image
                      className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"
                      width={24}
                      height={24}
                      src={"/ImageIcons/error.png"}
                    />
                  )}
                </div>
              </div>
              <FormMessage className="text-[12px] ml-2" />
              <p className="text-xs">
                This number will display on your profile Estorias will not use
                it to contact
              </p>
            </FormItem>
          )}
        />

        <Separator className="bg-neutral-300 mt-3" />

        <div className="flex items-center justify-between mt-3">
          <Button
            variant="ghost"
            disabled={true}
            className="flex items-center bg-neutral-400 gap-x-2 h-8"
          >
            <Icons.earthIcon className="h-3.5 w-3.5" />
            <span className="text-[14px] font-semibold">Public</span>
          </Button>

          <div className="flex items-center gap-x-2">
            <Button
              onClick={() => setToggleAddPhoneNumber(false)}
              variant="ghost"
              className="flex items-center bg-neutral-400 hover:bg-neutral-500 gap-x-2 h-10 px-2"
            >
              <span className="text-[15px] font-semibold">Cancel</span>
            </Button>
            <Button
              type="submit"
              variant="ghost"
              disabled={!isPhoneValid || isPending}
              className="flex items-center bg-blue-600 hover:bg-blue-700 hover:text-white text-white gap-x-2 h-10 px-4"
            >
              {isPending && (
                <Loader2 className="w-5 h-5 text-white animate-spin my-10 mr-1" />
              )}
              <span className="text-[15px] font-semibold">Save</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PhoneNumberForm;
