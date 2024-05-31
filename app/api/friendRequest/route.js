import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const session = await getAuthSession();

    await db.friend.create({
      data: {
        userId: body.userId,
        requesterUserId: session.user.id,
        isRequestAccepted: false,
      },
    });

    return new Response("Success");
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
