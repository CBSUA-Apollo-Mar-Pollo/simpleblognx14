import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { data } = body;

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("OK");
    }

    await db.searchHistory.create({
      data: {
        text: data,
        userId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("OK");
    }

    const data = await db.searchHistory.findMany({
      where: {
        userId: session?.user.id,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response("Cannot get search history", { status: 500 });
  }
}
