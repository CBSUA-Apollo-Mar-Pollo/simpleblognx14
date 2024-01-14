import { z } from "zod";

export const resetPasswordFormValidator = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
