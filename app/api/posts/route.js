import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { unstable_cache, revalidateTag } from "next/cache"; // Import unstable_cache

const queryParamsSchema = z.object({
  limit: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(1)),
  page: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().min(1)),
});

const getFeedData = unstable_cache(
  async (limit, skip) => {
    // Execute both queries concurrently to reduce total latency
    const [blogs, shortVideos] = await Promise.all([
      // 1. Blog Posts Query
      db.post.findMany({
        take: limit,
        skip: skip,
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
          community: {
            select: {
              id: true,
              members: { select: { userId: true } },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),

      // 2. Short Videos Query
      db.shortsv.findMany({
        take: limit,
        skip: skip,
        include: {
          author: { select: { id: true, name: true, image: true } },
          comments: { select: { id: true } },
          shortsvVotes: { select: { userId: true, type: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // Data processing logic
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

    // Sorting the merged data
    const sortedData = mergeData.sort((a, b) => b.createdAtMs - a.createdAtMs);

    return sortedData;
  },
  ["mixed-feed"],
  {
    revalidate: 60,
    tags: ["homepage-feed"],
  }
);

export async function GET(req) {
  const url = new URL(req.url);

  const session = await getAuthSession();

  try {
    const { limit, page } = queryParamsSchema.parse({
      limit: url.searchParams.get("limit"),
      page: url.searchParams.get("page"),
    });

    const skip = (page - 1) * limit;

    const sortedData = await getFeedData(limit, skip);

    return new Response(JSON.stringify(sortedData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return new Response(
        "Invalid request data passed: limit/page must be numbers",
        { status: 422 }
      );
    }

    return new Response("Could not fetch more posts", {
      status: 500,
    });
  }
}
