import NewVerificationForm from "@/components/auth/NewVerificationForm";
import React, { Suspense } from "react";

export const metadata = {
  title: `Estorya | New Verification`,
  description: "All in one social media app",
};

const LoadingFallback = () => {
  return (
    <div className="w-full h-screen bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
  );
};

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;
