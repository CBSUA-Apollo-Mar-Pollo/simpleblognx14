import NewPasswordForm from "@/components/auth/NewPasswordForm";
import React from "react";

export const metadata = {
  title: `Estorya | New Password`,
  description: "All in one social media app",
};

const newPassword = () => {
  return (
    <div>
      <NewPasswordForm />
    </div>
  );
};

export default newPassword;
