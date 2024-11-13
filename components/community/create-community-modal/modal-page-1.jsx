import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { AlertTriangle, Dot } from "lucide-react";
import React from "react";

const ModalPage1 = ({
  form,
  onSubmit,
  watchedFieldCommunityName,
  watchedFieldCommunityDescription,
}) => {
  return (
    <div>
      <DialogHeader className="ml-4 mt-4">
        <DialogTitle className="font-bold text-2xl">
          Tell us about your community
        </DialogTitle>
        <DialogDescription className="text-black">
          a name and description help people understand what your community is
          all about.
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-4 ml-7">
        {/* form  */}
        <div className="col-span-2  mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-semibold text-neutral-700"
                          >
                            Community name
                          </label>
                          <Input
                            className="bg-neutral-100 rounded-2xl dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-100 placeholder:text-xs resize-none py-3"
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage className="text-[12px] ml-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <label
                            htmlFor="description"
                            className="text-sm font-semibold text-neutral-700"
                          >
                            Description
                          </label>
                          <Textarea
                            id="auto-resize-textarea"
                            className="h-44 rounded-2xl border border-neutral-200 bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-100 placeholder:text-xs resize-none py-3"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-[12px] ml-2" />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <div className="mt-8 mx-10 col-span-2">
          <div className="bg-neutral-100 rounded-2xl border border-neutral-200">
            <div className="py-4 px-4">
              <h3 className="font-semibold text-xl">
                {watchedFieldCommunityName
                  ? "c/" + watchedFieldCommunityName
                  : "Community name"}
              </h3>
              <div className="flex items-center text-xs font-medium">
                <span>1 member</span>
                <Dot />
                <span>1 online</span>
              </div>
              <p className="text-xs font-semibold text-neutral-600 mt-1">
                {watchedFieldCommunityDescription
                  ? watchedFieldCommunityDescription
                  : "Community description"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPage1;
