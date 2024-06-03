import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import React from "react";

export const metadata = {
  title: `Estorya | Reset Password`,
  description: "All in one social media app",
};

const resetPassword = () => {
  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
};

export default resetPassword;
