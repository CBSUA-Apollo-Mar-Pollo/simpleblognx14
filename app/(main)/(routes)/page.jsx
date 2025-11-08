import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { UTApi } from "uploadthing/server";
import HomePageLayout from "@/components/utils/home-page-layout";

export const metadata = {
  title: `Estorya | Home`,
};

export default async function HomePage() {
  const session = await getAuthSession();
  const posts = await db.blog.findMany({
    include: {
      author: {
        select: {
          blogs: true,
          id: true,
          type: true,
          name: true,
          bio: true,
          email: true,
          image: true,
          category: true,
          backgroundImage: true,
        },
      },
      comments: true,
      votes: true,
      community: {
        include: {
          members: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  // short video posts
  const shortVideos = await db.shortsv.findMany({
    include: {
      author: {
        select: {
          blogs: true,
          id: true,
          type: true,
          name: true,
          bio: true,
          email: true,
          image: true,
          category: true,
          backgroundImage: true,
        },
      },
      comments: true,
      shortsVotes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  // added a boolean key value
  const updatedShortVideos = shortVideos.map((item) => ({
    ...item,
    isShortsV: true,
  }));

  const mergeData = [...posts, ...updatedShortVideos];

  const sortedData = mergeData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const deleteImage = async (image) => {
    "use server";
    const utapi = new UTApi();
    await utapi.deleteFiles(image.key);
  };

  const getAllConversationsByLogInUser = await db.conversation.findMany({
    where: {
      OR: [{ userOneId: session?.user.id }, { userTwoId: session?.user.id }],
    },
    include: {
      userOne: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      userTwo: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  const conversationList = getAllConversationsByLogInUser.map((item) => {
    let { userOne, userTwo, ...rest } = item;

    // Remove userOne if it matches session.user.id
    if (userOne.id === session.user.id) {
      userOne = null;
    }

    // Remove userTwo if it matches session.user.id
    if (userTwo.id === session.user.id) {
      userTwo = null;
    }

    // Return the new object with potentially null values
    return {
      ...rest,
      userOne,
      userTwo,
    };
  });

  const communities = await db.community.findMany({
    include: {
      members: true,
    },
  });

  //
  return (
    <HomePageLayout
      sortedData={sortedData}
      deleteImage={deleteImage}
      conversationList={conversationList}
      communities={communities}
    />
  );
}
