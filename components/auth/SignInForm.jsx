"use client";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { signInFormValidator } from "@/lib/validators/signInForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { AlertTriangle, Loader2 } from "lucide-react";
import { loginCheck } from "@/actions/login";
import { CredentialOnboardedCheck } from "@/actions/credential-onboarded-check";

const SignInForm = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const urlError = searchParams.get("error") === "OAuthAccountNotLinked";

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

  // login credentials
  const loginInCredential = async (data) => {
    setIsLoading(true);
    const { email, password } = data;
    // check if email has been verified
    loginCheck(email)
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
          case "Email does not exist":
            setIsLoading(false);
            return toast({
              title: "Invalid log in",
              description: "Email does not exist",
              variant: "destructive",
            });
          default:
            setIsLoading(false);
            return toast({
              title: "Something went wrong",
              variant: "destructive",
            });
        }
      });

    CredentialOnboardedCheck(email)
      .then((res) => {
        console.log(res.success);
      })
      .catch((e) => {
        switch (e.message) {
          case "Email does not exist":
            setIsLoading(false);
            return toast({
              title: "Invalid log in",
              description: "Email does not exist",
              variant: "destructive",
            });
          case "User is not onboarded yet":
            setIsLoading(false);
            router.push("/onboarding");
            break;
          default:
            setIsLoading(false);
            return toast({
              title: "Something went wrong",
              variant: "destructive",
            });
        }
        setIsLoading(false);
      });
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error === "AccessDenied") {
        return toast({
          title: "Access Denied",
          description: "Your email is not verified yet",
          variant: "destructive",
        });
      }

      if (res.error) {
        return toast({
          title: "Invalid credentials",
          description: "The email or password is incorrect",
          variant: "destructive",
        });
      }

      setIsLoading(false);
      window.location.replace("/");
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:h-full items-center justify-center gap-20">
      <div className="bg-gray-900 h-full lg:block hidden ">
        <div className="absolute top-6 left-7">
          <Link href="/" className="text-4xl font-bold text-white">
            Estorias
          </Link>
        </div>
        <div className="flex items-center h-full px-24">
          <h3 className="text-justify text-white leading-loose  text-lg">
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            orci sit amet justo aliquam hendrerit ac eget nibh. Curabitur dolor
            mi, dignissim non est in.”
          </h3>
        </div>
      </div>
      {/* sign in form */}
      <div className=" lg:mx-auto flex flex-col items-center lg:py-14 py-2 gap-5 lg:w-full w-screen px-7 mt-12">
        <h1 className="text-3xl font-bold text-slate-800">Sign in</h1>
        <form
          className="my-1 md:w-96 w-full space-y-4"
          onSubmit={handleSubmit((e) => {
            loginInCredential(e);
          })}
        >
          <Input
            type="email"
            placeholder="Email"
            className="lg:h-[5vh] h-[6vh] focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5 dark:bg-white dark:text-neutral-800"
            {...register("email")}
          />
          <div className="">
            <PasswordInput
              type="password"
              placeholder="Password"
              className="lg:h-[5vh] h-[6vh] focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5 dark:bg-white dark:text-neutral-800"
              {...register("password")}
            />
          </div>

          {urlError && (
            <p className="text-xs text-red-700 bg-red-200 py-3 px-4 rounded flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" /> Email already in use
              with different provider
            </p>
          )}

          <Button
            disabled={isLoading}
            className="w-full rounded-full mt-1 flex items-center gap-x-2 cursor-pointer"
          >
            {isLoading ? (
              <span>
                <Loader2 className="h-5 w-5 text-neutral-100 animate-spin my-4" />
              </span>
            ) : (
              <span>Sign In with email</span>
            )}
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
        <Link className="text-sm mt-3 text-right" href="/reset-password">
          Forgot your{" "}
          <span className="text-blue-500 hover:underline">Password ?</span>
        </Link>
        <Link className="text-sm mt-3 text-right" href="/sign-up">
          Dont have an account yet? <span className="underline">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
