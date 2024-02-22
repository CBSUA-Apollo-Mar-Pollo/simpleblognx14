"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Dot } from "lucide-react";
import { NewPasswordFormValidator } from "@/lib/validators/newPassword";
import { PasswordInput } from "../ui/PasswordInput";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useToast();

  // credentials sign in
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NewPasswordFormValidator),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values) => {
    newPassword(values, token)
      .then((res) => {
        if (res?.success) {
          return toast({
            description: "Password has been updated!",
            variant: "success",
          });
        }
      })
      .catch((e) => {
        switch (e.message) {
          case "Missing token!":
            return toast({
              title: "Error",
              description: "Missing token!",
              variant: "destructive",
            });
          case "Invalid fields!":
            return toast({
              title: "Error",
              description: "Invalid fields!",
              variant: "destructive",
            });
          case "Invalid token!":
            return toast({
              title: "Error",
              description: "Invalid token!",
              variant: "destructive",
            });
          case "Token has expired!":
            return toast({
              title: "Error",
              description: "Token has expired!",
              variant: "destructive",
            });
          case "Email does not exist!":
            return toast({
              title: "Error",
              description: "Email does not exist!",
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
    <div className="h-screen w-screen grid grid-cols-2 items-center justify-center gap-20">
      <div className="bg-gray-900 h-full">
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
      <div className=" mx-auto  flex flex-col items-center py-14 gap-5">
        <h1 className="text-3xl font-bold text-slate-800">
          Enter a new password
        </h1>
        <form
          className="my-1 w-96 space-y-4"
          onSubmit={handleSubmit((e) => {
            onSubmit(e);
          })}
        >
          <PasswordInput
            type="password"
            placeholder="New Password"
            className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
            {...register("password")}
          />
          {errors?.password && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
          <PasswordInput
            type="password"
            placeholder="Confirm New Password"
            className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
            {...register("confirmPassword")}
          />
          {errors?.password?.confirmPassword && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.confirmPassword.message}
            </p>
          )}

          <Button className="w-full rounded-full mt-1">Reset Password</Button>
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

export default NewPasswordForm;
