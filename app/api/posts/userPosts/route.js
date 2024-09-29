import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req) {
  const url = new URL(req.url);

  try {
    const { limit, page, userId } = z
      .object({
        limit: z.string(),
        page: z.string(),
        userId: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        userId: url.searchParams.get("userId"),
      });

    const userPosts = await db.blog.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      where: {
        authorId: userId,
      },
      include: {
        author: true,
        comments: true,
        votes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const shortVideos = await db.shortsv.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      where: {
        authorId: userId,
      },
      include: {
        author: true,
        comments: true,
        shortsVotes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const mergeData = [...userPosts, ...shortVideos];

    const sortedData = mergeData.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return new Response(JSON.stringify(sortedData));
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not fetch more posts", {
      status: 500,
    });
  }
}
