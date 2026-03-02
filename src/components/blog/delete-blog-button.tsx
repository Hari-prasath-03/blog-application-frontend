"use client";

import { useState, useTransition } from "react";
import { Trash2, X, Check, Loader2 } from "lucide-react";
import { deleteBlog } from "@/actions/blog/actions";

interface DeleteBlogButtonProps {
  blogId: string;
}

export function DeleteBlogButton({ blogId }: DeleteBlogButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      const result = await deleteBlog(blogId);
      if (result.success) {
        setIsConfirming(false);
      } else {
        alert(result.error || "Failed to delete blog");
        setIsConfirming(false);
      }
    });
  };

  const toggleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsConfirming(!isConfirming);
  };

  return (
    <div className="flex items-center space-x-2">
      {isConfirming ? (
        <div className="flex items-center bg-destructive/10 rounded-full p-1 animate-in fade-in zoom-in duration-200">
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-1.5 text-destructive hover:bg-destructive/20 rounded-full transition-colors disabled:opacity-50"
            title="Confirm Delete"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Check className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={toggleConfirm}
            disabled={isPending}
            className="p-1.5 text-foreground/40 hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={toggleConfirm}
          className="p-2 text-foreground/40 hover:text-destructive hover:bg-destructive/5 rounded-full transition-all duration-200 group/delete flex items-center space-x-1"
          title="Delete story"
        >
          <Trash2 className="w-4.5 h-4.5 group-hover/delete:scale-110 transition-transform" />
          <span className="text-[11px] font-mono tracking-widest hidden group-hover/delete:inline opacity-0 group-hover/delete:opacity-100 transition-opacity">
            Delete
          </span>
        </button>
      )}
    </div>
  );
}
