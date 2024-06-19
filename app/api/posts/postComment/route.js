import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { commentValidator } from "@/lib/validators/commentValidator";
import { z } from "zod";

export async function PATCH(req) {
  try {
    const body = await req.json();

    const { postId, shortsvId, text, replyToId, commentId, commentImageUrl } =
      commentValidator.parse(body);

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (text.length === 0) {
      // if user commented an image without text
      if (commentImageUrl) {
        await db.comment.create({
          data: {
            text,
            postId,
            shortsvId,
            authorId: session.user.id,
            replyToId,
            commentId,
            commentImageUrl,
          },
        });

        return new Response("OK", { status: 200 });
      } else {
        return new Response("Invalid request data passed", { status: 422 });
      }
    }

    await db.comment.create({
      data: {
        text,
        postId,
        shortsvId,
        authorId: session.user.id,
        replyToId,
        commentId,
        commentImageUrl,
      },
    });

    return new Response("OK", { status: 200 });
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
