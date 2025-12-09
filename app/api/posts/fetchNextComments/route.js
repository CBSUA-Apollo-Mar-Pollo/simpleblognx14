import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req) {
  const url = new URL(req.url);

  try {
    const { limit, page, postId, imageIndex } = z
      .object({
        limit: z.string(),
        page: z.string(),
        postId: z.string(),
        imageIndex: z.string().optional().nullable(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        postId: url.searchParams.get("postId"),
        imageIndex: url.searchParams.get("imageIndex"),
      });

    let comments = [];

    const post = await db.post.findFirst({
      where: {
        id: postId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // if the post image is 1 bring back the comment from that is indexed
    if (post?.image?.length === 1) {
      comments = await db.comment.findMany({
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        where: {
          postId: postId,
          replyToId: null,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          createdAt: true,
          commentImageUrl: true,
          replyToId: true,
          author: {
            select: { id: true, name: true, image: true, handleName: true },
          },
          replies: {
            take: 3,
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              text: true,
              createdAt: true,
              commentImageUrl: true,
              author: {
                select: { id: true, name: true, image: true, handleName: true },
              },
              replyToId: true,
            },
          },
        },
      });
      return new Response(JSON.stringify(comments));
    }

    if (imageIndex !== undefined && imageIndex !== null && imageIndex !== "") {
      comments = await db.comment.findMany({
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        where: {
          postId: postId,
          replyToId: null,
          index: imageIndex,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          createdAt: true,
          commentImageUrl: true,
          replyToId: true,
          author: {
            select: { id: true, name: true, image: true, handleName: true },
          },
          replies: {
            take: 3,
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              text: true,
              createdAt: true,
              commentImageUrl: true,
              author: {
                select: { id: true, name: true, image: true, handleName: true },
              },
              replyToId: true,
            },
          },
        },
      });
      return new Response(JSON.stringify(comments));
    }

    comments = await db.comment.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      where: {
        postId: postId,
        replyToId: null,
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        text: true,
        createdAt: true,
        commentImageUrl: true,
        replyToId: true,
        author: {
          select: { id: true, name: true, image: true, handleName: true },
        },
        replies: {
          take: 3,
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            text: true,
            createdAt: true,
            commentImageUrl: true,
            author: {
              select: { id: true, name: true, image: true, handleName: true },
            },
            replyToId: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(comments));
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
