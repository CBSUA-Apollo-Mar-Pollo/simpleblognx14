import { z } from "zod";

export const BlogValidator = z.object({
  title: z.string(),
  description: z.string(),
});
