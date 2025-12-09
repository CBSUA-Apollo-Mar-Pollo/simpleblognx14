import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const { userId, request } = body;

    const session = await getAuthSession();

    const requestExist = await db.friendList.findFirst({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        requesterUser: true,
      },
    });

    // if the user is not the requester
    if (requestExist && requestExist?.userId !== session.user.id) {
      await db.friendList.update({
        where: {
          id: requestExist.id,
        },
        data: {
          isRequestAccepted: request,
        },
      });

      return new Response("Success");
    }

    // if the user is the one being requested
    if (requestExist && requestExist?.userId === session.user.id) {
      await db.friendList.update({
        where: {
          id: requestExist.id,
        },
        data: {
          isRequestAccepted: request,
        },
      });

      const getFriendRequestNotificationData =
        await db.friendRequestNotification.findFirst({
          where: {
            userId: session.user.id,
          },
        });

      await db.friendRequestNotification.delete({
        where: {
          id: getFriendRequestNotificationData.id,
        },
      });

      await db.notification.create({
        data: {
          text: `${requestExist.user.name} has accepted your friend request`,
          userId: requestExist.requesterUserId,
        },
      });

      return new Response("Success");
    }

    await db.friendList.create({
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
