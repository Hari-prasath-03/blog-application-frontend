import { BlogForm } from "@/components/blog/blog-form";
import { getMe } from "@/services/user-service";

export default async function WritePage() {
  const user = await getMe();

  return (
    <div className="pb-20">
      <BlogForm currentUser={user || undefined} />
    </div>
  );
}
