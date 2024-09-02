import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { data } = body;

    const session = await getAuthSession();

    const searchData = await db.user.findMany({
      where: {
        OR: [{ name: { contains: data } }, { handleName: { contains: data } }],
      },
    });

    return new Response(JSON.stringify(searchData));
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
}
