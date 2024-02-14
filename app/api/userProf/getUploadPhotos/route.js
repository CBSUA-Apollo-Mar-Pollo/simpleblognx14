import { COMMENT_PAGE } from "@/config";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req) {
  try {
    const body = await req.json();

    const userPhotos = await db.userPostedImages.findMany({
      where: {
        authorId: body.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(userPhotos), { status: 200 });
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
