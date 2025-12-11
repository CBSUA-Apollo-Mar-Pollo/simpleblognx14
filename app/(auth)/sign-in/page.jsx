import SignInForm from "@/components/auth/SignInForm";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const SignInPage = () => {
  return (
    <div className="absolute lg:inset-0 ">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
