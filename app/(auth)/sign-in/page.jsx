import SignInForm from "@/components/auth/SignInForm";
import { Suspense } from "react";

export const metadata = {
  title: `Estorias | Sign in`,
};

const SignInPage = () => {
  return (
    <div className="absolute lg:inset-0 ">
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </div>
  );
};

export default SignInPage;
