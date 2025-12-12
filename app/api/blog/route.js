import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Fetch the user's UserProfile
    const userProfile = await db.userProfile.findFirst({
      where: { id: session.user.id },
    });
    if (!userProfile) {
      return new Response("User profile not found", { status: 404 });
    }

    const body = await req.json();
    const {
      description = "",
      selectedBackgroundColor = null,
      userStatus,
      images = [],
      videos = [],
      communityId,
    } = body;

    if (
      description?.length === 0 &&
      images.length === 0 &&
      videos.length === 0
    ) {
      return new NextResponse(
        "For you to create a post you need to put a description or upload an image or video",
        { status: 400 }
      );
    }

    if (
      description?.length !== 0 &&
      images?.length === 0 &&
      videos?.length === 0
    ) {
      const newPost = await db.post.create({
        data: {
          description,
          textBackgroundStyle: selectedBackgroundColor,
          authorId: userProfile.id,
        },
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
          votes: { select: { userId: true, type: true } },
          community: { include: { members: { select: { userId: true } } } },
        },
      });

      await db.vote.create({
        data: {
          userId: userProfile.id,
          postId: newPost.id,
          type: "UP",
        },
      });

      // Refetch the post to include the newly created vote
      const postWithVote = await db.post.findUnique({
        where: { id: newPost.id },
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
          votes: { select: { userId: true, type: true } },
          community: { include: { members: { select: { userId: true } } } },
        },
      });

      revalidateTag("homepage-feed");
      revalidatePath("/");
      return new Response(
        JSON.stringify({
          ...postWithVote,
          isShortsV: false,
          createdAtMs: new Date(postWithVote.createdAt).getTime(),
        })
      );
    }

    let imageExist = images.length !== 0 ? images : null;

    let post = null;

    if (images.length !== 0) {
      if (userStatus) {
        post = await db.post.create({
          data: {
            description,
            image: imageExist[0],
            userStatus: userStatus,
            authorId: userProfile.id,
          },
        });
      } else {
        post = await db.post.create({
          data: {
            description,
            image: imageExist,
            userStatus: userStatus,
            authorId: userProfile.id,
          },
        });
      }
    }

    if (videos.length !== 0) {
      post = await db.post.create({
        data: {
          description,
          video: videos,
          userStatus: userStatus,
          authorId: userProfile.id,
        },
      });
    }

    if (communityId) {
      await db.post.update({
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
        userId: userProfile.id,
        postId: post.id,
        type: "UP",
      },
    });

    // Fetch the complete post with all relations
    const completePost = await db.post.findUnique({
      where: { id: post.id },
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
        votes: { select: { userId: true, type: true } },
        community: { include: { members: { select: { userId: true } } } },
      },
    });

    revalidateTag("homepage-feed");
    revalidatePath("/");

    return new Response(
      JSON.stringify({
        ...completePost,
        isShortsV: false,
        createdAtMs: new Date(completePost.createdAt).getTime(),
      })
    );
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

    // Fetch the user's UserProfile for authorId checks
    const userProfile = await db.userProfile.findFirst({
      where: { userId: session.user.id },
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
        { status: 400 }
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
