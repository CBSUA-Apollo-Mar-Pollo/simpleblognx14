import { Separator } from "../ui/Separator";
import LogoImageAndIcon from "./LogoImageAndIcon";
import ProfileImageAndIcons from "./ProfileImageAndIcons";
import PostDescription from "./PostDescription";
import LikeCommentAndShare from "./LikeCommentAndShare";
import CommentSection from "./CommentSection";
import { db } from "@/lib/db";

const PostCommentCard = async ({ post, session }) => {
  const comments = await db.comment.findMany({
    where: {
      postId: post.id,
    },
    include: {
      author: true,
    },
  });
  return (
    <div className="grid grid-cols-4 relative">
      {/* Image */}
      <div className="col-span-3 flex h-screen justify-center items-center relative bg-black">
        <LogoImageAndIcon image={post.image} />
      </div>

      {/* comment side */}
      <div className="col-span-1 bg-neutral-900 max-h-full relative">
        <ProfileImageAndIcons session={session} />

        <Separator className="bg-gray-700" />

        <div className="overflow-y-scroll">
          <PostDescription post={post} />

          <Separator className="bg-gray-700" />

          <LikeCommentAndShare />

          <Separator className="bg-gray-700" />

          {session?.user && (
            <CommentSection
              session={session}
              postId={post.id}
              comments={comments}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCommentCard;
