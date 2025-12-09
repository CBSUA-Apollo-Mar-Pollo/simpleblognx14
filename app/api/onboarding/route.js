import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();

    const { birthDate, username, topics } = body;

    const session = await getAuthSession();

    const topicsId = await db.interest.findMany({
      where: { name: { in: topics } },
    });

    // console.log(topicsId);

    const userCreateProfile = await db.userProfile.create({
      data: {
        name: session.user.name,
        handleName: username,
        image: session.user.image,
        birthdate: new Date(birthDate),
        userId: session.user.id,
      },
    });

    await db.user.update({
      where: { id: userCreateProfile.userId },
      data: {
        onboarded: true,
      },
    });

    await db.userInterest.createMany({
      data: topicsId.map((topic) => ({
        userId: userCreateProfile.id,
        interestId: topic.id,
      })),
    });

    console.log(userCreateProfile);

    return new Response("Onboarding completed successfully");
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
