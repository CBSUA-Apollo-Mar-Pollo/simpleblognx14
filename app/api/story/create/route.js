import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { image, authorId } = await req.json();

    await db.story.create({
      data: {
        image,
        authorId,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Could not create story", { status: 500 });
  }
}
