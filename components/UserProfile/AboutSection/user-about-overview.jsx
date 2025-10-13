"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/Textarea";
import CountriesPhoneFormatSelectInput from "@/components/utils/countries-phone-format-select-input";
import { Icons } from "@/components/utils/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserAboutSchema = z.object({
  phonenumber: z.string(),
});

const UserAboutOverView = () => {
  const [toggleAddPhoneNumber, setToggleAddPhoneNumber] = useState(false);
  const [toggleHighSchool, setToggleHighSchool] = useState(false);
  const [toggleCollege, setToggleCollege] = useState(false);
  const [toggleCurrentCity, setToggleCurrentCity] = useState(false);
  const [toggleHometown, setToggleHometown] = useState(false);
  const [toggleRelationshipStatus, setToggleRelationshipStatus] =
    useState(false);
  const form = useForm({
    resolver: zodResolver(UserAboutSchema),
    defaultValues: {
      phonenumber: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="col-span-6 pl-4 pr-20 pt-10 pb-4 space-y-6">
      {/* <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
            >
              <PlusCircle className="text-blue-600" />
              <p className="text-blue-600">Life events</p>
            </Button> */}

      {toggleHighSchool && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="pagecategory"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2 items-start justify-center gap-x-2 relative">
                    {/* <FormLabel className="font-semibold text-sm pl-1">
                      School
                    </FormLabel> */}
                    <FormControl>
                      <Input
                        placeholder="Add your school"
                        className="h-12 border-neutral-300  rounded-lg focus:border-2  focus:border-blue-600 "
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-[12px] ml-2" />
                </FormItem>
              )}
            />

            <div>
              <h1 className="text-sm font-semibold">Time period</h1>
            </div>

            <FormField
              control={form.control}
              name="pagecategory"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-2 items-start justify-center gap-x-2 relative">
                    {/* <FormLabel className="font-semibold text-sm pl-1">
                      School
                    </FormLabel> */}
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className="h-12 border border-neutral-300  rounded-lg focus:border-2  focus:border-blue-600 "
                        {...field}
                      />
                    </FormControl>
                  </div>
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
                  onClick={() => setToggleHighSchool(false)}
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

      {!toggleHighSchool && (
        <Button
          onClick={() => setToggleHighSchool(!toggleHighSchool)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add highschool</p>
        </Button>
      )}
      <Button
        variant="ghost"
        className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
      >
        <PlusCircle className="text-blue-600" />
        <p className="text-blue-600">Add college</p>
      </Button>
      <Button
        variant="ghost"
        className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
      >
        <PlusCircle className="text-blue-600" />
        <p className="text-blue-600">Add current city</p>
      </Button>
      <Button
        variant="ghost"
        className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
      >
        <PlusCircle className="text-blue-600" />
        <p className="text-blue-600">Add hometown</p>
      </Button>
      <Button
        variant="ghost"
        className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
      >
        <PlusCircle className="text-blue-600" />
        <p className="text-blue-600">Add relationsh status</p>
      </Button>
      {toggleAddPhoneNumber && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
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

      {!toggleAddPhoneNumber && (
        <Button
          onClick={() => setToggleAddPhoneNumber(!toggleAddPhoneNumber)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
        >
          <PlusCircle className="text-blue-600" />
          <p className="text-blue-600">Add phone number</p>
        </Button>
      )}
    </div>
  );
};

export default UserAboutOverView;
