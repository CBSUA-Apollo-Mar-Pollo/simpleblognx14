import { getMonthNumber } from "@/data/getMonthNumber";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

async function formatDateString(year, month, day) {
  const monthNumber = getMonthNumber(month);
  return `${year}-${monthNumber}-${day} 12:00:00`;
}

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { year, month, day } = await req.json();

    const dateString = await formatDateString(year, month, day);
    const dateTime = new Date(dateString);

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        birthdate: dateTime,
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error updating user account:", error);
    return new Response("Could not update your account", { status: 500 });
  }
}
