"use client";

import useCustomHooks from "@/hooks/use-custom-hooks";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { usePrevious } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import PostVoteDetails from "../Post/PostCard/post-voted-details";

const PostVote = ({ postId, initialVotesAmt, initialVote }) => {
  const { signinToast } = useCustomHooks();
  const [votesAmt, setVotesAmt] = useState(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const [isMounted, setIsMounted] = useState(false);
  const prevVote = usePrevious(currentVote);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (type) => {
      const payload = {
        voteType: type,
        postId: postId,
      };

      await axios.patch("/api/posts/vote", payload);
    },
    onError: (err, voteType) => {
      if (voteType === "UP") setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);

      // reset current vote when error 500
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return signinToast();
        }
      }

      return toast({
        title: "Something went wrong",
        description: "Your vote was not registered. please try again",
        variant: "destructive",
      });
    },
    onMutate: (type) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === "UP") setVotesAmt((prev) => prev - 1);
        else if (type === "DOWN") setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type);
        if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex items-center justify-center my-1 gap-x-1">
      {/* upvote button */}
      {isMounted && (
        <>
          <button onClick={() => vote("UP")} aria-label="upvote">
            <ArrowBigUp
              className={cn(
                "h-10 w-10 rounded-full p-[5px] stroke-[1.6px] text-neutral-600 hover:bg-neutral-200 hover:text-orange-600 dark:hover:bg-neutral-700",
                {
                  "fill-orange-500 stroke-[1.6px] text-orange-700 hover:bg-orange-200/80 hover:text-orange-700 dark:fill-orange-500 dark:text-orange-200 dark:hover:bg-orange-200/20 dark:hover:text-orange-200":
                    currentVote === "UP",
                }
              )}
            />
          </button>

          {/* currentvote */}
          {/* <PostVoteDetails votesAmt={votesAmt} postId={postId} /> */}

          <p className="px-1 text-center font-semibold text-neutral-600 dark:text-neutral-200 ">
            {votesAmt}
          </p>

          {/* downvote button */}
          <button onClick={() => vote("DOWN")} aria-label="downvote">
            <ArrowBigDown
              className={cn(
                "h-10 w-10 rounded-full p-[5px] stroke-[1.6px] text-neutral-600 hover:bg-neutral-200 hover:text-violet-800 dark:hover:bg-neutral-700 dark:hover:text-violet-500",
                {
                  "fill-violet-500 stroke-[1.6px] text-violet-700 hover:bg-violet-200/80 hover:text-violet-700 dark:fill-violet-800 dark:text-violet-200 dark:hover:bg-violet-200/20 dark:hover:text-violet-200":
                    currentVote === "DOWN",
                }
              )}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default PostVote;
