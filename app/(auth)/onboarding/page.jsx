"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Check, ChevronLeft } from "lucide-react";
import { DialogDescription } from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { months } from "@/constants/Birthdate";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  month: z.string(),
  day: z.string(),
  year: z.string(),
});

const usernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
});

const OnboardingClient = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session, update } = useSession();
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [suggestedUsernames, setSuggestedUsernames] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const topics = [
    "Music",
    "Entertainment",
    "Sports",
    "Gaming",
    "Fashion & Beauty",
    "Food",
    "Business & finance",
    "Arts & Culture",
    "Technology",
    "Travel",
    "Outdoors",
    "Fitness",
    "Careers",
    "Animation  & Comics",
    "Entertainment industry",
    "Science",
  ];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: "",
      day: "",
      year: new Date().getFullYear().toString(),
    },
  });

  const usernameForm = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });
  const currentYear = new Date().getFullYear();

  const isMonthSelected = form.watch("month", false);
  const isDaySelected = form.watch("day", false);
  const isYearSelected = form.watch("year", false);

  const selectedIndexMonth = months.indexOf(isMonthSelected);

  const days = new Date(isYearSelected, selectedIndexMonth + 1, 0).getDate();

  // Generate suggested usernames based on user's name
  const generateUsernameSuggestions = (name) => {
    if (!name) return [];

    const cleanName = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9_]/g, "");

    const suggestions = [];

    // Suggestion 1: Clean name as is
    if (cleanName.length >= 3 && cleanName.length <= 20) {
      suggestions.push(cleanName);
    }

    // Suggestion 2: Clean name with random numbers
    const withNumbers = cleanName + Math.floor(Math.random() * 9999);
    if (withNumbers.length <= 20) {
      suggestions.push(withNumbers);
    } else {
      suggestions.push(
        cleanName.slice(0, 20 - 4) + Math.floor(Math.random() * 99)
      );
    }

    // Suggestion 3: Clean name with underscore and numbers
    const withUnderscore = cleanName + "_" + Math.floor(Math.random() * 999);
    if (withUnderscore.length <= 20) {
      suggestions.push(withUnderscore);
    } else {
      suggestions.push(
        cleanName.slice(0, 20 - 5) + "_" + Math.floor(Math.random() * 99)
      );
    }

    return suggestions.filter((s) => s.length >= 3 && s.length <= 20);
  };

  // Generate suggestions when step 2 is accessed
  const handleStep2Access = () => {
    if (session?.user?.name) {
      const suggestions = generateUsernameSuggestions(session.user.name);
      setSuggestedUsernames(suggestions);
      // Set first suggestion as default
      if (suggestions.length > 0) {
        usernameForm.setValue("username", suggestions[0]);
      }
    }
    setOnboardingStep(2);
  };

  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: async () => {
      const monthMap = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12",
      };
      const { year, month, day } = form.getValues();
      const monthNumber = monthMap[month];
      const usernameValue = usernameForm.getValues();
      const dateString = `${year}-${monthNumber}-${String(day).padStart(
        2,
        "0"
      )}`;
      const payload = {
        birthDate: dateString,
        username: "@" + usernameValue.username,
        topics: selectedTopics,
      };

      const { data } = await axios.post("/api/onboarding", payload);
      return data;
    },
    onError: (err) => {
      console.log(err);
      return toast({
        title: "There was an error",
        description:
          "Couldn't complete your onboarding, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "Onboarding completed successfully!",
        variant: "success",
      });
    },
  });

  return (
    <div className="flex items-center h-screen justify-center gap-20">
      {/* Left side - branding */}

      {/* Right side - form */}
      <div
        className={`lg:mx-auto flex flex-col items-center py-2 gap-5 lg:w-full w-screen px-7 ${
          onboardingStep === 3 ? "mt-64" : "mt-2"
        } `}
      >
        <div className="font-bold">
          <span className=" px-5 py-[2px] rounded-full bg-yellow-500/80 text-[40px] ">
            E
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Complete Your Profile
        </h1>
        <p className="text-sm text-slate-600 text-center -mt-5">
          Tell us a bit about yourself to get started
        </p>

        {/* Birth Date */}
        {onboardingStep === 1 && (
          <div className="mt-10 mb-32">
            <h1 className="text-3xl font-bold">What's your birth date?</h1>

            <p className="text-sm text-slate-600 mt-2">
              Providing your birthday helps make sure you get the right
              experience for your age.
            </p>

            <div className="mt-5">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex gap-x-2">
                    {/* year select */}
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Select
                              defaultValue={new Date().getFullYear().toString()}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="h-14 w-40 rounded-xl border-neutral-300 font-semibold text-neutral-800 relative space-y-4 px-3">
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
                              <SelectTrigger className="h-14 w-40 rounded-xl font-semibold text-neutral-800 relative space-y-4 px-3">
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
                              <SelectTrigger className="h-14 w-40 rounded-xl font-semibold text-neutral-800 relative space-y-4 px-3">
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
                    onClick={() => handleStep2Access()}
                    disabled={form.formState.dirtyFields.day === undefined}
                    type="submit"
                    className="w-full mt-5 rounded-full bg-blue-700 hover:bg-blue-600"
                  >
                    Next
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        )}

        {onboardingStep === 2 && (
          <div className="mt-5">
            <h1 className="text-3xl font-bold">What should we call you?</h1>

            <p className="text-sm text-slate-600 mt-2">
              Your @username is unique to you and can be changed later.
            </p>

            <div className="mt-5">
              <Form {...usernameForm}>
                <form onSubmit={usernameForm.handleSubmit(onSubmit)}>
                  <FormField
                    control={usernameForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="w-full border border-gray-300 px-3 pt-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-150 ease-in-out">
                            <p className="text-xs text-gray-500 font-medium">
                              Username
                            </p>
                            <div className="flex items-center pb-1">
                              <p className="text-gray-600 mr-1">@</p>
                              <input
                                {...field}
                                className="w-full outline-none border-none focus:ring-0 text-sm"
                                placeholder="yourusername"
                              />
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Suggested Usernames */}
                  {suggestedUsernames.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm text-gray-600 font-medium mb-3">
                        Suggested usernames:
                      </p>
                      <div className="flex flex-col gap-2">
                        {suggestedUsernames.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              usernameForm.setValue("username", suggestion)
                            }
                            className={`w-full p-3 text-left border rounded-lg transition-colors ${
                              usernameForm.watch("username") === suggestion
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-gray-600">@</span>
                            <span className="font-medium text-gray-900">
                              {suggestion}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => setOnboardingStep(3)}
                    type="submit"
                    className="w-full mt-6 rounded-full bg-blue-700 hover:bg-blue-600"
                  >
                    Next
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        )}

        {onboardingStep === 3 && (
          <div className=" max-w-[28vw]">
            <h1 className="text-3xl font-bold">
              What do you want to see on estorias?
            </h1>

            <p className="text-sm text-slate-600 mt-2">
              Select at least 3 topics to personalize your experience.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {topics.map((topic, index) => (
                <div
                  onClick={() => {
                    if (selectedTopics.includes(topic)) {
                      setSelectedTopics(
                        selectedTopics.filter((t) => t !== topic)
                      );
                    } else {
                      setSelectedTopics([...selectedTopics, topic]);
                    }
                  }}
                  className="relative border-2 border-neutral-700/30 rounded-lg h-28 flex flex-col justify-end px-4 pb-3 hover:bg-neutral-100 hover:cursor-pointer"
                >
                  {selectedTopics.includes(topic) && (
                    <div className="bg-black text-white rounded-full p-1 absolute top-2 right-2">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                  <p className="font-bold text-neutral-700">{topic}</p>
                </div>
              ))}
            </div>

            <Button
              disabled={selectedTopics.length === 0}
              onClick={onSubmit}
              type="submit"
              className="w-full mt-6 rounded-full bg-blue-700 hover:bg-blue-600"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingClient;
