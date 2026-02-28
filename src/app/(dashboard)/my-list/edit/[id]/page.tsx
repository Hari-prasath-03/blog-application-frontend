import { blogService } from "@/services/blog-service";
import { BlogForm } from "@/components/blog/blog-form";
import { userService } from "@/services/user-service";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [{ id }, user] = await Promise.all([params, userService.getMe()]);
  const blog = await blogService.getBlogById(id, { headers });

  if (!blog) {
    notFound();
  }

  return (
    <div className="animate-in fade-in duration-700">
      <BlogForm initialData={blog} currentUser={user || undefined} />
    </div>
  );
}
