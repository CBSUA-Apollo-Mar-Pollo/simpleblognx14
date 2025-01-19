import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BlogValidator } from "@/lib/validators/blogValidator";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { description, userStatus, images, videos, communityId } = body;

    if (!description.length && images.length === 0 && videos.length === 0) {
      return new NextResponse(
        "For you to create a post you need to put a description or upload an image or video",
        { status: 400 }
      );
    }

    if (
      description.length !== 0 &&
      images.length === 0 &&
      videos.length === 0
    ) {
      await db.blog.create({
        data: {
          description,
          authorId: session.user.id,
        },
      });

      return new Response("OK");
    }

    let imageExist = images.length !== 0 ? images : null;

    let post = null;

    if (images.length !== 0) {
      if (userStatus) {
        post = await db.blog.create({
          data: {
            description,
            image: imageExist[0],
            userStatus: userStatus,
            authorId: session.user.id,
          },
        });
      } else {
        post = await db.blog.create({
          data: {
            description,
            image: imageExist,
            userStatus: userStatus,
            authorId: session.user.id,
          },
        });
      }
    }

    if (videos.length !== 0) {
      post = await db.blog.create({
        data: {
          description,
          video: videos,
          userStatus: userStatus,
          authorId: session.user.id,
        },
      });
    }

    if (communityId) {
      await db.blog.update({
        where: {
          id: post.id,
        },
        data: {
          communityId,
        },
      });
    }

    await db.vote.create({
      data: {
        userId: session.user.id,
        postId: post.id,
        type: "UP",
      },
    });

    // if (images) {
    //   await db.userPostedImages.create({
    //     data: {
    //       image: imageUrl,
    //       authorId: session.user.id,
    //     },
    //   });
    // }

    return new Response("OK");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create blog", { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { description, images } = await req.json();

    const { searchParams } = new URL(req.url);

    const postId = searchParams.get("postId");

    if (!images && !description) {
      return new NextResponse(
        "For you to create a post you need to put a description or upload an image.",
        { status: 400 }
      );
    }

    let imageExist = images.length !== 0 ? images : null;

    await db.blog.update({
      where: {
        id: postId,
        authorId: session.user.id,
      },
      data: {
        description,
        userStatus: "edited",
        image: imageExist,
      },
    });

    return new Response("OK");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create blog", { status: 500 });
  }
}
