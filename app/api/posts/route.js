import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req) {
  const url = new URL(req.url);

  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    const blogs = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            handleName: true,
            bio: true,
            birthdate: true,
          },
        },
        comments: { select: { id: true } },
        votes: { select: { userId: true, type: true } },
        community: { include: { members: { select: { userId: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    const shortVideos = await db.shortsv.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      include: {
        author: {
          select: {
            id: true,
            name: true,
            handleName: true,
            image: true,
            bio: true,
            birthdate: true,
          },
        },
        comments: { select: { id: true } },
        shortsvVotes: { select: { userId: true, type: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const updatedShortVideos = shortVideos.map((item) => ({
      ...item,
      isShortsV: true,
      createdAtMs: new Date(item.createdAt).getTime(),
    }));

    const normalizedBlogs = blogs.map((blog) => ({
      ...blog,
      createdAtMs: new Date(blog.createdAt).getTime(),
    }));

    const mergeData = [...normalizedBlogs, ...updatedShortVideos];

    const sortedData = mergeData.sort((a, b) => b.createdAtMs - a.createdAtMs);

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
