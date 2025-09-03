import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    const { pagename, pagecategory, pagebio } = body;

    await db.page.create({
      data: {
        name: pagename,
        category: pagecategory,
        bio: pagebio,
        userId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    console.log("Error page creation:", error);
  }
}
