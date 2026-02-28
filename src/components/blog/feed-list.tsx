import { BlogCard } from "./blog-card";
import { Blog, User } from "@/types";

interface FeedListProps {
  blogs: Blog[];
  title?: string;
  subtitle?: string;
  isEditable?: boolean;
  currentUser?: User;
}

export function FeedList({
  blogs,
  title,
  subtitle,
  isEditable = false,
  currentUser,
}: FeedListProps) {
  if (blogs.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-foreground/40 font-mono italic">
          No stories found yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {(title || subtitle) && (
        <div className="mb-12 space-y-1">
          {title && (
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary font-mono">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-foreground/40 text-[13px] font-sans">
              {subtitle}
            </p>
          )}
          <div className="h-px w-20 bg-primary/20 mt-4" />
        </div>
      )}

      <div className="flex flex-col">
        {blogs.map((blog, idx) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            priority={idx === 0 && !title}
            isEditable={isEditable}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}
