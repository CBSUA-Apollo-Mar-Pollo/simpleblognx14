import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostVoteValidator } from "@/lib/validators/vote";
import { z } from "zod";

export async function PATCH(req) {
  try {
    const body = await req.json();

    const { postId, voteType } = PostVoteValidator.parse(body); // validate if the data past is valid from postvotevalidator zod object

    const session = await getAuthSession();

    if (!session?.user) {
      // check if the user is authenticated
      return new Response("Unauthorized", { status: 401 });
    }

    // check if user has already voted on this post
    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    const post = await db.post.findUnique({
      // for caching purposes
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
      },
    });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    if (post.authorId !== session.user.id) {
      await db.history.upsert({
        where: {
          postId_userId: {
            postId,
            userId: session.user.id,
          },
        },
        update: {}, // No changes needed, just refresh the record
        create: {
          postId,
          userId: session.user.id,
        },
      });
    }

    if (existingVote) {
      // delete the vote from the database if the user is click again the same vote type
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_postId: {
              postId,
              userId: session.user.id,
            },
          },
        });
        return new Response("OK");
      }

      //  update the type in vote database to opposite of the previous vote type
      await db.vote.update({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
        data: {
          type: voteType,
        },
      });

      return new Response("OK");
    }

    // if there is no existing vote from user yet
    await db.vote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        postId,
      },
    });

    await db.notification.create({
      data: {
        userId: post.author.id,
        text: `${session.user.name} upvoted your post ${
          post.description.length !== 0 ? post.description : ""
        }.`,
        fromUserId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response(
      "Could not register your vote, please try again later",
      {
        status: 500,
      }
    );
  }
}
