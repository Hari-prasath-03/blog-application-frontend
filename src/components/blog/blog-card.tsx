import { Blog, User } from "@/types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { LikeButton } from "./like-button";

interface BlogCardProps {
  blog: Blog;
  priority?: boolean;
  isEditable?: boolean;
  currentUser?: User;
}

export function BlogCard({
  blog,
  priority = false,
  isEditable = false,
  currentUser,
}: BlogCardProps) {
  const dateStr = blog.publishedAt || blog.createdAt;
  const publishedDate = dateStr ? new Date(dateStr) : null;
  const isValidDate = publishedDate && !isNaN(publishedDate.getTime());

  const timeAgo = isValidDate
    ? formatDistanceToNow(publishedDate, { addSuffix: true })
    : "Just now";

  return (
    <div className="group py-8 border-b border-foreground/5 last:border-0 flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1 space-y-4">
        <div className="flex items-center space-x-2 text-[13px]">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20 uppercase">
            {(blog.author?.name || currentUser?.name || "U")[0]}
          </div>
          <span className="font-bold text-foreground">
            {blog.author?.name || currentUser?.name || "Unknown Author"}
          </span>
          <span className="text-foreground/40 font-mono text-[11px] uppercase tracking-tighter">
            · {timeAgo}
          </span>
        </div>

        <Link
          href={
            isEditable ? `/my-list/edit/${blog.id}` : `/stories/${blog.slug}`
          }
          className="block group-hover:opacity-80 transition-opacity"
        >
          <div className="space-y-2">
            <h2
              className={`font-serif font-bold text-foreground leading-[1.15] tracking-tight ${priority ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}
            >
              {blog.title}
            </h2>
            <p className="text-foreground/60 text-sm md:text-base font-sans line-clamp-2 leading-relaxed max-w-2xl">
              {blog.summary ||
                (blog.content ? blog.content.substring(0, 160) + "..." : "")}
            </p>
          </div>
        </Link>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-6">
            <LikeButton
              blogId={blog.id}
              initialLikes={blog._count?.likes || 0}
            />
            <div className="flex items-center space-x-1.5 text-foreground/50 hover:text-foreground transition-colors cursor-pointer">
              <MessageCircle className="w-4.5 h-4.5" />
              <span className="text-[13px] font-mono">
                {blog._count?.comments || 0}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-foreground/40">
            <Bookmark className="w-4.5 h-4.5 hover:text-foreground transition-colors cursor-pointer" />
            <MoreHorizontal className="w-4.5 h-4.5 hover:text-foreground transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
