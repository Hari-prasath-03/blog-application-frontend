"use client";

import React, { useState, useEffect, useTransition } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { Comment, User } from "@/types";
import { blogService } from "@/services/blog-service";
import { createCommentAction } from "@/actions/blog/actions";

interface CommentsSectionProps {
  blogId: string;
  currentUser?: User;
}

export function CommentsSection({ blogId, currentUser }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await blogService.getComments(blogId);
        setComments(result.data);
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isPending) return;

    setError(null);
    const formData = new FormData();
    formData.append("content", content);

    startTransition(async () => {
      const result = await createCommentAction(blogId, formData);
      if (result.error) {
        setError(result.error);
      } else {
        setContent("");
        const updated = await blogService.getComments(blogId);
        setComments(updated.data);
      }
    });
  };

  return (
    <section className="mt-16 pt-12 border-t border-foreground/5 space-y-12">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-serif font-bold flex items-center space-x-3">
          <MessageCircle className="w-6 h-6 text-primary" />
          <span>Responses ({comments.length})</span>
        </h3>
      </div>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="relative group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full min-h-30 p-6 rounded-2xl bg-foreground/5 border border-foreground/5 focus:border-primary/20 focus:bg-background transition-all outline-none resize-none font-sans text-base leading-relaxed"
          />
          {error && (
            <p className="text-red-500 text-xs mt-2 font-mono">{error}</p>
          )}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={isPending || !content.trim()}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Respond</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="p-8 rounded-2xl bg-foreground/5 border border-dashed border-foreground/10 text-center">
          <p className="text-foreground/50 text-sm font-mono">
            Please log in to join the conversation.
          </p>
        </div>
      )}

      <div className="space-y-10">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-primary/20" />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="group space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary border border-primary/20 uppercase">
                    {comment.author?.name?.[0] || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      {comment.author?.name || "Member"}
                    </span>
                    <span className="text-[11px] text-foreground/40 font-mono uppercase tracking-tighter">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-foreground/80 leading-relaxed font-sans pl-11">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          !isLoading && (
            <div className="py-10 text-center">
              <p className="text-foreground/30 font-serif italic">
                No responses yet. Be the first to share your thoughts!
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
