import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BlogValidator } from "@/lib/validators/blogValidator";
import { z } from "zod";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { description, images } = body;

    let imageExist = images.length !== 0 ? images : null;

    await db.blog.create({
      data: {
        description,
        image: imageExist,
        authorId: session.user.id,
      },
    });

    // if (images) {
    //   await db.userPostedImages.create({
    //     data: {
    //       image: imageUrl,
    //       authorId: session.user.id,
    //     },
    //   });
    // }

    return new Response("OK");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create blog", { status: 500 });
  }
}
