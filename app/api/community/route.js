import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { name, description, banner, icon, topics, visibility, accessType } =
      body;

    const communityExists = await db.community.findFirst({
      where: {
        name,
      },
    });

    if (communityExists) {
      return new Response("Community already exists", { status: 409 });
    }

    const community = await db.community.create({
      data: {
        name,
        creatorId: session.user.id,
        banner: banner.url,
        description,
        icon: icon.url,
        topics,
        visibility,
        accessType,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        communityId: community.id,
      },
    });

    return new Response(community.id, { status: 200 });
  } catch (error) {
    console.log(error, "Error creating community");

    return new Response("Could not create community", { status: 500 });
  }
}
