import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { ChevronLeft, ChevronRight, Watch } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Icons } from "@/components/utils/Icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { months } from "@/constants/Birthdate";

const formSchema = z.object({
  month: z.string(),
  day: z.string(),
  year: z.string(),
  // Other fields in your schema
});

const BirthdateInfoModal = () => {
  const [toggleContentModal, setToggleContentModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: "",
      day: "",
      year: "",
    },
  });

  const isMonthSelected = form.watch("month", false);
  const isDaySelected = form.watch("day", false);
  const isYearSelected = form.watch("year", false);

  const selectedIndexMonth = months.indexOf(isMonthSelected);

  console.log(selectedIndexMonth, "index");

  console.log(new Date(202, selectedIndexMonth + 1, 0).getDate());

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full bg-white border border-neutral-200 dark:border-0 px-6 rounded-none  flex justify-between dark:text-white py-7 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        >
          Birthday
          <ChevronRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-neutral-800 border-0 dark:text-neutral-50 min-w-[35vw]">
        {toggleContentModal && (
          <div>
            <Button
              onClick={() => {
                setToggleContentModal(false);
              }}
              size="icon"
              variant="ghost"
              className="hover:bg-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-50 rounded-full mb-4"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>
            <h1 className="font-bold text-2xl mb-2">Add Birthdate</h1>
            <DialogDescription className="text-neutral-800 dark:text-neutral-300 text-justify">
              This birthday is used for the accounts and profiles in this
              Accounts Center. Any changes you make will apply to all of them.
            </DialogDescription>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex mt-4 gap-x-3">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="h-14 rounded-xl font-semibold text-neutral-800 relative space-y-4 px-3">
                              {isYearSelected && (
                                <FormLabel className="absolute top-2 text-xs">
                                  Year
                                </FormLabel>
                              )}
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">
                                  Blueberry
                                </SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">
                                  Pineapple
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="h-14 rounded-xl font-semibold text-neutral-800 relative space-y-4 px-3">
                              {isMonthSelected && (
                                <FormLabel className="absolute top-2 text-xs">
                                  Month
                                </FormLabel>
                              )}

                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
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
                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="h-14 rounded-xl font-semibold text-neutral-800 relative space-y-4 px-3">
                              {isDaySelected && (
                                <FormLabel className="absolute top-2 text-xs">
                                  Day
                                </FormLabel>
                              )}

                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">
                                  Blueberry
                                </SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">
                                  Pineapple
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mt-5 rounded-full bg-blue-700 hover:bg-blue-600"
                >
                  Save
                </Button>
              </form>
            </Form>
          </div>
        )}
        {toggleContentModal === false && (
          <>
            <div className="space-y-2">
              <h1 className="font-bold text-2xl">Birthday</h1>
              <DialogDescription className="text-neutral-800 dark:text-neutral-300">
                Providing your birthday helps make sure you get the right
                experience for your age.
              </DialogDescription>
            </div>

            <Button
              onClick={() => setToggleContentModal(true)}
              className="gap-x-3 bg-blue-700 hover:bg-blue-500"
            >
              <Icons.birthdateAddIcon className="h-[1.5rem] w-[1.5rem] fill-current" />
              Add birthdate
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BirthdateInfoModal;
