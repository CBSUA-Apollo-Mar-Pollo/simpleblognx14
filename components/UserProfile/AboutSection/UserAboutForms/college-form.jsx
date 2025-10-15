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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const collegeFormSchema = z.object({
  collegename: z.string(),
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
  attendedFor: z.enum(["College", "Graduate School"]),
  degree: z.string(),
});

const CollegeForm = ({ toggleCollegeForm, setToggleCollegeForm }) => {
  const currentYear = new Date().getFullYear();
  const form = useForm({
    resolver: zodResolver(collegeFormSchema),
    defaultValues: {
      collegename: "",
      startDate: { year: "", month: "", day: "" },
      endDate: { year: "", month: "", day: "" },
      description: "",
      attendedFor: "College",
      degree: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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

  return (
    <div>
      {toggleCollegeForm && (
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
                      onValueChang={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="College" />
                        </FormControl>
                        <FormLabel className="font-normal">College</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Graduate School" />
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
              name="collegename"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormControl>
                    <Input
                      placeholder="Degree"
                      className="p-6 border-neutral-300 hover:border-2 hover:border-neutral-400"
                      {...field}
                    />
                  </FormControl>
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
                  onClick={() => setToggleCollegeForm(false)}
                  variant="ghost"
                  className="flex items-center bg-neutral-300 gap-x-2 h-10 px-2"
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

export default CollegeForm;
