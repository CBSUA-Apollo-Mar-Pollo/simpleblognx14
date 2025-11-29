import SignInForm from "@/components/auth/SignInForm";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function AuthCheck() {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/");
  }

  return null;
}

const SignInPage = () => {
  return (
    <Suspense fallback={null}>
      <AuthCheck />
      <div className="absolute lg:inset-0 ">
        <SignInForm />
      </div>
    </Suspense>
  );
};

export default SignInPage;
