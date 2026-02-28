import { blogService } from "@/services/blog-service";
import { MemberFeed } from "@/components/home/member-feed";
import { userService } from "@/services/user-service";
import { redirect } from "next/navigation";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 0;

  const user = await userService.getMe();
  if (!user) {
    redirect("/login");
  }

  const feed = await blogService.getFeed(page, 10);

  return (
    <div className="animate-in fade-in duration-700">
      <MemberFeed
        blogs={feed.data}
        currentPage={feed.page}
        totalPages={feed.totalPages}
      />
    </div>
  );
}
