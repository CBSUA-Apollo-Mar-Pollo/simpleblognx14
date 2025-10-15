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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserAboutPhoneNumberSchema = z.object({
  phonenumber: z.string().min(10, "Must be at least 10 digits"),
});

const PhoneNumberForm = ({ toggleAddPhoneNumber, setToggleAddPhoneNumber }) => {
  const PhoneInfoForm = useForm({
    resolver: zodResolver(UserAboutPhoneNumberSchema),
    defaultValues: {
      phonenumber: "",
    },
  });

  const onSubmit = () => {};
  return (
    <div>
      {toggleAddPhoneNumber && (
        <Form {...PhoneInfoForm}>
          <form onSubmit={PhoneInfoForm.handleSubmit(onSubmit)}>
            <FormField
              control={PhoneInfoForm.control}
              name="pagecategory"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start justify-center gap-x-2 relative">
                    <CountriesPhoneFormatSelectInput />
                    <div className="flex flex-col w-full items-start gap-x-2 relative">
                      <FormControl>
                        <Input
                          placeholder="Phone number"
                          className="h-12 border-neutral-300  rounded-lg focus:border-2  focus:border-blue-600 "
                          {...field}
                        />
                      </FormControl>
                      <FormDescription
                        className="text-xs p-1
                            "
                      >
                        Given phone number must be a valid telephone number.
                      </FormDescription>
                    </div>
                  </div>
                  <p className="text-xs">
                    This number will display on your profile.Estorias will not
                    use it to contact
                  </p>

                  <FormMessage className="text-[12px] ml-2" />
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
                  className="flex items-center bg-neutral-400 gap-x-2 h-10 px-2"
                >
                  <span className="text-[15px] font-semibold">Cancel</span>
                </Button>
                <Button
                  variant="ghost"
                  disabled={true}
                  className="flex items-center bg-neutral-400 gap-x-2 h-10 px-4"
                >
                  <span className="text-[15px] font-semibold">Save</span>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PhoneNumberForm;
