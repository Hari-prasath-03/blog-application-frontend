import { getBlogBySlug, getComments } from "@/services/blog-service";
import { getMe } from "@/services/user-service";
import { Comment } from "@/types";
import { notFound } from "next/navigation";
import { StoryDetail } from "@/components/blog/story-detail";
import { CommentSection } from "@/components/blog/comment-section";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const [blog, currentUser] = await Promise.all([getBlogBySlug(slug), getMe()]);

  if (!blog) {
    notFound();
  }

  const comments: Comment[] = await getComments(blog.id);

  return (
    <div className="animate-in fade-in duration-700 pb-24">
      <StoryDetail
        blogId={blog.id}
        title={blog.title}
        content={blog.content}
        authorName={blog.author?.name}
        publishedAt={blog.publishedAt}
        likesCount={blog._count?.likes}
        commentsCount={blog._count?.comments}
        likedByMe={blog.likedByMe}
      />

      <CommentSection
        blogId={blog.id}
        currentUser={currentUser ?? undefined}
        initialComments={comments}
      />
    </div>
  );
}
