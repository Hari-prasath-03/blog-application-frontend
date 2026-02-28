import { BlogForm } from "@/components/blog/blog-form";
import { userService } from "@/services/user-service";

export default async function WritePage() {
  const user = await userService.getMe();

  return (
    <div className="pb-20">
      <BlogForm currentUser={user || undefined} />
    </div>
  );
}
