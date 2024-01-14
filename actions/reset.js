"use server";

import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import { resetPasswordFormValidator } from "@/lib/validators/resetPasswordForm";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

export const reset = async (values) => {
  const validatedFields = resetPasswordFormValidator.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid Email!");
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    throw new Error("Email not found!");
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent" };
};
