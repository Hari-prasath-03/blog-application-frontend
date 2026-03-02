import { BlogCard } from "./blog-card";
import { FeedBlog, Blog, User } from "@/types";

interface FeedListProps {
  blogs: FeedBlog[] | Blog[];
  isEditable?: boolean;
  currentUser?: User;
}

export default function FeedList({
  blogs,
  isEditable = false,
  currentUser,
}: FeedListProps) {
  if (blogs.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-foreground/40 font-mono italic">No stories found.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          isEditable={isEditable}
          currentUser={currentUser}
        />
      ))}
    </section>
  );
}
