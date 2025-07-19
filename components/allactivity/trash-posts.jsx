"use client";

import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/Checkbox";
import { Archive, Trash2, Undo2, X } from "lucide-react";
import { Button } from "../ui/Button";
import UserAvatar from "../utils/UserAvatar";
import Image from "next/image";
import ArchiveOrTrashPostOption from "./interactives/archive-or-trash-post-option";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Separator } from "../ui/Separator";
import { deletePosts } from "@/actions/deletePosts";
import Link from "next/link";
import { restorePosts } from "@/actions/restorePosts";

const TrashPosts = ({ trashPosts }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestorePostModalOpen, setIsRestorePostModalOpen] = useState(false);

  // Helper function to format date as Month Day, Year (e.g., "June 27, 2025")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Group by trashedAt with custom structure
  const formattedTrashPosts = Object.values(
    trashPosts.reduce((groups, post) => {
      const date = formatDate(post.trashedAt);

      // If the group for this date doesn't exist, create it
      if (!groups[date]) {
        groups[date] = { trashedAt: date, posts: [] };
      }

      // Add post to the respective group
      groups[date].posts.push(post);
      return groups;
    }, {})
  );

  // Sort groups by trashedAt date in descending order
  formattedTrashPosts.sort((a, b) => {
    const dateA = new Date(a.trashedAt);
    const dateB = new Date(b.trashedAt);
    return dateB - dateA;
  });

  const [groupedPostsByTrashedAt, setGroupedPostsByTrashedAt] =
    useState(formattedTrashPosts);

  // State for "Select All" checkbox
  const [selectAll, setSelectAll] = useState(false);

  // State for individual checkboxes (posts)
  const [checkedItems, setCheckedItems] = useState([]);

  // Handle "Select All" checkbox change
  const handleSelectAllChange = (e) => {
    const isChecked = e;
    setSelectAll(isChecked);

    // If "Select All" is checked, select all posts
    if (isChecked) {
      const allPostIds = trashPosts.map((post) => {
        return {
          postId: post.id,
          imageInfo: post.image?.length >= 1 ? post.image : null,
        };
      }); // Get all post IDs
      setCheckedItems(allPostIds); // Add all post IDs to checkedItems
    } else {
      // If "Select All" is unchecked, clear checkedItems array
      setCheckedItems([]);
    }
  };

  // Handle individual post checkbox change
  const handlePostChange = (postId, postImage, e) => {
    const isChecked = e;
    setCheckedItems((prev) => {
      if (isChecked) {
        // Add postId to checkedItems array if checked
        return [...prev, { postId, imageInfo: postImage }];
      } else {
        // Remove postId from checkedItems array if unchecked
        return prev.filter((item) => item.postId !== postId);
      }
    });
  };

  // Check if all posts are checked to manage "Select All" state
  const areAllChecked =
    trashPosts.length > 0 && checkedItems.length === trashPosts.length;

  // Update "Select All" checkbox state when individual items change
  useEffect(() => {
    setSelectAll(areAllChecked);
  }, [checkedItems]);

  const handleDeselect = () => {
    setSelectAll(false);
    setCheckedItems([]);
  };

  const handleRestoreToProfileCheckedPost = async () => {
    const updatedGroups = groupedPostsByTrashedAt.map((group) => {
      return {
        trashedAt: group.trashedAt,
        posts: group.posts.filter(
          (post) => !checkedItems.some((item) => item.postId === post.id)
        ),
      };
    });

    setGroupedPostsByTrashedAt(updatedGroups);
    setIsRestorePostModalOpen(false);

    try {
      await restorePosts(checkedItems);
    } catch (error) {
      console.error("Failed to restore posts:", error);
      setGroupedPostsByTrashedAt(formattedTrashPosts);
    }
  };

  const handleRestoreSinglePost = async (id) => {
    const updatedGroups = groupedPostsByTrashedAt.map((group) => {
      return {
        trashedAt: group.trashedAt,
        posts: group.posts.filter((post) => post.id !== id), // Remove posts based on checkedItems
      };
    });

    setGroupedPostsByTrashedAt(updatedGroups);
    setIsRestorePostModalOpen(false);

    try {
      await restorePosts([{ postId: id }]);
    } catch (error) {
      console.error("Failed to restore posts:", error);
      setGroupedPostsByTrashedAt(formattedTrashPosts);
    }
  };

  const handleDeleteCheckedPost = async () => {
    const postsToDelete = checkedItems;

    // Filter out posts that are selected for deletion from grouped posts
    const updatedGroups = groupedPostsByTrashedAt.map((group) => {
      return {
        trashedAt: group.trashedAt,
        posts: group.posts.filter(
          (post) => !checkedItems.some((item) => item.postId === post.id)
        ),
      };
    });

    setGroupedPostsByTrashedAt(updatedGroups);
    setIsDeleteModalOpen(false);

    try {
      await deletePosts(checkedItems);
    } catch (error) {
      console.error("Failed to delete posts:", error);
      setGroupedPostsByTrashedAt(formattedTrashPosts);
    }
  };

  const handleDeleteSinglePost = async (id, image) => {
    const updatedGroups = groupedPostsByTrashedAt.map((group) => {
      return {
        trashedAt: group.trashedAt,
        posts: group.posts.filter((post) => post.id !== id), // Remove posts based on checkedItems
      };
    });

    setGroupedPostsByTrashedAt(updatedGroups);
    setIsDeleteModalOpen(false);

    try {
      await deletePosts([{ postId: id, imageInfo: image }]);
    } catch (error) {
      console.error("Failed to delete posts:", error);
      setGroupedPostsByTrashedAt(formattedTrashPosts);
    }
  };
  console.log(checkedItems, "checked items");
  console.log(groupedPostsByTrashedAt, "trash posts");

  return (
    <div className="mx-20 w-full">
      <h1 className="text-center bg-neutral-300 dark:bg-neutral-600 dark:text-white text-sm py-2">
        Items in your trash are only visible to you.
      </h1>

      <div className="bg-white dark:bg-neutral-800 drop-shadow-[0px_0px_4px_rgba(0,0,0,0.2)] flex items-center justify-between p-4 rounded-md mt-4">
        <div className="flex items-center">
          <Checkbox
            checked={selectAll}
            onCheckedChange={(e) => handleSelectAllChange(e)}
            className="border-2 dark:border-neutral-50 h-5 w-5 mr-4 "
          />
          <p className="dark:text-white">All</p>
        </div>

        {checkedItems.length !== 0 && (
          <p className="font-semibold dark:text-neutral-200">
            {checkedItems.length}
          </p>
        )}

        <div className="flex gap-x-4">
          {checkedItems.length !== 0 && (
            <Button
              onClick={handleDeselect}
              className=" bg-zinc-300 dark:bg-neutral-700 hover:bg-zinc-400 text-black dark:text-white"
            >
              Deselect
            </Button>
          )}

          <Button
            disabled={
              selectAll === false && checkedItems.length === 0 ? true : false
            }
            className="flex gap-x-2 items-center bg-zinc-300 dark:bg-neutral-700 hover:bg-zinc-400 text-black dark:text-white "
          >
            <Archive className="w-5 h-5" />
            <p>Archive</p>
          </Button>
          <Dialog
            open={isRestorePostModalOpen}
            onOpenChange={setIsRestorePostModalOpen}
          >
            <DialogTrigger asChild>
              <Button
                disabled={
                  selectAll === false && checkedItems.length === 0
                    ? true
                    : false
                }
                className="flex gap-x-2 items-center bg-zinc-300 dark:bg-neutral-700 hover:bg-zinc-400 text-black dark:text-white"
              >
                <Undo2 className="w-5 h-5" />
                <p>Restore</p>
              </Button>
            </DialogTrigger>

            <DialogContent className="[&>button]:hidden p-0  dark:bg-neutral-900 dark:border-0 min-w-[35vw]">
              <DialogHeader className="pt-4 relative">
                <DialogTitle className="text-center font-bold text-xl dark:text-neutral-200">
                  Restore to Profile?
                </DialogTitle>
                <DialogClose asChild>
                  <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
                </DialogClose>
              </DialogHeader>

              <Separator className="dark:bg-neutral-700  h-[1px] bg-neutral-400" />

              <p className="px-8 text-[15px] pb-2 text-justify dark:text-neutral-200">
                Items you restore to your profile can be seen by the audience
                that was selected before they were moved to trash.
              </p>

              <div className="w-full flex items-end justify-end gap-x-1 p-3">
                <Button
                  onClick={() => setIsRestorePostModalOpen(false)}
                  variant="ghost"
                  className="text-blue-600 dark:hover:bg-neutral-600 dark:hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRestoreToProfileCheckedPost}
                  className="bg-blue-600 hover:bg-blue-700 px-10 "
                >
                  Restore
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={
                  selectAll === false && checkedItems.length === 0
                    ? true
                    : false
                }
                className="flex gap-x-2 items-center bg-zinc-300 dark:bg-neutral-700 hover:bg-zinc-400 text-black dark:text-white"
              >
                <Trash2 className="w-5 h-5" />
                <p>Delete</p>
              </Button>
            </DialogTrigger>

            <DialogContent className="[&>button]:hidden p-0 dark:bg-neutral-900 dark:border-0 min-w-[35vw]">
              <DialogHeader className="pt-4 relative">
                <DialogTitle className="text-center font-bold text-xl dark:text-neutral-200">
                  Delete?
                </DialogTitle>
                <DialogClose asChild>
                  <X className="w-9 h-9 absolute right-4 top-1 cursor-pointer p-1.5 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 rounded-full" />
                </DialogClose>
              </DialogHeader>

              <Separator className="dark:bg-neutral-700  h-[1px] bg-neutral-400" />

              <p className="px-4 pb-2 dark:text-neutral-200">
                items you delete can't be restored.
              </p>

              <div className="w-full flex items-end justify-end gap-x-1 p-3">
                <Button
                  onClick={() => setIsDeleteModalOpen(false)}
                  variant="ghost"
                  className="text-blue-600 dark:hover:bg-neutral-600 dark:hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteCheckedPost}
                  className="bg-blue-600 hover:bg-blue-700 px-10"
                >
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {groupedPostsByTrashedAt.map((item) => (
        <div className="bg-white dark:bg-neutral-800 drop-shadow-[0px_0px_4px_rgba(0,0,0,0.2)] flex-col items-center justify-between p-4 rounded-md mt-4 mb-4">
          <h1 className="font-medium mb-2 dark:text-neutral-200">
            {item.trashedAt}
          </h1>
          {item.posts.map((post) => {
            // Function to calculate the deletion date (30 days after trashedAt)
            const trashedDate = new Date(post.trashedAt);
            trashedDate.setDate(trashedDate.getDate() + 30); // Add 30 days

            // Calculate the 30 days difference between the post post trashedAt date
            const currentDate = new Date();
            const timeDifference = trashedDate - currentDate;
            const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days

            // get the time of the post when it was move to trashed
            const hours = trashedDate.getHours();
            const minutes = trashedDate.getMinutes();
            const ampm = hours >= 12 ? "PM" : "AM";
            const trashedTime = `${hours % 12 || 12}:${
              minutes < 10 ? "0" + minutes : minutes
            } ${ampm}`;

            return (
              <div className="mx-1 flex items-center my-3 gap-x-4">
                <Checkbox
                  checked={checkedItems.some((item) => item.postId === post.id)}
                  onCheckedChange={(e) =>
                    handlePostChange(post.id, post.image, e)
                  }
                  className="border dark:border-neutral-50 h-5 w-5 mr-4 "
                />
                {/* if post is only text */}
                {post.image === null && (
                  <div className="flex items-start gap-x-2 w-full">
                    <UserAvatar
                      className="h-14 w-14 hover:bg-slate-100"
                      user={{
                        image: post?.author?.image || null,
                      }}
                    />

                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <p className="text-[15px] dark:text-neutral-200 ">
                          {" "}
                          <span className="font-semibold">
                            {post?.author?.name}{" "}
                          </span>
                          updated his status.
                        </p>
                        <p className="text-[13px] dark:text-neutral-200">
                          {post?.description}
                        </p>
                        <div className="flex items-center justify-between gap-x-1 mt-1">
                          <div className="flex items-center gap-x-2">
                            <Trash2 className="h-4 w-4 dark:text-neutral-200" />
                            <span className="text-[13px] dark:text-neutral-200">
                              {daysLeft} days left
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end gap-x-2">
                        <span className="text-[13px] mt-0.5 dark:text-neutral-200">
                          {trashedTime}
                        </span>
                        <Button className="p-2 bg-neutral-200 hover:bg-neutral-300 text-black ">
                          View
                        </Button>
                        <ArchiveOrTrashPostOption
                          postId={post.id}
                          postImage={post.image}
                          handleDeleteSinglePost={handleDeleteSinglePost}
                          isDeleteModalOpen={isDeleteModalOpen}
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                          handleRestoreSinglePost={handleRestoreSinglePost}
                          isRestorePostModalOpen={isRestorePostModalOpen}
                          setIsRestorePostModalOpen={setIsRestorePostModalOpen}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* if post is an image or gallery */}
                {post.image !== null && (
                  <div className="flex items-start gap-x-2 w-full">
                    <Image
                      width={80}
                      height={80}
                      src={
                        post?.image && post?.image.length > 0
                          ? post.image[0].url
                          : "/ImageIcons/gallery.png"
                      }
                      alt="profile image"
                      referrerPolicy="no-referrer"
                      className="transition rounded-xl object-contain"
                    />

                    <div className="flex-1 flex items-center justify-between mt-2">
                      <div>
                        <p className="text-[15px] dark:text-neutral-200">
                          {" "}
                          <span className="font-semibold">
                            {post?.author?.name}{" "}
                          </span>
                          {post.image.length > 1
                            ? `added ${post.image.length} new photos.`
                            : "added a new photo."}
                        </p>
                        <p className="text-[13px] dark:text-neutral-200">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between gap-x-1 mt-1">
                          <div className="flex items-center gap-x-2">
                            <Trash2 className="h-4 w-4 dark:text-neutral-200" />
                            <span className="text-[13px] dark:text-neutral-200">
                              {daysLeft} days left
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-end gap-x-2">
                        <span className="text-[13px] mt-0.5 dark:text-neutral-200">
                          {trashedTime}
                        </span>
                        <Link
                          href={`/${post.author.name
                            .replace(/\s/g, "")
                            .toLowerCase()}/posts/${post.id}`}
                          className="p-2 bg-neutral-200 dark:bg-neutral-700 dark:text-white hover:bg-neutral-300 text-black rounded-md "
                        >
                          View
                        </Link>
                        <ArchiveOrTrashPostOption
                          postId={post.id}
                          postImage={post.image}
                          handleDeleteSinglePost={handleDeleteSinglePost}
                          isDeleteModalOpen={isDeleteModalOpen}
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                          handleRestoreSinglePost={handleRestoreSinglePost}
                          isRestorePostModalOpen={isRestorePostModalOpen}
                          setIsRestorePostModalOpen={setIsRestorePostModalOpen}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TrashPosts;
