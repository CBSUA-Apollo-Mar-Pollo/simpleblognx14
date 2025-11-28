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
import { Progress } from "@/components/ui/Progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/Textarea";
import CountriesPhoneFormatSelectInput from "@/components/utils/countries-phone-format-select-input";
import { ChevronRight, Loader2, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const PageCreationStepOneSidebar = ({
  setSideBarStepProcessCounter,
  onSubmit,
  isSubmitDisabled,
  form,
  isLoading,
  formValues,
  setOpenLeavePageModal,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center py-2 pl-3 gap-x-2">
        <Button
          onClick={() =>
            formValues ? setOpenLeavePageModal(true) : router.push("/")
          }
          className="p-2 bg-neutral-500 rounded-full"
        >
          <X className="text-white" />
        </Button>
        <Link href="/" className="font-bold">
          <span className=" px-3.5 py-[2px] rounded-full bg-yellow-500/80 text-[27px] ">
            E
          </span>
        </Link>
      </div>

      <Separator className="my-2" />

      <div className="pl-4 pt-3 flex-1 relative ">
        <div className="flex items-center">
          <Link
            href="/pages"
            className="hover:underline text-xs font-semibold text-neutral-700"
          >
            Step 1 of 4
          </Link>
        </div>

        <div className="mt-2">
          <div className="pr-6">
            <h1 className="font-bold text-2xl">Finish setting up your page</h1>
            <p className="text-justify text-neutral-600 font-light">
              Success! Your page has been created. Now, let&apos;s add some more
              details to make it stand out.
            </p>
          </div>

          <SimpleBar forceVisible="y" style={{ maxHeight: "62vh" }}>
            <div className="mt-4 pr-7 mb-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col space-y-3">
                    <h1 className="font-bold">Contact</h1>
                    <FormField
                      control={form.control}
                      name="pagename"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[13px]">Website</FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 border-neutral-300 rounded-lg focus:border-2  focus:border-blue-600 "
                              {...field}
                            />
                          </FormControl>

                          <FormMessage className="text-[12px] ml-2" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pagecategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <div className="flex items-center gap-x-2 relative">
                            <CountriesPhoneFormatSelectInput />
                            <FormControl>
                              <Input
                                className="h-12 border-neutral-300  rounded-lg focus:border-2  focus:border-blue-600 "
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
                      name="pagebio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 border-neutral-300  rounded-lg focus:border-2  focus:border-blue-600 "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[12px] ml-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 mt-4">
                    <h1 className="font-bold">Location</h1>
                    <FormField
                      control={form.control}
                      name="pagename"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[13px]">Address</FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 border-neutral-300 rounded-lg focus:border-2  focus:border-blue-600 "
                              {...field}
                            />
                          </FormControl>

                          <FormMessage className="text-[12px] ml-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pagename"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[13px]">
                            City/Town
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 border-neutral-300 rounded-lg focus:border-2  focus:border-blue-600 "
                              {...field}
                            />
                          </FormControl>

                          <FormMessage className="text-[12px] ml-2" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pagename"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[13px]">
                            ZIP code
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 border-neutral-300 rounded-lg focus:border-2  focus:border-blue-600 "
                              {...field}
                            />
                          </FormControl>

                          <FormMessage className="text-[12px] ml-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 mt-4">
                    <h1 className="font-bold">Hours</h1>
                    <p className="text-sm pb-3">
                      Let people know your location&apos;s hours.
                    </p>
                    <FormField
                      control={form.control}
                      name="pagename"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup>
                              <div className="flex items-center gap-x-4">
                                <RadioGroupItem
                                  value="basic"
                                  className="border-2 h-5 w-5 "
                                />
                                <div>
                                  <h1 className="font-medium text-[15px]">
                                    No hours available
                                  </h1>
                                  <p className="text-xs text-neutral-600">
                                    Don&apos;t show any hours.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-x-4">
                                <RadioGroupItem
                                  value="basic"
                                  className="border-2 h-5 w-5 "
                                />
                                <div>
                                  <h1 className="font-medium text-[15px]">
                                    Always open
                                  </h1>
                                  <p className="text-xs text-neutral-600">
                                    You&apos;re open 24 hours a day.
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-x-4">
                                <RadioGroupItem
                                  value="basic"
                                  className="border-2 h-5 w-5 "
                                />
                                <div>
                                  <h1 className="font-medium text-[15px]">
                                    Open at selected hours
                                  </h1>
                                  <p className="text-xs text-neutral-600">
                                    Enter your specific hours.
                                  </p>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>

                          <FormMessage className="text-[12px] ml-2" />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>
          </SimpleBar>
          <div
            className="absolute bottom-0 left-0 w-full px-3 py-2  z-20 bg-white   before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-2 
  before:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] before:pointer-events-none"
          >
            <h1 className="font-semibold">Page health:Needs work</h1>
            <p className="text-sm">
              Compared to similar Pages with high engagement.
            </p>
            <Progress value={80} className="h-2 my-2" />
            <div className="flex items-center gap-x-2">
              <Button
                onClick={() =>
                  setSideBarStepProcessCounter((prevCount) => {
                    if (prevCount > 0) {
                      return prevCount - 1;
                    }
                    return prevCount;
                  })
                }
                className="w-full bg-neutral-300 hover:bg-neutral-400 text-black"
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  setSideBarStepProcessCounter((prevCount) => {
                    return prevCount + 1;
                  })
                }
                className="w-full bg-blue-100 hover:bg-blue-300 text-blue-700"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCreationStepOneSidebar;
