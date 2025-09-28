import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { pagename, pagecategory, pagebio } = body;

    const page = await db.user.create({
      data: {
        name: pagename,
        category: pagecategory,
        bio: pagebio,
        ownerId: session.user.id,
        type: "page",
      },
    });

    return new Response(page.id, { status: 200 });
  } catch (error) {
    console.log("Error page creation:", error);

    return new Response("Error page creation:", error, {
      status: 500,
    });
  }
}
