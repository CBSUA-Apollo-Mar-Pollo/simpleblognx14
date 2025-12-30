import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function POST(req) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { imageUrl } = body;

  if (!imageUrl) {
    return new Response("Invalid payload", { status: 400 });
  }

  try {
    await db.userProfile.update({
      where: {
        id: session?.user.id,
      },
      data: {
        image: imageUrl.url,
      },
    });

    await db.post.create({
      data: {
        image: imageUrl,
        userStatus: "updated his profile picture",
        authorId: session?.user.id,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log(error);

    await utapi.deleteFiles(imageUrl.key);

    return new Response("Could not update your account", { status: 500 });
  }
}
