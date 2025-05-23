import { getAuthSession } from "@/lib/auth";
import SignInForm from "@/components/auth/SignInForm";
import { redirect } from "next/navigation";

export const metadata = {
  title: `Estorya | Sign in`,
  description: "All in one social media app",
};

const SignInPage = async () => {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="absolute lg:inset-0 ">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
