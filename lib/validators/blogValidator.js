import { z } from "zod";

export const BlogValidator = z.object({
  description: z.string(),
  images: z.array().optional().nullable(),
});
