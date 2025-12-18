import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { image } = body;

    await db.userProfile.update({
      where: {
        id: session?.user.id,
      },
      data: {
        backgroundImage: image[0].url,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Could not update your account", { status: 500 });
  }
}
