import SignUpForm from "@/components/auth/SignUpForm";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: `Estorya | Sign up`,
  description: "All in one social media app",
};

const SignUp = async () => {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="absolute lg:inset-0">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
