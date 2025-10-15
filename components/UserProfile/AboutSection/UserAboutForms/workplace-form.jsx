import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
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

const WorkPlaceFormSchema = z.object({
  companyname: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." })
    .max(50, { message: "Company name must be at most 50 characters." }),
  position: z
    .string()
    .min(2, { message: "Position must be at least 2 characters" })
    .max(50, { message: "Position  must be at most 50 characters." }),
  address: z
    .string()
    .min(3, { messag: "Address must be at least  3 characters" })
    .max(50, { message: "address  must be at most 50 characters." }),
  description: z
    .string()
    .min(3, { message: "Description must be atleast 3 characters " })
    .max(200, { message: "Description must be at most 200 characters." }),
});

const WorkPlaceForm = ({ setToggleWorkPlaceForm }) => {
  const currentYear = new Date().getFullYear();
  const form = useForm({
    resolver: zodResolver(WorkPlaceFormSchema),
    defaultValues: {
      companyname: "",
      position: "",
      address: "",
      description: "",
    },
  });

  const onSubmit = () => {};

  const isMonthSelected = form.watch("startDate.month", false);
  const isDaySelected = form.watch("startDate.day", false);
  const isYearSelected = form.watch("startDate.year", false);

  const selectedIndexMonth = months.indexOf(isMonthSelected);

  const days = new Date(isYearSelected, selectedIndexMonth + 1, 0).getDate();

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="companyname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Company"
                  className="p-6 border-neutral-300 hover:border-2 hover:border-neutral-400"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Position"
                  className="p-6 border-neutral-300 hover:border-2 hover:border-neutral-400"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="City/Town"
                  className="p-6 border-neutral-300 hover:border-2 hover:border-neutral-400"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className=" border border-neutral-300 hover:border-2 hover:border-neutral-400 resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="my-3">
          <h1 className="font-semibold text-sm my-2">Time period</h1>
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
                  I currently work here
                </FormLabel>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2">
              <p>From</p>
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

              {isYearSelected && (
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

              {isMonthSelected && (
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
                                for (let day = 1; day <= days; day++) {
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
              onClick={() => setToggleWorkPlaceForm(false)}
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
  );
};

export default WorkPlaceForm;
