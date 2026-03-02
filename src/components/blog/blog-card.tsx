import Link from "next/link";
import { FeedBlog, Blog, User } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Bookmark, MoreHorizontal, MessageCircle } from "lucide-react";
import { LikeButton } from "./like-button";
import { DeleteBlogButton } from "./delete-blog-button";

interface BlogCardProps {
  blog: FeedBlog | Blog;
  isEditable?: boolean;
  currentUser?: User;
}

export function BlogCard({
  blog,
  isEditable = false,
  currentUser,
}: BlogCardProps) {
  const dateStr =
    blog.publishedAt || ("createdAt" in blog ? blog.createdAt : null);
  const publishedDate = dateStr ? new Date(dateStr) : null;
  const isValidDate = publishedDate && !isNaN(publishedDate.getTime());

  const timeAgo = isValidDate
    ? formatDistanceToNow(publishedDate, { addSuffix: true })
    : "Just now";

  const authorName = blog.author?.name || currentUser?.name || "Unknown Author";

  const hasSocial = "_count" in blog;
  const likesCount = blog._count?.likes ?? 0;
  const commentsCount = blog._count?.comments ?? 0;
  const likedByMe = blog.likedByMe ?? false;

  const isPublished = "isPublished" in blog ? blog.isPublished : true;

  return (
    <div className="py-8 border-b border-foreground/5 last:border-0 flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1 space-y-4">
        <div className="flex items-center space-x-2 text-[13px]">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20 uppercase">
            {authorName[0]}
          </div>
          <span className="font-bold text-foreground">{authorName}</span>
          <span className="text-foreground/40 font-mono text-[11px] uppercase tracking-tighter">
            · {timeAgo}
          </span>
          {isEditable && (
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full bg-foreground/5 text-[10px] font-bold uppercase tracking-wider">
                {isPublished ? "Published" : "Draft"}
              </span>
              <DeleteBlogButton blogId={blog.id} />
            </div>
          )}
        </div>

        <Link
          href={isEditable ? `/my-list/edit/${blog.id}` : `/feed/${blog.slug}`}
          className="block transition-opacity"
        >
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-foreground leading-[1.15] tracking-tight text-2xl md:text-4xl">
              {blog.title}
            </h2>
            {blog.summary && (
              <p className="text-foreground/60 text-sm md:text-base font-sans line-clamp-2 leading-relaxed max-w-2xl">
                {blog.summary}
              </p>
            )}
          </div>
        </Link>

        {hasSocial && !isEditable && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-6">
              <LikeButton
                blogId={blog.id}
                initialIsLiked={likedByMe}
                initialLikes={likesCount}
              />
              <div className="flex items-center space-x-1.5 text-foreground/50 hover:text-foreground transition-colors cursor-pointer">
                <MessageCircle className="w-4.5 h-4.5" />
                <span className="text-[13px] font-mono">{commentsCount}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-foreground/40">
              <Bookmark className="w-4.5 h-4.5 hover:text-foreground transition-colors cursor-pointer" />
              <MoreHorizontal className="w-4.5 h-4.5 hover:text-foreground transition-colors cursor-pointer" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
