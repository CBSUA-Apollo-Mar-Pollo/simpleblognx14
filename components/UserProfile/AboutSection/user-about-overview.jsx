"use client";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
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
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/Textarea";
import CountriesPhoneFormatSelectInput from "@/components/utils/countries-phone-format-select-input";
import { Icons } from "@/components/utils/Icons";
import { months } from "@/constants/Birthdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, PlusCircle } from "lucide-react";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserAboutPhoneNumberSchema = z.object({
  phonenumber: z.string().min(10, "Must be at least 10 digits"),
});

const UserAboutHighSchoolSchema = z.object({
  schoolname: z.string(),
  startDate: z.object({
    year: z.string(),
    month: z.string().optional(),
    day: z.string().optional(),
  }),
  endDate: z.object({
    year: z.number(),
    month: z.string().optional(),
    day: z.string().optional(),
  }),
  description: z.string(),
});

const UserAboutOverView = () => {
  const [toggleAddPhoneNumber, setToggleAddPhoneNumber] = useState(false);
  const [toggleHighSchool, setToggleHighSchool] = useState(false);

  const currentYear = new Date().getFullYear();

  const HighSchoolForm = useForm({
    resolver: zodResolver(UserAboutHighSchoolSchema),
    defaultValues: {
      schoolname: "",
      startDate: { year: "", month: "", day: "" },
      endDate: { year: "", month: "", day: "" },
      description: "",
    },
  });
  const PhoneInfoForm = useForm({
    resolver: zodResolver(UserAboutPhoneNumberSchema),
    defaultValues: {
      phonenumber: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const isStartedDateMonthSelected = HighSchoolForm.watch(
    "startDate.month",
    false
  );
  const isStartedDateDaySelected = HighSchoolForm.watch("startDate.day", false);
  const isStartedDateYearSelected = HighSchoolForm.watch(
    "startDate.year",
    false
  );

  const startedDateSelectedIndexMonth = months.indexOf(
    isStartedDateMonthSelected
  );

  const startedDateDays = new Date(
    isStartedDateYearSelected,
    startedDateSelectedIndexMonth + 1,
    0
  ).getDate();

  const isEndedDateMonthSelected = HighSchoolForm.watch("endDate.month", false);
  const isEndedDateDaySelected = HighSchoolForm.watch("endDate.day", false);
  const isEndedDateYearSelected = HighSchoolForm.watch("endDate.year", false);

  const endedDateSelectedIndexMonth = months.indexOf(
    isStartedDateMonthSelected
  );

  const endedDateDays = new Date(
    isEndedDateYearSelected,
    endedDateSelectedIndexMonth + 1,
    0
  ).getDate();

  console.log(isStartedDateYearSelected, "year");
  return (
    <div className="col-span-6 pl-4 pr-20 pt-10 pb-4 space-y-6">
      {/* <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-x-6 p-0 pl-3 font-medium  text-[15px]"
            >
              <PlusCircle className="text-blue-600" />
              <p className="text-blue-600">Life events</p>
            </Button> */}

      {/* high school form */}
      <div>
        {toggleHighSchool && (
          <Form {...HighSchoolForm}>
            <form onSubmit={HighSchoolForm.handleSubmit(onSubmit)}>
              <FormField
                control={HighSchoolForm.control}
                name="schoolname"
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

              <div className="my-3">
                <h1 className="font-semibold text-sm my-2">Time period</h1>
                <div className="flex items-center gap-x-2">
                  <div className="flex items-center gap-x-2">
                    <FormField
                      control={HighSchoolForm.control}
                      name="startDate.year"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              defaultValue="Year"
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="bg-neutral-200 font-semibold focus:ring-0 flex gap-x-2">
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Year">Year</SelectItem>
                                  {/* Generate years dynamically */}

                                  {(() => {
                                    const years = [];
                                    for (
                                      let year = 1999;
                                      year <= currentYear;
                                      year++
                                    ) {
                                      years.push(
                                        <SelectItem
                                          key={year}
                                          value={year.toString()}
                                          className="cursor-pointer"
                                        >
                                          {year}
                                        </SelectItem>
                                      );
                                    }
                                    return years;
                                  })()}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {isStartedDateYearSelected && (
                      <FormField
                        control={HighSchoolForm.control}
                        name="startDate.month"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue="Month"
                              >
                                <SelectTrigger className="bg-neutral-200 font-semibold focus:ring-0 flex gap-x-2">
                                  <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="Month">Month</SelectItem>
                                    {months.map((month, index) => (
                                      <SelectItem value={month} key={index}>
                                        {month}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    {isStartedDateMonthSelected && (
                      <FormField
                        control={HighSchoolForm.control}
                        name="startDate.day"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue="Day"
                              >
                                <SelectTrigger className="bg-neutral-200 font-semibold focus:ring-0 flex gap-x-2">
                                  <SelectValue placeholder="Day" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="Day">Day</SelectItem>
                                    {(() => {
                                      const daysArray = [];
                                      for (
                                        let day = 1;
                                        day <= startedDateDays;
                                        day++
                                      ) {
                                        daysArray.push(
                                          <SelectItem
                                            key={day}
                                            value={day.toString()}
                                          >
                                            {day}
                                          </SelectItem>
                                        );
                                      }
                                      return daysArray;
                                    })()}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <p>to</p>

                  <div className="flex items-center gap-x-2">
                    <FormField
                      control={HighSchoolForm.control}
                      name="endDate.year"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              defaultValue="Year"
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="bg-neutral-200 font-semibold focus:ring-0 flex gap-x-2">
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="Year">Year</SelectItem>
                                    {/* Generate years dynamically */}

                                    {(() => {
                                      const years = [];
                                      for (
                                        let year = 1999;
                                        year <= currentYear;
                                        year++
                                      ) {
                                        years.push(
                                          <SelectItem
                                            key={year}
                                            value={year.toString()}
                                            className="cursor-pointer"
                                          >
                                            {year}
                                          </SelectItem>
                                        );
                                      }
                                      return years;
                                    })()}
                                  </SelectGroup>
                                </SelectContent>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {isEndedDateYearSelected && (
                      <FormField
                        control={HighSchoolForm.control}
                        name="endDate.month"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue="Month"
                              >
                                <SelectTrigger className="bg-neutral-200 font-semibold focus:ring-0 flex gap-x-2">
                                  <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="Month">Month</SelectItem>
                                    {months.map((month, index) => (
                                      <SelectItem value={month} key={index}>
                                        {month}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    {isEndedDateMonthSelected && (
                      <FormField
                        control={HighSchoolForm.control}
                        name="endDate.day"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue="Day"
                              >
                                <SelectTrigger className="bg-neutral-200 font-semibold focus:ring-0 flex gap-x-2">
                                  <SelectValue placeholder="Day" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="Day">Day</SelectItem>
                                    {(() => {
                                      const daysArray = [];
                                      for (
                                        let day = 1;
                                        day <= endedDateDays;
                                        day++
                                      ) {
                                        daysArray.push(
                                          <SelectItem
                                            key={day}
                                            value={day.toString()}
                                          >
                                            {day}
                                          </SelectItem>
                                        );
                                      }
                                      return daysArray;
                                    })()}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-4 gap-x-2">
                <Checkbox id="graduated" className="h-5 w-5 ml-1" />
                <Label htmlFor="graduated" className="font-semibold text-sm">
                  Graduated
                </Label>
              </div>

              <FormField
                control={HighSchoolForm.control}
                name="discription"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-2 items-start justify-center gap-x-2 relative">
                      {/* <FormLabel className="font-semibold text-sm pl-1">
                      School
                    </FormLabel> */}
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          className="h-12 border border-neutral-300  rounded-lg focus:border-2  focus:border-blue-600  resize-none"
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
      </div>

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
