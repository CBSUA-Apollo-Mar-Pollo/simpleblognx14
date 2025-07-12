"use client";

import React from "react";
import { Checkbox } from "../ui/Checkbox";
import { Archive, Dot, MoreHorizontal, Trash, Trash2, Undo2 } from "lucide-react";
import { Button } from "../ui/Button";
import UserAvatar from "../utils/UserAvatar";
import { data } from "autoprefixer";

const TrashPosts = ({ trashPosts }) => {
  
  // Helper function to format date as Month Day, Year (e.g., "June 27, 2025")
const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  // Get the full month name
  const month = date.toLocaleString('default', { month: 'long' });
  
  // Get the day and year
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Return in the format: "Month Day, Year"
  return `${month} ${day}, ${year}`;
};

// Group by trashedAt with custom structure
const groupedPostsByTrashedAt = Object.values(trashPosts.reduce((groups, post) => {
  const date = formatDate(post.trashedAt);
  
  // If the group for this date doesn't exist, create it
  if (!groups[date]) {
    groups[date] = { trashedAt: date, posts: [] };
  }
  
  // Add post to the respective group
  groups[date].posts.push(post);
  return groups;
}, {}));

// Sort groups by trashedAt date in descending order
groupedPostsByTrashedAt.sort((a, b) => {
  const dateA = new Date(a.trashedAt); // Convert the trashedAt date to Date object
  const dateB = new Date(b.trashedAt); // Convert the trashedAt date to Date object
  return dateB - dateA; // Compare dates to sort in descending order
});

console.log(groupedPostsByTrashedAt, "trash posts");
  return (
    <div className="mx-20 w-full">
      <h1 className="text-center bg-neutral-300 py-2">
        Items in your trash are only visible to you.
      </h1>

      <div className="bg-white drop-shadow-[0px_0px_3px_rgba(0,0,0,0.2)] flex items-center justify-between p-4 rounded-md mt-4">
        <div className="flex items-center">
          <Checkbox className="border-2 dark:border-neutral-50 h-5 w-5 mr-4 " />
          <p>All</p>
        </div>

        <div className="flex gap-x-4">
          <Button className="flex gap-x-2 items-center bg-zinc-300 text-black">
            <Archive className="w-5 h-5" />
            <p>Archive</p>
          </Button>
          <Button className="flex gap-x-2 items-center bg-zinc-300 text-black">
            <Undo2 className="w-5 h-5" />
            <p>Restore</p>
          </Button>
          <Button className="flex gap-x-2 items-center bg-zinc-300 text-black">
            <Trash className="w-5 h-5" />
            <p>Delete</p>
          </Button>
        </div>
      </div>

      {groupedPostsByTrashedAt.map((item) => (
              <div className="bg-white drop-shadow-[0px_0px_3px_rgba(0,0,0,0.2)] flex-col items-center justify-between p-4 rounded-md mt-4 mb-4">
                <h1 className="font-medium mb-2">{item.trashedAt}</h1>
                {item.posts.map((post) => {
                  
                    // Function to calculate the deletion date (30 days after trashedAt)
                     // Function to calculate the deletion date (30 days after trashedAt)
                      const trashedDate = new Date(post.trashedAt);
                      trashedDate.setDate(trashedDate.getDate() + 30); // Add 30 days

                      // Calculate the difference in days
                      const currentDate = new Date();
                      const timeDifference = trashedDate - currentDate;
                      const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days

                        const hours = trashedDate.getHours();
                        const minutes = trashedDate.getMinutes();
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const trashedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;


                  return (
                    <div className="mx-1 flex items-center my-3 gap-x-4">
                      <Checkbox className="border dark:border-neutral-50 h-5 w-5 mr-4 " />
                      {/* if post is only text */}
                      {post.image === null && (
                          <div className="flex items-start gap-x-2 w-full">
                            <UserAvatar className="h-14 w-14 hover:bg-slate-100"
                              user={{
                                image: post.author.image || null,
                              }}/>

                              <div className="flex-1 flex items-center justify-between">
                                <div>
                                <p className="text-[15px]"> <span className="font-semibold">{post.author.name} </span>updated his status.</p>
                                <p className="text-[13px]">{post.description}</p>
                                <div className="flex items-center justify-between gap-x-1 mt-1">
                                  <div className="flex items-center gap-x-2">
                                  <Trash2 className="h-4 w-4" />
                                  <span className="text-[13px]">{daysLeft} days left</span>
                                  </div>
                                 
                                </div>
                                </div>
                                 <div className="flex items-end gap-x-2">
                                    <span className="text-[13px] mt-0.5">{trashedTime}</span>
                                    <Button className="p-2 bg-neutral-200 hover:bg-neutral-300 text-black ">View</Button>
                                    <Button className="rounded-full px-2 bg-neutral-200 hover:bg-neutral-300 text-black "><MoreHorizontal className="h-6 w-6" /></Button>
                                  </div>
                              </div>
                          </div>
                      )}
                    </div>

                  )
})}
              </div>
      ))}
    </div>
  );
};

export default TrashPosts;
