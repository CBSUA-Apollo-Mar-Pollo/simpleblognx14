import NewVerificationForm from "@/components/auth/NewVerificationForm";
import React from "react";

export const metadata = {
  title: `Estorya | New Verification`,
  description: "All in one social media app",
};

const NewVerificationPage = () => {
  return (
    <div>
      <NewVerificationForm />
    </div>
  );
};

export default NewVerificationPage;
