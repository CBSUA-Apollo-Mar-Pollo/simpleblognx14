import { db } from "@/lib/db";
import { signUpFormValidator } from "@/lib/validators/signUpForm";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/token";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, password } = signUpFormValidator.parse(body);

    const emailExist = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (emailExist) {
      return new Response("A user already using this email", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    return new Response({ success: "Confirmation email sent" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid r equest data passed", { status: 422 });
    }

    return new Response(
      "Couldn't register your credentials, please try again later",
      { status: 500 }
    );
  }
}
