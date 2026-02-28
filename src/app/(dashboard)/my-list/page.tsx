import { blogService } from "@/services/blog-service";
import { FeedList } from "@/components/blog/feed-list";
import { userService } from "@/services/user-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MyListPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [blogs, user] = await Promise.all([
    blogService.getMyBlogs({ headers }),
    userService.getMe(),
  ]);

  if (!user) {
    redirect("/login");
  }

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

        <section>
          <FeedList
            blogs={blogs}
            isEditable={true}
            currentUser={user || undefined}
          />
        </section>
      </div>
    </div>
  );
}
