"use client";

import { Comment } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Trash2, User as UserIcon } from "lucide-react";

interface CommentListProps {
  comments: Comment[];
  onDelete: (id: string) => Promise<void>;
  currentUserId?: string;
}

export function CommentList({
  comments,
  onDelete,
  currentUserId,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground italic text-sm">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="group relative flex space-x-4 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/5">
              <UserIcon className="w-5 h-5 text-primary/60" />
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-foreground/80">
                  {comment.user.name}
                </span>
                <span className="text-[11px] font-mono text-foreground/30 uppercase">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {currentUserId === comment.user.id && (
                <button
                  onClick={() => onDelete(comment.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-destructive/40 hover:text-destructive hover:bg-destructive/5 rounded-full transition-all"
                  title="Delete comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-[15px] text-foreground/70 leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
