"use client";
import React from "react";
import UserVideo from "./user-video";
import ProfileImageAndIcons from "./ProfileImageAndIcons";
import { Separator } from "../ui/Separator";
import VoteCommentAndShare from "./VoteCommentAndShare";
import CommentSection from "./CommentSection";
import { Download, Scaling, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PostDescription from "./PostDescription";
import { useSession } from "next-auth/react";

const UserVideoDetailPage = ({ post, comments, index }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const votesAmt = post.votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1;
    if (vote.type === "DOWN") return acc - 1;
    return acc;
  }, 0);

  const currentVote = post.votes.find(
    (vote) => vote.userId === session?.user.id
  );

  const close = () => {
    router.push("/");
    if (isFullScreen === false) {
      setManualScreen(true);
    } else if (isFullScreen === true) {
      setManualScreen(true);
    }
  };
  return (
    <div className="grid grid-cols-4 relative">
      <div className="col-span-3 flex h-screen justify-center items-center relative bg-black">
        <div className="absolute top-0 flex justify-between w-full items-center px-5 py-2">
          {/* close button and logo */}
          <div className="flex z-20 items-center justify-center gap-2">
            <div
              className="py-4 px-4 cursor-pointer hover:bg-gray-600 rounded-full transition"
              onClick={close}
            >
              <X className=" text-white" />
            </div>
            <Link href="/" className="font-bold">
              <span className="py-[2px] px-4 rounded-full bg-yellow-400 text-3xl">
                E
              </span>
            </Link>
          </div>
          {/* enter fullscreen */}
          <div className="flex z-20">
            <div className="py-4 px-4 cursor-pointer hover:bg-gray-600 hover:bg-opacity-40 rounded-full transition">
              <Download className="text-white " />
            </div>
          </div>
        </div>
        <UserVideo video={post} />
      </div>

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
            commentAmt={comments.length}
            session={session}
            index={index}
          />

          <Separator className="bg-neutral-300 dark:bg-neutral-700" />

          <VoteCommentAndShare
            postId={post.id}
            initialVote={currentVote?.type}
            initialVotesAmt={votesAmt}
          />

          <Separator className="bg-neutral-300 dark:bg-neutral-700" />

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

export default UserVideoDetailPage;
