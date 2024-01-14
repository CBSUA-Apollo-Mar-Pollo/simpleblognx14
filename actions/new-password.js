"use server";

import bcrypt from "bcryptjs";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordFormValidator } from "@/lib/validators/newPassword";
import { db } from "@/lib/db";

export const newPassword = async (values, token) => {
  if (!token) {
    throw new Error("Missing token!");
  }

  const validatedFields = NewPasswordFormValidator.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid fields!");
  }

  const { password } = validatedFields.data;

  //   check if there is a existing token
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    throw new Error("Invalid token!");
  }

  //   check if the token expired
  const hasExpired = new Date(existingToken.expired) < new Date();

  if (hasExpired) {
    throw new Error("Token has expired!");
  }

  // check the email in database
  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    throw new Error("Email does not exist!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  //   update the database
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};
