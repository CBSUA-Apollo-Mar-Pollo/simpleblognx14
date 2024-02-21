import { COMMENT_PAGE } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { commentValidator } from "@/lib/validators/commentValidator";
import { z } from "zod";

export async function POST(req) {
  try {
    const body = await req.json();

    const comments = await db.comment.findMany({
      where: {
        postId: body.postId,
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
      take: COMMENT_PAGE,
    });

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not create comment, please try again later", {
      status: 500,
    });
  }
}
