import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ShortsvVoteValidator } from "@/lib/validators/vote";
import { z } from "zod";

export async function PATCH(req) {
  try {
    const body = await req.json();

    const { shortsvId, voteType } = ShortsvVoteValidator.parse(body); // validate if the data past is valid from postvotevalidator zod object

    const session = await getAuthSession();

    if (!session?.user) {
      // check if the user is authenticated
      return new Response("Unauthorized", { status: 401 });
    }

    // check if user has already voted on this post
    const existingVote = await db.shortsvidvote.findFirst({
      where: {
        userId: session.user.id,
        shortsvId,
      },
    });

    const shortv = await db.shortsv.findUnique({
      // for caching purposes
      where: {
        id: shortsvId,
      },
      include: {
        author: true,
        shortsVotes: true,
      },
    });

    if (!shortv) {
      return new Response("Post not found", { status: 404 });
    }

    if (existingVote) {
      // delete the vote from the database if the user is click again the same vote type
      if (existingVote.type === voteType) {
        await db.shortsvidvote.delete({
          where: {
            userId_postId: {
              shortsvId,
              userId: session.user.id,
            },
          },
        });
        return new Response("OK");
      }

      //  update the type in vote database to opposite of the previous vote type
      await db.shortsvidvote.update({
        where: {
          userId_postId: {
            shortsvId,
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
    await db.shortsvidvote.create({
      data: {
        type: voteType,
        userId: session.user.id,
        shortsvId,
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
