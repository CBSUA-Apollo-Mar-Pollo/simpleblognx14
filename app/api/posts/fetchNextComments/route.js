import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req) {
  const url = new URL(req.url);

  try {
    const { limit, page, postId } = z
      .object({
        limit: z.string(),
        page: z.string(),
        postId: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        postId: url.searchParams.get("postId"),
      });

    const comments = await db.comment.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      where: {
        postId: postId,
        replyToId: null,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(comments));
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not fetch more posts", {
      status: 500,
    });
  }
}
