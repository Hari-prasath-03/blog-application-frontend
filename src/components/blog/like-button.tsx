"use client";

import React, { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleLikeAction } from "@/actions/blog/actions";

interface LikeButtonProps {
  blogId: string;
  initialLikes: number;
  initialIsLiked?: boolean; // Note: Current schema doesn't have isLiked,
  // but we'll plan for it or manage local state.
  className?: string;
  showCount?: boolean;
}

export function LikeButton({
  blogId,
  initialLikes,
  initialIsLiked = false,
  className,
  showCount = true,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isPending, startTransition] = useTransition();

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPending) return;

    // Optimistic Update
    const newIsLiked = !isLiked;
    const newLikesCount = newIsLiked ? likes + 1 : Math.max(0, likes - 1);

    setIsLiked(newIsLiked);
    setLikes(newLikesCount);

    startTransition(async () => {
      const result = await toggleLikeAction(blogId, isLiked);
      if (result.error) {
        // Rollback on error
        setIsLiked(isLiked);
        setLikes(likes);
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={cn(
        "flex items-center space-x-1.5 transition-all outline-none group/like",
        isLiked ? "text-primary" : "text-foreground/50 hover:text-primary",
        className,
      )}
    >
      <Heart
        className={cn(
          "w-4.5 h-4.5 transition-transform duration-300 group-active/like:scale-125",
          isLiked && "fill-current",
        )}
      />
      {showCount && (
        <span className="text-[13px] font-mono select-none">{likes}</span>
      )}
    </button>
  );
}
