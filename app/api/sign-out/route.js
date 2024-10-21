import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    await db.user.update({
      where: {
        id: body.id,
      },
      data: {
        onlineStatus: false,
      },
    });

    return new Response("OK");
  } catch (error) {
    console.log(error);

    return new Response({ status: 500 });
  }
}
