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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { Icons } from "@/components/utils/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RelationShipStatusFormSchema = z.object({
  status: z.enum(
    [
      "Single",
      "In a relationship",
      "Engaged",
      "In a civil union",
      "In domestic relationship",
      "In an open relationship",
      "Its complicated",
      "Separated",
      "Divorced",
      "Widowed",
    ],
    {
      required_error: "Please select status",
    }
  ),
});
const RelationshipStatusForm = ({ setToggleRelationStatusForm }) => {
  const form = useForm({
    resolver: zodResolver(RelationShipStatusFormSchema),
    defaultValues: {
      status: "Status",
    },
  });

  const onSubmit = () => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue="Status">
                <FormControl>
                  <SelectTrigger className="focus:ring-0 bg-neutral-200 font-semibold  flex gap-x-2">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Status">Status</SelectItem>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="In a relationship">
                    In a relationship
                  </SelectItem>
                  <SelectItem value="Engaged">Engaged</SelectItem>
                  <SelectItem value="In a civil union">
                    In a civil union
                  </SelectItem>
                  <SelectItem value="In domestic relationship">
                    In domestic relationship
                  </SelectItem>
                  <SelectItem value="In an open relationship">
                    In an open relationship
                  </SelectItem>
                  <SelectItem value="Its complicated">
                    It's complicated
                  </SelectItem>
                  <SelectItem value="Separated">Separated</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-neutral-900">
                Changes will not appear in feed.
              </FormDescription>
              <FormMessage />
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
              onClick={() => setToggleRelationStatusForm(false)}
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

export default RelationshipStatusForm;
