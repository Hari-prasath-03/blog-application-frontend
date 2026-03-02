import Feed from "@/components/home/feed";
import { getFeed } from "@/services/blog-service";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 0;

  const feed = await getFeed(page, 3);

  return (
    <div className="space-y-12 pb-20">
      <Feed
        blogs={feed.data}
        currentPage={feed.page}
        totalPages={feed.totalPages}
      />
    </div>
  );
}
