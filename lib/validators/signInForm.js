import { z } from "zod";

export const signInFormValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});
