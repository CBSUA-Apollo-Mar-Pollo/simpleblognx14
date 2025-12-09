import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req) {
  const url = new URL(req.url);

  try {
    const { limit, page, searchQuery } = z
      .object({
        limit: z.string(),
        page: z.string(),
        searchQuery: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        searchQuery: url.searchParams.get("searchQuery"),
      });

    const blogs = await db.post.findMany({
      where: {
        description: { contains: searchQuery },
      },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      include: {
        author: true,
        comments: true,
        votes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(blogs));
  } catch (error) {
    console.log(error, "/api/posts/searchPosts");
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not fetch more posts", {
      status: 500,
    });
  }
}
