import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, date } = body;

    if (date === undefined) {
      return new Response("birth date undefined", { status: 406 });
    }

    await db.user.update({
      where: { id: session.user.id },
      data: {
        name: name,
        birthdate: date,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Could not update your account", { status: 500 });
  }
}
