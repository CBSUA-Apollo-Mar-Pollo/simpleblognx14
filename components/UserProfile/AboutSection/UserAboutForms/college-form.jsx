import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/Textarea";
import { Icons } from "@/components/utils/Icons";
import { months } from "@/constants/Birthdate";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectVisibility from "./select-visibility";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const collegeFormSchema = z.object({
  collegename: z
    .string()
    .min(2, "College name must be at least 2 characters.")
    .max(100)
    .trim()
    .refine((val) => /^[A-Za-z0-9\s\.,-]+$/.test(val), {
      message: "College name contains invalid characters.",
    }),

  startDate: z.object({
    year: z.string().optional(),
    month: z.string().optional(),
    day: z.string().optional(),
  }),

  endDate: z.object({
    year: z.string().optional(),
    month: z.string().optional(),
    day: z.string().optional(),
  }),

  graduated: z.boolean().optional().default(false),

  description: z.string().max(500).trim().optional(),

  attendedFor: z.enum(["College", "Graduate School"]).default("College"),

  degree: z.string().max(100).trim().optional(),
});

const CollegeForm = ({ setToggleCollegeForm, refetch }) => {
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();
  const [selectedAudience, setSelectedAudience] = useState("Public");
  const form = useForm({
    resolver: zodResolver(collegeFormSchema),
    defaultValues: {
      collegename: "",
      startDate: { year: "", month: "", day: "" },
      endDate: { year: "", month: "", day: "" },
      graduated: false,
      description: "",
      attendedFor: "College",
      degree: "",
    },
  });

  const isStartedDateMonthSelected = form.watch("startDate.month", false);
  const isStartedDateDaySelected = form.watch("startDate.day", false);
  const isStartedDateYearSelected = form.watch("startDate.year", false);

  const startedDateSelectedIndexMonth = months.indexOf(
    isStartedDateMonthSelected
  );

  const startedDateDays = new Date(
    isStartedDateYearSelected,
    startedDateSelectedIndexMonth + 1,
    0
  ).getDate();

  const isEndedDateMonthSelected = form.watch("endDate.month", false);
  const isEndedDateDaySelected = form.watch("endDate.day", false);
  const isEndedDateYearSelected = form.watch("endDate.year", false);

  const endedDateSelectedIndexMonth = months.indexOf(
    isStartedDateMonthSelected
  );

  const endedDateDays = new Date(
    isEndedDateYearSelected,
    endedDateSelectedIndexMonth + 1,
    0
  ).getDate();

  const formValueCollegeName = form.watch("collegename");

  const isCollegeNameEmpty = formValueCollegeName === "";

  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: async (data) => {
      const payload = { ...data, selectedAudience };
      const { res } = await axios.post("/api/userProf/about/college", payload);
      return res;
    },
    onError: (err) => {
      console.log(err);
      return toast({
        title: "There was an error",
        description: "Couldn't not add home town, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      refetch();
      setToggleCollegeForm(false);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="collegename"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="University name"
                  className="p-6 border-neutral-300 hover:border-2 hover:border-neutral-400"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[12px] ml-2" />
            </FormItem>
          )}
        />

        <div className="my-3">
          <h1 className="font-semibold text-sm my-2">Time period</h1>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2">
              <FormField
                control={form.control}
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
                    <FormMessage className="text-[12px] ml-2" />
                  </FormItem>
                )}
              />

              {isStartedDateYearSelected && (
                <FormField
                  control={form.control}
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
                      <FormMessage className="text-[12px] ml-2" />
                    </FormItem>
                  )}
                />
              )}

              {isStartedDateMonthSelected && (
                <FormField
                  control={form.control}
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
                      <FormMessage className="text-[12px] ml-2" />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <p>to</p>

            <div className="flex items-center gap-x-2">
              <FormField
                control={form.control}
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
                    <FormMessage className="text-[12px] ml-2" />
                  </FormItem>
                )}
              />

              {isEndedDateYearSelected && (
                <FormField
                  control={form.control}
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
                      <FormMessage className="text-[12px] ml-2" />
                    </FormItem>
                  )}
                />
              )}

              {isEndedDateMonthSelected && (
                <FormField
                  control={form.control}
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
                                for (let day = 1; day <= endedDateDays; day++) {
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
                      <FormMessage className="text-[12px] ml-2" />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4 gap-x-2">
          <FormField
            control={form.control}
            name="graduated"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 my-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormLabel className="text-sm font-semibold">
                  Graduated
                </FormLabel>
                <FormMessage className="text-[12px] ml-2" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col space-y-2 items-start justify-center gap-x-2 relative">
                {/* <FormLabel className="font-semibold text-sm pl-1">
                                  School
                                </FormLabel> */}
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    className="h-12 border border-neutral-300  rounded-lg focus:border-2  focus:border-blue-600  resize-none hover:border-2 hover:border-neutral-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px] ml-2" />
              </div>
              <FormMessage className="text-[12px] ml-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attendedFor"
          render={({ field }) => (
            <FormItem className="mt-4">
              <h1 className="font-semibold text-sm my-2">Attended for</h1>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="College"
                        className="h-5 w-5 border-2 data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:[&_svg]:fill-blue-500 [&_svg]:h-3  [&_svg]:w-5"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">College</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="Graduate School"
                        className="h-5 w-5 border-2 data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:[&_svg]:fill-blue-500 [&_svg]:h-3  [&_svg]:w-5"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Graduate School
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage className="text-[12px] ml-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormControl>
                <Input
                  placeholder="Degree"
                  className="p-6 border-neutral-300 hover:border-2 hover:border-neutral-400"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[12px] ml-2" />
            </FormItem>
          )}
        />

        <Separator className="bg-neutral-300 mt-3" />

        {/* Save button */}

        <div className="flex items-center justify-between mt-3">
          <SelectVisibility
            selectedAudience={selectedAudience}
            setSelectedAudience={setSelectedAudience}
          />

          <div className="flex items-center gap-x-2">
            <Button
              disabled={isPending}
              onClick={() => setToggleCollegeForm(false)}
              variant="ghost"
              className="flex items-center bg-neutral-300 gap-x-2 h-10 px-2"
            >
              <span className="text-[15px] font-semibold">Cancel</span>
            </Button>
            <Button
              variant="ghost"
              disabled={isCollegeNameEmpty || isPending}
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

export default CollegeForm;
