"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const CredentialOnboardedCheck = async (email) => {
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    throw new Error("Email does not exist");
  }

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user.onboarded) {
    throw new Error("User is not onboarded yet");
  }

  return { success: "User is onboarded" };
};
