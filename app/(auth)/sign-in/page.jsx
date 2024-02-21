import { getAuthSession } from "@/lib/auth";
import SignInForm from "@/components/SignInForm";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="absolute inset-0">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
