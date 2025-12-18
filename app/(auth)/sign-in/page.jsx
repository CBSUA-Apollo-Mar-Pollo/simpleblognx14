import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: `Estorias | Sign in`,
};

const SignInPage = () => {
  return (
    <div className="absolute lg:inset-0 ">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
