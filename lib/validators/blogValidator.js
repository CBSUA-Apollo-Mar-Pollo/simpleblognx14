import { z } from "zod";

export const BlogValidator = z.object({
  description: z.string(),
  imageUrl: z.string().optional().nullable(),
});
