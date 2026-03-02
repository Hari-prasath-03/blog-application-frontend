import { BlogForm } from "@/components/blog/blog-form";
import { getBlogById } from "@/services/blog-service";
import { redirect } from "next/navigation";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) return redirect("/my-list");

  return (
    <>
      <div className="space-y-2 mb-5">
        <h1 className="text-4xl font-serif font-bold tracking-tight">
          Edit Story
        </h1>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest leading-relaxed">
          Refine your ideas and share them with the world.
        </p>
      </div>

      <BlogForm initialData={blog} />
    </>
  );
}
