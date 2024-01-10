import { z } from "zod";

export const signUpFormValidator = z
  .object({
    name: z
      .string({
        invalid_type_error:
          "Please enter a valid string value. Ensure that your input contains only letters, numbers, or standard characters without spaces or special symbols.",
      })
      .min(3)
      .max(32)
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Name must not contain white spaces or special symbols.",
      }),
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Minimum of 6 is required" }),
    confirmPassword: z.string().min(6).optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword && confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Confirm password doesn't match",
        path: ["password", "confirmPassword"],
      });
    }
  });
