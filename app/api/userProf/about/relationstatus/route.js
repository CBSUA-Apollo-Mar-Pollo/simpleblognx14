import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { status } = body;

    const isAboutInfoExisted = await db.profileAboutInfo.findFirst({
      where: {
        userId: session?.user.id,
      },
    });

    console.log(isAboutInfoExisted);

    if (!isAboutInfoExisted) {
      await db.profileAboutInfo.create({
        data: {
          relationstatus: status,
          userId: session.user.id,
        },
      });
      return new Response("OK", { status: 200 });
    }

    await db.profileAboutInfo.update({
      where: {
        id: isAboutInfoExisted.id,
        userId: session.user.id,
      },
      data: {
        relationstatus: status,
        userId: session.user.id,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      "Could not add relation status please try again later.",
      { status: 500 }
    );
  }
}
