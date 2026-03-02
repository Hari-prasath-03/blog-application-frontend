import { getMyBlogs } from "@/services/blog-service";
import FeedList from "@/components/blog/feed-list";
import { getMe } from "@/services/user-service";
import { redirect } from "next/navigation";

export default async function MyListPage() {
  const user = await getMe();
  if (!user) redirect("/login");

  const blogs = await getMyBlogs();

  return (
    <div className="space-y-12 pb-20">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
            Your Stories
          </h1>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest leading-relaxed">
            Manage and view all your published ideas in one place.
          </p>
        </div>

        <FeedList blogs={blogs} isEditable={true} currentUser={user} />
      </div>
    </div>
  );
}
