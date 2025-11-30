import { db } from "@/lib/db";
import { z } from "zod";
import { unstable_cache } from "next/cache";

// Define the select statement for related models to prevent over-fetching
const AUTHOR_SELECT = {
  id: true,
  name: true,
  image: true,
  // Only include other fields if they are strictly necessary for the UI
};
const COUNT_SELECT = { select: { id: true } }; // For comments
const VOTE_SELECT = { select: { userId: true, type: true } };

// Define the Zod schema and transform values to numbers/strings
const queryParamsSchema = z.object({
  limit: z
    .string()
    .transform((v) => parseInt(v))
    .pipe(z.number().min(1)),
  page: z
    .string()
    .transform((v) => parseInt(v))
    .pipe(z.number().min(1)),
  userId: z.string().min(1),
});

/**
 * Caches the results of the two concurrent Prisma queries based on user, limit, and page.
 */
const getPostsByUserIdCached = unstable_cache(
  async (userId, limit, skip) => {
    // Execute both queries concurrently to reduce total latency
    const [userPosts, shortVideos] = await Promise.all([
      // 1. User Posts Query (Blog)
      db.blog.findMany({
        take: limit,
        skip: skip,
        where: { authorId: userId },
        include: {
          author: { select: AUTHOR_SELECT },
          comments: COUNT_SELECT,
          votes: VOTE_SELECT,
        },
        orderBy: { createdAt: "desc" },
      }),

      // 2. Short Videos Query (ShortsV)
      db.shortsv.findMany({
        take: limit,
        skip: skip,
        where: { authorId: userId },
        include: {
          author: { select: AUTHOR_SELECT },
          comments: COUNT_SELECT,
          shortsVotes: VOTE_SELECT, // Assuming shortsVotes is used similarly to votes
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const mergeData = [...userPosts, ...shortVideos];

    // Optimize sorting by converting dates to numbers once, then sorting
    const sortedData = mergeData.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sortedData;
  },
  ["user-feed-data"], // Base Cache Key
  {
    revalidate: 300, // Cache for 5 minutes (300 seconds)
    // IMPORTANT: Use tags for on-demand revalidation when the user creates a new post
    tags: ["user-posts"],
  }
);

export async function GET(req) {
  const url = new URL(req.url);

  try {
    // 3. Validation and Transformation
    const { limit, page, userId } = queryParamsSchema.parse({
      limit: url.searchParams.get("limit"),
      page: url.searchParams.get("page"),
      userId: url.searchParams.get("userId"),
    });

    const skip = (page - 1) * limit;

    // 4. Call the cached function
    const sortedData = await getPostsByUserIdCached(userId, limit, skip);

    return new Response(JSON.stringify(sortedData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error); // Use console.error for actual errors

    if (error instanceof z.ZodError) {
      return new Response(
        "Invalid request data passed: limit, page, and userId are required.",
        { status: 422 }
      );
    }

    return new Response("Could not fetch more posts", {
      status: 500,
    });
  }
}
