"use client";

import { Button, buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { signInFormValidator } from "@/lib/validators/signInForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthError } from "next-auth";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // credentials sign in
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(signInFormValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // google sign in
  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "There was an error",
        description: "Error logging in with google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginInCredential = async (e) => {
    try {
      const { email, password } = e;
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (error) {
      // console.log(error);
      // if (error instanceof AuthError) {
      //   switch (error.type) {
      //     case "CredentialsSignin":
      //       return { error: "Invalid credentials!" };
      //     default:
      //       return { error: "Something went wrong" };
      //   }
      // }

      throw error;
    }
  };

  return (
    <div className="absolute inset-0">
      <div className="h-full w-screen grid grid-cols-2 items-center justify-center gap-20">
        <div className="bg-gray-900 h-full">
          <div className="absolute top-6 left-7">
            <Link href="/" className="text-4xl font-bold text-white">
              EStoryaMo
            </Link>
          </div>
          <div className="flex items-center h-full px-24">
            <h3 className="text-justify text-white leading-loose  text-lg">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              orci sit amet justo aliquam hendrerit ac eget nibh. Curabitur
              dolor mi, dignissim non est in.”
            </h3>
          </div>
        </div>
        {/* sign in form */}
        <div className=" mx-auto  flex flex-col items-center py-14 gap-5">
          <h1 className="text-3xl font-bold text-slate-800">Sign in</h1>
          <form
            className="my-1 w-96 space-y-4"
            onSubmit={handleSubmit((e) => {
              loginInCredential(e);
            })}
          >
            <Input
              type="email"
              placeholder="Email"
              className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
              {...register("email")}
            />
            <Input
              type="password"
              placeholder="Password"
              className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
              {...register("password")}
            />

            <Button className="w-full rounded-full mt-1">
              Sign In with Email
            </Button>
          </form>

          <div className=" flex flex-col gap-3 w-80">
            {/* hr */}
            <div className="text-center flex flex-row">
              <hr className="w-2/4 mx-auto my-3 border-b-1 border-slate-300" />
              <p className="inline-block px-4 bg-white relative z-10 text-slate-500">
                or
              </p>
              <hr className="w-2/4 mx-auto my-3 border-b-1 border-slate-300" />
            </div>

            <Button
              onClick={loginWithGoogle}
              isLoading={isLoading}
              variant="outline"
              className="rounded-full py-6"
            >
              <Image
                src="/google_logo.png"
                height={20}
                width={20}
                alt="google_logo"
              />
              <span className="px-4 text-sm font-medium text-slate-600">
                Sign in with Google
              </span>
            </Button>
          </div>
          <Link className="text-sm mt-3 text-right" href="/sign-up">
            Don't have an account yet?{" "}
            <span className="underline">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
