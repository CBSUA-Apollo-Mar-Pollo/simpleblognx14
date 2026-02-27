"use client";
import React, { useState, useEffect, useRef } from "react";
// ... your other imports
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "../ui/Input";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { DialogHeader, DialogTitle } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { Separator } from "../ui/Separator";

// 1. Ensure this is definitely defined.
// If it's undefined, GiphyFetch will throw an error immediately.
const giphyKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY || "";
const gf = new GiphyFetch(giphyKey);

const PostGIFSelection = ({ setIsGifSelectionActive, setGifPreview }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [width, setWidth] = useState(0); // Start at 0 to prevent hydration mismatch
  const containerRef = useRef(null);

  // 2. Handle dynamic width calculation
  useEffect(() => {
    // Small timeout ensures the Dialog/Modal animation is finished
    // and the DOM has a real width.
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Use a stable key that changes ONLY when the search changes
  // This prevents the "Try Again" crash during the initial mount.
  const gridKey = searchQuery || "trending";

  // 3. Define the fetcher. If searchQuery exists, use search, else trending.
  const fetchGifs = (offset) =>
    searchQuery
      ? gf.search(searchQuery, { offset, limit: 10 })
      : gf.trending({ offset, limit: 10 });
  return (
    <>
      <DialogHeader className="pt-4 px-4">
        <DialogTitle className="text-xl font-bold text-center">
          Choose a GIF
        </DialogTitle>

        <Button
          variant="ghost"
          onClick={() => setIsGifSelectionActive(false)}
          className="p-0 rounded-full"
          asChild
        >
          <ArrowLeft className="w-10 h-10 absolute left-4 top-1 cursor-pointer p-2 bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-200 " />
        </Button>
      </DialogHeader>

      <Separator className="dark:bg-neutral-700 border-1" />

      {/* ... Header and Search Input ... */}
      <div className="relative mx-3 mb-4 flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-gray-500 z-20 dark:text-neutral-300" />
        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="h-9 pl-12 focus-visible:ring-transparent placeholder:font-normal placeholder:text-neutral-700 border-0 bg-neutral-200/50 font-light rounded-full  text-sm dark:placeholder:text-white"
        />
      </div>

      <div ref={containerRef} className="w-full">
        <SimpleBar style={{ maxHeight: "62vh", minHeight: "62vh" }}>
          {/* 4. Only render the grid once we have a valid width */}
          {width > 0 && (
            <Grid
              key={searchQuery} // CRITICAL: Forces grid to reset when search changes
              width={width}
              columns={3}
              fetchGifs={fetchGifs}
              gutter={6}
              onGifClick={(gif, e) => {
                e.preventDefault();
                const gifData = {
                  type: gif.type,
                  giphyId: gif.id,
                  title: gif.title,
                  url: gif.images.fixed_height.url,
                  webp: gif.images.fixed_height.webp,
                  preview: gif.images.fixed_height_still.url,
                  width: gif.images.fixed_height.width,
                  height: gif.images.fixed_height.height,
                };
                setIsGifSelectionActive(false);
                setGifPreview(gifData);
              }}
            />
          )}
        </SimpleBar>
      </div>
    </>
  );
};

export default PostGIFSelection;
