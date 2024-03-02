import { z } from "zod";

export const commentValidator = z.object({
  postId: z.string(),
  text: z.string().refine((value) => value.trim().length > 0, {
    message: "Text cannot be empty",
  }),
  shortsvId: z.string().optional(),
  commentImageUrl: z.string().optional(),
  replyToId: z.string().optional(),
  commentId: z.string().optional(),
});
