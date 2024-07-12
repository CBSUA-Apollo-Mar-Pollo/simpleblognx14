"use client";

import { Separator } from "../ui/Separator";
import ProfileImageAndIcons from "./ProfileImageAndIcons";
import PostDescription from "./PostDescription";
import VoteCommentAndShare from "./VoteCommentAndShare";
import CommentSection from "./CommentSection";

import BackgroundImagePost from "./BackgroundImagePost";
import ImagePost from "./ImagePost";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PostCommentCard = ({ post, index, session, comments }) => {
  const router = useRouter();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        router.back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="grid grid-cols-4 relative">
      {/* Image */}
      <div className="col-span-3 flex h-screen justify-center items-center relative bg-black">
        {post.userStatus === "updated his cover photo" ? (
          <BackgroundImagePost
            image={post.image}
            index={index}
            postId={post.id}
          />
        ) : (
          <ImagePost image={post.image} index={index} postId={post.id} />
        )}
      </div>

      {/* comment side */}
      <div className="col-span-1 dark:bg-neutral-800 max-h-full relative">
        <ProfileImageAndIcons session={session} />

        <Separator className="bg-neutral-200 dark:bg-neutral-700" />

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

          <Separator className="bg-neutral-200 dark:bg-neutral-700" />

          <VoteCommentAndShare />

          <Separator className="bg-neutral-200 dark:bg-neutral-700" />

          <CommentSection
            session={session}
            post={post}
            initialComments={comments}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCommentCard;
