import NewPasswordForm from "@/components/auth/NewPasswordForm";
import React, { Suspense } from "react";

export const metadata = {
  title: `Estorya | New Password`,
  description: "All in one social media app",
};

const LoadingFallback = () => {
  return (
    <div className="w-full h-screen bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
  );
};

const newPassword = () => {
  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <NewPasswordForm />
      </Suspense>
    </div>
  );
};

export default newPassword;
