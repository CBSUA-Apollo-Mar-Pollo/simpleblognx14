import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const { userId, request } = body;

    console.log(userId, request);

    const session = await getAuthSession();

    const requestExist = await db.friend.findFirst({
      where: {
        userId: userId,
      },
    });

    if (requestExist && requestExist.id !== session.user.id) {
      await db.friend.update({
        where: {
          id: requestExist.id,
        },
        data: {
          isRequestAccepted: request,
        },
      });

      return new Response("Success");
    }

    if (requestExist.userId === session.user.id) {
      await db.friend.update({
        where: {
          id: requestExist.id,
        },
        data: {
          isRequestAccepted: request,
        },
      });
    }

    await db.friend.create({
      data: {
        userId: userId,
        requesterUserId: session.user.id,
        isRequestAccepted: request,
      },
    });

    await db.friendRequestNotification.create({
      data: {
        userId: userId,
        requesterUserId: session.user.id,
      },
    });

    return new Response("Success");
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
