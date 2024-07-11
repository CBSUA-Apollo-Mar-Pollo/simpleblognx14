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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { formatDate } from "@/actions/formatBirthDate";
import { Separator } from "@/components/ui/Separator";
import UserAvatar from "@/components/utils/UserAvatar";

const formSchema = z.object({
  month: z.string(),
  day: z.string(),
  year: z.string(),
  // Other fields in your schema
});

const BirthdateInfoModal = () => {
  const { data: session } = useSession();
  console.log(session);
  const { toast } = useToast();
  const [toggleContentModal, setToggleContentModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: "",
      day: "",
      year: "2024",
    },
  });

  const currentYear = new Date().getFullYear();

  const isMonthSelected = form.watch("month", false);
  const isDaySelected = form.watch("day", false);
  const isYearSelected = form.watch("year", false);

  const selectedIndexMonth = months.indexOf(isMonthSelected);

  const days = new Date(isYearSelected, selectedIndexMonth + 1, 0).getDate();

  const { mutate: onSubmit, isLoading } = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.post(
        "/api/settings/account/birthdate",
        values
      );
      return data;
    },
    onError: (err) => {
      return toast({
        title: "There was an error",
        description: "Could not save the birthdate, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "Successfully added birthdate",
        variant: "success",
      });
    },
  });

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
      <DialogContent className="dark:bg-neutral-800 border-0 dark:text-neutral-50 min-w-[35vw] min-h-[20vw]">
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
            <h1 className="font-bold text-2xl mb-2">
              {session?.user.birthdate !== null ? "Edit" : "Add"} Birthdate
            </h1>
            <DialogDescription className="text-neutral-800 dark:text-neutral-300 text-justify">
              This birthday is used for the accounts and profiles in this
              Accounts Center. Any changes you make will apply to all of them.
            </DialogDescription>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex mt-4 gap-x-3">
                  {/* year select */}
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select
                            defaultValue="2024"
                            onValueChange={field.onChange}
                          >
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
                                {/* Generate years dynamically */}
                                {(() => {
                                  const years = [];
                                  for (
                                    let year = 1960;
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

                  {/* month select */}
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            disabled={
                              form.formState.isDirty === false &&
                              form.formState.dirtyFields.year === undefined
                            }
                          >
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
                  {/* days */}
                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            disabled={
                              form.formState.dirtyFields.month === undefined
                            }
                          >
                            <SelectTrigger className="h-14 rounded-xl font-semibold text-neutral-800 relative space-y-4 px-3">
                              {isDaySelected ? (
                                <>
                                  <FormLabel className="absolute top-2 text-xs">
                                    Day
                                  </FormLabel>
                                  <span>{isDaySelected}</span>
                                </>
                              ) : (
                                <SelectValue placeholder="Day" />
                              )}
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
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
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="font-bold text-2xl">Birthday</h1>
                <DialogDescription className="text-neutral-800 dark:text-neutral-300">
                  Providing your birthday helps make sure you get the right
                  experience for your age.
                </DialogDescription>
              </div>

              {session?.user.birthdate !== null ? (
                <div className="border border-neutral-200 rounded-2xl  py-3">
                  <div className="flex items-center justify-between px-4 pb-2">
                    <span className="font-semibold">
                      {formatDate(session?.user.birthdate)}
                    </span>
                    <Button
                      onClick={() => setToggleContentModal(true)}
                      variant="ghost"
                      className="border rounded-full px-5"
                    >
                      Edit
                    </Button>
                  </div>
                  <Separator className="bg-neutral-300 h-[0.1px]" />

                  <div className="px-4 pt-3 flex items-center gap-x-3">
                    <UserAvatar
                      post="post"
                      className="h-12 w-12 "
                      user={{
                        handleName: session?.user.handleName,
                        bio: session?.user.bio,
                        birthdate: session?.user.birthdate,
                        name: session?.user.name || null,
                        image: session?.user.image || null,
                      }}
                    />
                    <div>
                      <p className="font-semibold text-[15px]">
                        {session?.user.name}
                      </p>
                      <span className="text-[14px] font-semibold text-neutral-700">
                        Estorya
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setToggleContentModal(true)}
                  className="gap-x-3 bg-blue-700 hover:bg-blue-500"
                >
                  {/* <Icons.birthdateAddIcon className="h-[1.5rem] w-[1.5rem] fill-current" /> */}
                  Add birthdate
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BirthdateInfoModal;
