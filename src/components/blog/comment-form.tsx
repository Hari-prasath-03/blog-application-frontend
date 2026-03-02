"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, LogIn } from "lucide-react";
import Link from "next/link";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  isPending: boolean;
  isAuthenticated: boolean;
}

export function CommentForm({
  onSubmit,
  isPending,
  isAuthenticated,
}: CommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isPending) return;

    await onSubmit(content);
    setContent("");
  };

  if (!isAuthenticated) {
    return (
      <div className="p-8 rounded-2xl bg-foreground/5 border border-dashed border-foreground/10 flex flex-col items-center text-center space-y-4">
        <p className="text-sm text-muted-foreground font-medium">
          Join the conversation to share your thoughts.
        </p>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link href="/login" className="flex items-center space-x-2">
            <LogIn className="w-4 h-4" />
            <span>Sign in to comment</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 group">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are your thoughts?"
          className="w-full min-h-30 p-4 rounded-2xl bg-foreground/5 border border-foreground/5 focus:border-primary/30 focus:bg-background transition-all outline-none resize-none text-[15px] leading-relaxed placeholder:text-foreground/20"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isPending || !content.trim()}
          className="rounded-full px-6 h-10 bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all active:scale-95 flex items-center space-x-2"
        >
          {isPending ? (
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
