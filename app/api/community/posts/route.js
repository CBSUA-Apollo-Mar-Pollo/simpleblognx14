import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req) {
  const url = new URL(req.url);

  try {
    const { limit, page, communityId } = z
      .object({
        limit: z.string(),
        page: z.string(),
        communityId: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        communityId: url.searchParams.get("communityId"),
      });

    const blogs = await db.blog.findMany({
      where: {
        communityId: communityId,
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

    // const shortVideos = await db.shortsv.findMany({
    //   take: parseInt(limit),
    //   skip: (parseInt(page) - 1) * parseInt(limit),
    //   include: {
    //     author: true,
    //     comments: true,
    //     shortsVotes: true,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });

    // const mergeData = [...blogs, ...shortVideos];

    // const sortedData = mergeData.sort(
    //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    // );

    return new Response(JSON.stringify(blogs));
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
