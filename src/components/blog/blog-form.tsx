"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBlog, updateBlog } from "@/actions/blog/actions";
import { Loader2, ArrowLeft, Send, Eye, PenLine } from "lucide-react";
import { MarkdownEditor } from "./markdown-editor";
import { Button } from "@/components/ui/button";
import { Blog, User } from "@/types";
import { StoryDetail } from "./story-detail";

interface BlogFormProps {
  initialData?: Blog;
  currentUser?: User;
}

export function BlogForm({ initialData, currentUser }: BlogFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState(initialData?.content || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [isPreview, setIsPreview] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = initialData
        ? await updateBlog(initialData.id, formData)
        : await createBlog(formData);

      if (result.error) {
        setError(result.error);
      } else {
        router.push("/my-list");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="py-12">
      <header className="flex items-center justify-between mb-12">
        <Link
          href="/my-list"
          className="flex items-center space-x-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Stories</span>
        </Link>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/5 hover:border-primary/20 transition-all cursor-pointer group/publish">
            <input
              type="checkbox"
              name="isPublished"
              id="isPublished"
              value="true"
              defaultChecked={initialData?.isPublished ?? false}
              className="w-4 h-4 rounded-sm border-foreground/20 bg-background text-primary focus:ring-offset-0 focus:ring-primary/20 cursor-pointer"
            />
            <label
              htmlFor="isPublished"
              className="text-[11px] font-bold text-foreground/50 group-hover/publish:text-foreground/80 cursor-pointer select-none uppercase tracking-wider"
            >
              Published
            </label>
          </div>

          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center space-x-2 px-4 py-2 rounded-full border border-foreground/10 text-xs font-bold hover:bg-foreground/5 transition-all text-muted-foreground hover:text-foreground"
          >
            {isPreview ? (
              <>
                <PenLine className="w-3.5 h-3.5" />
                <span>Edit Story</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Full Preview</span>
              </>
            )}
          </button>
          <span className="text-[11px] font-mono text-foreground/30 uppercase tracking-widest hidden sm:block">
            {initialData ? "Editing Story" : "Drafting Story"}
          </span>
        </div>
      </header>

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
        {isPreview ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <StoryDetail
              blogId={initialData?.id}
              title={title}
              content={content}
              authorName={
                initialData?.author?.name || currentUser?.name || "Your Name"
              }
              publishedAt={initialData?.publishedAt || new Date()}
              likesCount={initialData?._count?.likes ?? 0}
              commentsCount={initialData?._count?.comments ?? 0}
              likedByMe={initialData?.likedByMe ?? false}
            />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <input
                autoFocus
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full text-4xl md:text-5xl lg:text-6xl font-serif font-bold bg-transparent border-none focus:outline-none placeholder:text-foreground/10 text-foreground"
                required
              />
              <div className="h-px w-full bg-foreground/5" />

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/30 ml-1">
                    Url Slug
                  </label>
                  <input
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="my-great-story"
                    className="w-full text-sm font-mono bg-transparent border-b border-foreground/10 py-2 focus:outline-none focus:border-primary/50 text-foreground placeholder:text-foreground/20 transition-colors"
                    required
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/30 ml-1">
                    Summary (Optional)
                  </label>
                  <input
                    name="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="A brief overview..."
                    className="w-full text-sm bg-transparent border-b border-foreground/10 py-2 focus:outline-none focus:border-primary/50 text-foreground placeholder:text-foreground/20 transition-colors"
                  />
                </div>
              </div>
            </div>

            <MarkdownEditor
              name="content"
              value={content}
              onChange={setContent}
            />
          </>
        )}

        {error && (
          <div className="p-4 text-[13px] font-bold text-destructive bg-destructive/5 border border-destructive/10 rounded-xl font-mono animate-in shake-in-1">
            {error}
          </div>
        )}

        <div className="pt-8 flex items-center justify-end border-t border-foreground/5">
          <Button
            type="submit"
            size="lg"
            className="rounded-full px-8 h-12 bg-primary text-primary-foreground font-bold text-base hover:opacity-90 transition-all active:scale-95 shadow-xl flex items-center space-x-2"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{initialData ? "Update Story" : "Publish Story"}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
