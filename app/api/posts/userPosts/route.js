import { db } from "@/lib/db";
import { z } from "zod";
import { unstable_cache } from "next/cache";

const AUTHOR_SELECT = {
  id: true,
  name: true,
  image: true,
};
const COUNT_SELECT = { select: { id: true } }; // For comments
const VOTE_SELECT = { select: { userId: true, type: true } };

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

const getPostsByUserIdCached = unstable_cache(
  async (userId, limit, skip) => {
    const [userPosts, shortVideos] = await Promise.all([
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

      db.shortsv.findMany({
        take: limit,
        skip: skip,
        where: { authorId: userId },
        include: {
          author: { select: AUTHOR_SELECT },
          comments: COUNT_SELECT,
          shortsVotes: VOTE_SELECT,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const mergeData = [...userPosts, ...shortVideos];

    const sortedData = mergeData.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sortedData;
  },
  ["user-feed-data"],
  {
    revalidate: 300,

    tags: ["user-posts"],
  }
);

export async function GET(req) {
  const url = new URL(req.url);

  try {
    const { limit, page, userId } = queryParamsSchema.parse({
      limit: url.searchParams.get("limit"),
      page: url.searchParams.get("page"),
      userId: url.searchParams.get("userId"),
    });

    const skip = (page - 1) * limit;

    const sortedData = await getPostsByUserIdCached(userId, limit, skip);

    return new Response(JSON.stringify(sortedData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

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
