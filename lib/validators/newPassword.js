import { z } from "zod";

export const NewPasswordFormValidator = z
  .object({
    password: z.string().min(6, {
      message: "Minimum of 6 characters is required",
    }),
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
