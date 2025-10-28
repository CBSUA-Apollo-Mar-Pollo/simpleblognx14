import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const {
      workplace,
      highschool,
      college,
      hometown,
      currentcity,
      relationstatus,
    } = body;

    const isAboutInfoExisted = await db.profileAboutInfo.findFirst({
      where: {
        userId: session?.user.id,
      },
    });

    const isAboutInfoVisibilityExisted =
      await db.profileAboutInfoVisibility.findFirst({
        where: {
          profileAboutInfoId: isAboutInfoExisted.id,
        },
      });

    if (!isAboutInfoVisibilityExisted && isAboutInfoExisted) {
      await db.profileAboutInfoVisibility.create({
        data: {
          workplace,
          highschool,
          college,
          hometown,
          currentcity,
          relationstatus,
          profileAboutInfoId: isAboutInfoExisted.id,
        },
      });
      return new Response("OK", { status: 200 });
    }

    await db.profileAboutInfoVisibility.update({
      where: {
        id: isAboutInfoVisibilityExisted.id,
        profileAboutInfoId: isAboutInfoExisted.id,
      },
      data: {
        workplace,
        highschool,
        college,
        hometown,
        currentcity,
        relationstatus,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      "Could not add your phone number please try again later.",
      { status: 500 }
    );
  }
}
