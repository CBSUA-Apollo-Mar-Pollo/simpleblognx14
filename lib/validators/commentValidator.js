import { z } from "zod";

export const commentValidator = z.object({
  postId: z.string(),
  text: z.string().refine((value) => value.trim().length > 0, {
    message: "Text cannot be empty",
  }),
  replyToId: z.string().optional(),
  commentId: z.string().optional(),
});
