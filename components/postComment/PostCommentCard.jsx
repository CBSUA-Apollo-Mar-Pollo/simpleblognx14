import { Separator } from "../ui/Separator";
import LogoImageAndIcon from "./LogoImageAndIcon";
import ProfileImageAndIcons from "./ProfileImageAndIcons";
import PostDescription from "./PostDescription";
import VoteCommentAndShare from "./VoteCommentAndShare";
import CommentSection from "./CommentSection";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { COMMENT_PAGE } from "@/config";
import { Button } from "../ui/Button";
import { ChevronLeft } from "lucide-react";

const PostCommentCard = async ({ post, index }) => {
  const session = await getAuthSession();
  const comments = await db.comment.findMany({
    where: {
      postId: post.id,
      replyToId: null,
    },
    include: {
      author: true,
      replies: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="grid grid-cols-4 relative">
      {/* Image */}
      <div className="col-span-3 flex h-screen justify-center items-center relative bg-black">
        <LogoImageAndIcon image={post.image} index={index} postId={post.id} />
      </div>

      {/* comment side */}
      <div className="col-span-1 bg-neutral-800 max-h-full relative">
        <ProfileImageAndIcons session={session} />

        <Separator className="bg-gray-700" />

        <div
          className={` overflow-auto max-h-[100vh] ${
            session?.user ? "pb-[22vh]" : "pb-[10vh]"
          }`}
        >
          <PostDescription
            post={post}
            commentAmt={post.comments.length}
            session={session}
          />

          <Separator className="bg-gray-700" />

          <VoteCommentAndShare />

          <Separator className="bg-gray-700" />

          <CommentSection
            session={session}
            postId={post.id}
            initialComments={comments}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCommentCard;
