import { blogService } from "@/services/blog-service";
import { MessageCircle, Share2, Bookmark } from "lucide-react";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LikeButton } from "@/components/blog/like-button";
import { CommentsSection } from "@/components/blog/comments-section";
import { userService } from "@/services/user-service";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const [{ slug }, user] = await Promise.all([params, userService.getMe()]);
  const blog = await blogService.getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const dateStr = blog.publishedAt || blog.createdAt;
  const publishedDate = dateStr ? new Date(dateStr) : null;
  const isValidDate = publishedDate && !isNaN(publishedDate.getTime());

  return (
    <div className="animate-in fade-in duration-700">
      <article className="pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="space-y-8 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] tracking-tight">
            {blog.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-foreground/5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary border border-primary/20 uppercase">
                {blog.author?.name?.[0] || "U"}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base">
                  {blog.author?.name || "Unknown Author"}
                </span>
                <span className="text-sm text-foreground/40 font-mono tracking-tighter">
                  {isValidDate
                    ? format(publishedDate, "MMMM d, yyyy")
                    : "Recently published"}{" "}
                  · 5 min read
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-foreground/40">
              <Share2 className="w-5 h-5 hover:text-foreground transition-colors cursor-pointer" />
              <Bookmark className="w-5 h-5 hover:text-foreground transition-colors cursor-pointer" />
            </div>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-20 pt-12 border-t border-foreground/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <LikeButton
                blogId={blog.id}
                initialLikes={blog._count?.likes || 0}
                className="scale-110"
              />
              <div className="flex items-center space-x-2 text-foreground/50 hover:text-foreground transition-colors cursor-pointer">
                <MessageCircle className="w-6 h-6" />
                <span className="text-sm font-mono font-bold">
                  {blog._count?.comments || 0}
                </span>
              </div>
            </div>
          </div>
        </footer>

        <CommentsSection blogId={blog.id} currentUser={user || undefined} />
      </article>
    </div>
  );
}
