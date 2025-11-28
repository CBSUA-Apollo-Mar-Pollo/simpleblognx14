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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
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
const RelationshipStatusForm = ({
  refetch,
  setToggleRelationStatusForm,
  userAboutInfo,
}) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(RelationShipStatusFormSchema),
    defaultValues: {
      status: "Status",
    },
  });

  const status = form.watch("status");

  const isStatusSelected = status !== "Status";

  const { mutate: onSubmit, isPending } = useMutation({
    mutationFn: async (data) => {
      const { res } = await axios.post(
        "/api/userProf/about/relationstatus",
        data
      );
      return res;
    },
    onError: (err) => {
      return toast({
        title: "There was an error",
        description: "Couldn't not add relation status, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      refetch();
      setToggleRelationStatusForm(false);
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={
                  userAboutInfo?.relationstatus
                    ? userAboutInfo?.relationstatus
                    : "Status"
                }
              >
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
                    It&apos;s complicated
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
              disabled={isPending || !isStatusSelected}
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

export default RelationshipStatusForm;
