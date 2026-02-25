import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const postInclude = {
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
  votes: { select: { userId: true, type: true } },
  community: { include: { members: { select: { userId: true } } } },
};

function hasContent({ description, media }) {
  return description?.trim() || (media && media.length > 0);
}

function buildPostData({
  description,
  selectedBackgroundColor,
  userStatus,
  media,
  authorId,
  communityId,
}) {
  return {
    description: description || null,
    textBackgroundStyle: selectedBackgroundColor,
    userStatus,
    media,
    authorId,
    communityId,
  };
}

function shapeResponse(post) {
  return {
    ...post,
    isShortsV: false,
    createdAtMs: new Date(post.createdAt).getTime(),
  };
}

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userProfile = await db.userProfile.findUnique({
      where: { id: session.user.id },
    });

    if (!userProfile) {
      return new Response("User profile not found", { status: 404 });
    }

    const body = await req.json();

    const {
      description = "",
      selectedBackgroundColor = null,
      userStatus = null,
      media = [],
      communityId,
    } = body;

    if (!hasContent({ description, media })) {
      return new Response("Post must have description or media content", {
        status: 400,
      });
    }

    const postData = buildPostData({
      description,
      selectedBackgroundColor,
      userStatus,
      media,
      authorId: userProfile.id,
      communityId,
    });

    const post = await db.$transaction(async (tx) => {
      const created = await tx.post.create({
        data: postData,
      });

      await tx.vote.create({
        data: {
          userId: userProfile.id,
          postId: created.id,
          type: "UP",
        },
      });

      return tx.post.findUnique({
        where: { id: created.id },
        include: postInclude,
      });
    });

    return new Response(JSON.stringify(shapeResponse(post)));
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create post", { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Fetch the user's UserProfile for authorId checks
    const userProfile = await db.userProfile.findFirst({
      where: { id: session.user.id },
    });
    if (!userProfile) {
      return new Response("User profile not found", { status: 404 });
    }

    const { description, images, selectedBackgroundColor } = await req.json();

    const { searchParams } = new URL(req.url);

    const postId = searchParams.get("postId");

    if (!images && !description) {
      return new NextResponse(
        "For you to create a post you need to put a description or upload an image.",
        { status: 400 },
      );
    }

    console.log(images);

    let imageExist = images.length !== 0 ? images : null;

    if (imageExist === null) {
      await db.post.update({
        where: {
          id: postId,
          authorId: userProfile.id,
        },
        data: {
          description,
          userStatus: "edited",
          textBackgroundStyle: selectedBackgroundColor,
        },
      });
    }

    if (imageExist) {
      await db.post.update({
        where: {
          id: postId,
          authorId: userProfile.id,
        },
        data: {
          description,
          userStatus: "edited",
          image: imageExist,
        },
      });

      return new Response("OK");
    }

    return new Response("OK");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create blog", { status: 500 });
  }
}
