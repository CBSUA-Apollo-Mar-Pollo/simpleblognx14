"use server";

import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";

export const loginCheck = async (values) => {
  const existingUser = await getUserByEmail(values);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    return { sucess: "Confirmation email sent!" };
  }
};
