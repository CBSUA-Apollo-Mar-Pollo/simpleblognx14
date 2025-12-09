import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function PATCH(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { images } = await req.json();

    console.log(images, "patch images");

    const { searchParams } = new URL(req.url);

    const postId = searchParams.get("postId");

    await db.post.update({
      where: {
        id: postId,
        authorId: session.user.id,
      },
      data: {
        image: images,
      },
    });

    return new Response("OK");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create blog", { status: 500 });
  }
}
