"use client";

import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Share2, Bookmark } from "lucide-react";
import { LikeButton } from "./like-button";
import { MessageCircle } from "lucide-react";

interface StoryDetailProps {
  blogId?: string;
  title: string;
  content: string;
  authorName?: string;
  publishedAt?: string | Date | null;
  likesCount?: number;
  commentsCount?: number;
  likedByMe?: boolean;
}

export function StoryDetail({
  blogId,
  title,
  content,
  authorName,
  publishedAt,
  likesCount = 0,
  commentsCount = 0,
  likedByMe = false,
}: StoryDetailProps) {
  const date = publishedAt ? new Date(publishedAt) : new Date();
  const isValidDate = !isNaN(date.getTime());

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-8 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] tracking-tight">
          {title || "Untitled Story"}
        </h1>

        <div className="flex items-center justify-between py-6 border-y border-foreground/5">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary border border-primary/20 uppercase">
              {authorName?.[0] || "U"}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base">
                {authorName || "Unknown Author"}
              </span>
              <span className="text-sm text-foreground/40 font-mono tracking-tighter">
                {isValidDate
                  ? format(date, "MMMM d, yyyy")
                  : "Recently published"}{" "}
                · 5 min read
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {blogId && (
              <div className="items-center space-x-6 border-r border-foreground/5 pr-6 mr-2 hidden sm:flex">
                <LikeButton
                  blogId={blogId}
                  initialIsLiked={likedByMe}
                  initialLikes={likesCount}
                />
                <div className="flex items-center space-x-1.5 text-foreground/40 hover:text-foreground transition-colors cursor-pointer">
                  <MessageCircle className="w-4.5 h-4.5" />
                  <span className="text-[13px] font-mono">{commentsCount}</span>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-4 text-foreground/40">
              <Share2 className="w-5 h-5 hover:text-foreground transition-colors cursor-pointer" />
              <Bookmark className="w-5 h-5 hover:text-foreground transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content || "*No content yet...*"}
        </ReactMarkdown>
      </div>
    </article>
  );
}
