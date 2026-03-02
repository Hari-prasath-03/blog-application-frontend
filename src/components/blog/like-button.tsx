"use client";

import React, { useOptimistic, useTransition } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleLike } from "@/actions/blog/actions";

interface LikeButtonProps {
  blogId: string;
  initialLikes: number;
  initialIsLiked?: boolean;
  className?: string;
}

export function LikeButton({
  blogId,
  initialLikes,
  initialIsLiked = false,
  className,
}: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();

  const [optimisticState, addOptimisticUpdate] = useOptimistic(
    { isLiked: initialIsLiked, likes: initialLikes },
    (state) => ({
      isLiked: !state.isLiked,
      likes: !state.isLiked ? state.likes + 1 : state.likes - 1,
    }),
  );

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      addOptimisticUpdate(null);
      await toggleLike(blogId, isLiked);
    });
  };

  const { isLiked, likes } = optimisticState;

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={cn(
        "flex items-center space-x-1.5 transition-all group active:scale-95 disabled:opacity-70",
        isLiked ? "text-primary" : "text-foreground/50 hover:text-primary/80",
        className,
      )}
    >
      <Heart
        className={cn(
          "w-4.5 h-4.5 transition-colors",
          isLiked ? "fill-current" : "group-hover:fill-current/10",
        )}
      />
      <span className="text-[13px] font-mono font-bold tracking-tight">
        {likes}
      </span>
    </button>
  );
}
