"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import Link from "next/link";
import React, { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Dot } from "lucide-react";
import { resetPasswordFormValidator } from "@/lib/validators/resetPasswordForm";
import { reset } from "@/actions/reset";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // credentials sign in
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(resetPasswordFormValidator),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    reset(values)
      .then((res) => {
        if (res?.success) {
          return toast({
            title: "Action Required",
            description: "Email confirmation sent ",
            variant: "success",
          });
        }
      })
      .catch((e) => {
        switch (e.message) {
          case "Invalid Email!":
            return toast({
              title: "Error",
              description: "Invalid Email!",
              variant: "destructive",
            });
          case "Email not found!":
            return toast({
              title: "Error",
              description: "Email not found!",
              variant: "destructive",
            });
          default:
            return toast({
              title: "Something went wrong",
              variant: "destructive",
            });
        }
      });
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:h-screen items-center justify-center gap-20">
      <div className="bg-gray-900 h-full lg:block hidden">
        <div className="absolute top-6 left-7">
          <Link href="/" className="text-4xl font-bold text-white">
            EStoryaMo
          </Link>
        </div>
        <div className="flex items-center h-full px-24">
          <h3 className="text-justify text-white leading-loose  text-lg">
            “Sed aliquam consequat lobortis. Pellentesque euismod arcu ac
            molestie tincidunt.”
          </h3>
        </div>
      </div>
      {/* sign in form */}
      <div className=" lg:mx-auto flex flex-col items-center lg:py-14 py-2 gap-5 lg:w-full w-screen px-7 mt-12">
        <h1 className="text-3xl font-bold text-slate-800">Reset password</h1>
        <form
          className="my-1 md:w-96 w-full space-y-4"
          onSubmit={handleSubmit((e) => {
            onSubmit(e);
          })}
        >
          <span className="text-xs">
            Enter your email so that we can send a reset password token.
          </span>
          <Input
            type="email"
            placeholder="Email"
            className="lg:h-[5vh] h-[6vh] focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
            {...register("email")}
          />

          <Button className="w-full rounded-full mt-1">Submit</Button>
        </form>

        <div className="text-sm mt-3 text-right flex">
          <Link
            className="text-blue-500 hover:underline font-semibold"
            href="/sign-in"
          >
            Sign in
          </Link>
          <Dot />
          <Link
            className="text-blue-500 hover:underline font-semibold"
            href="/sign-up"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
