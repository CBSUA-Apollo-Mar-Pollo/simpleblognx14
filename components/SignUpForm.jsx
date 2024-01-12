"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signUpFormValidator } from "@/lib/validators/signUpForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "@/components/ui/PasswordInput";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpFormValidator),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: SignUp, isLoading } = useMutation({
    mutationFn: async ({ name, email, password }) => {
      const payload = { name, email, password };

      const { data } = await axios.post("/api/signUp", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        // if email already use
        if (err.response?.status === 409) {
          return toast({
            title: "Email is already taken",
            description: "Please choose a different email.",
            variant: "destructive",
          });
        }
      }
      if (err.response?.status === 422) {
        return toast({
          title: "Error",
          description: "Invalid request data passed",
          variant: "destructive",
        });
      }

      return toast({
        title: "There was an error",
        description:
          "Couldn't register your credentials, please try again later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "Success! Your account has been created.",
        variant: "success",
      });
      router.push("/sign-in");
    },
  });
  return (
    <div className="h-full w-screen grid grid-cols-2 items-center justify-center gap-20">
      <div className="bg-gray-900 h-full">
        <div className="absolute top-6 left-7">
          <Link href="/" className="text-4xl font-bold text-white ">
            EStoryaMo
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
      {/* sign up form */}
      <div className="container mx-auto flex flex-col items-center py-14 gap-5">
        <h1 className="text-3xl font-bold text-slate-800">Sign Up</h1>
        <form
          className="my-2 w-96 space-y-5"
          onSubmit={handleSubmit((e) => {
            SignUp(e);
          })}
        >
          <Input
            type="text"
            placeholder="Name"
            className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
            {...register("name")}
          />
          {errors?.name && (
            <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
          )}
          <Input
            type="email"
            placeholder="Email"
            className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
            {...register("email")}
          />
          {errors?.email && (
            <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
          )}
          <PasswordInput
            type="password"
            placeholder="Password"
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
            placeholder="Confirm Password"
            className="focus-visible:ring-transparent border border-gray-300 focus:border-gray-400 focus:border-2 py-5"
            {...register("confirmPassword")}
          />
          {errors?.password?.confirmPassword && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.confirmPassword.message}
            </p>
          )}
          {/* {errors && <p>{errors}</p>} */}
          <Button isLoading={isLoading} className="w-full rounded-full py-5">
            Submit
          </Button>
        </form>
        <Link className="text-sm mt-3 text-right" href="/sign-in">
          Already have an account? <span className="underline">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
