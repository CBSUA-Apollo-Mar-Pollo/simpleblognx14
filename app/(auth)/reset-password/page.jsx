import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import React, { Suspense } from "react";

export const metadata = {
  title: `Estorya | Reset Password`,
  description: "All in one social media app",
};

const LoadingFallback = () => {
  return (
    <div className="w-full h-screen bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
  );
};

const resetPassword = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default resetPassword;
