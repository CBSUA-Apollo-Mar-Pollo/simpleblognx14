import { z } from "zod";

export const PostVoteValidator = z.object({
  postId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});
export const ShortsvVoteValidator = z.object({
  shortsvId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});

export const CommentVoteValidator = z.object({
  commentId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});
