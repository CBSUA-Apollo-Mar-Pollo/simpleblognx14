import SignUpForm from "@/components/SignUpForm";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="absolute inset-0">
      <SignUpForm />
    </div>
  );
};

export default SignUp;
