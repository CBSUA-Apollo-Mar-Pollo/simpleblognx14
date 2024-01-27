"use server";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

export const loginCheck = async (email) => {
  const existingUser = await getUserByEmail(email);

  // check if the user doesnt exist
  if (!existingUser || !existingUser.email || !existingUser.password) {
    throw new Error("Email does not exist");
  }

  // generate a verification token
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }
};
