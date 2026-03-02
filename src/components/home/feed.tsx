import Link from "next/link";
import { FeedBlog } from "@/types";
import FeedList from "@/components/blog/feed-list";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedProps {
  blogs: FeedBlog[];
  currentPage: number;
  totalPages: number;
}

export default function Feed({ blogs, currentPage, totalPages }: FeedProps) {
  return (
    <div className="w-full">
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <FeedList blogs={blogs} />

        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4 pt-12 border-t border-foreground/5 mt-12">
            <Link
              href={`/feed?page=${Math.max(0, currentPage - 1)}`}
              className={
                currentPage === 0 ? "pointer-events-none opacity-30" : ""
              }
            >
              <Button
                variant="ghost"
                className="rounded-xl flex items-center space-x-2 font-bold text-sm h-11 px-6"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
            </Link>

            <div className="text-sm font-mono text-foreground/40 font-bold">
              Page {currentPage + 1} of {totalPages}
            </div>

            <Link
              href={`/feed?page=${Math.min(totalPages - 1, currentPage + 1)}`}
              className={
                currentPage === totalPages - 1
                  ? "pointer-events-none opacity-30"
                  : ""
              }
            >
              <Button
                variant="ghost"
                className="rounded-xl flex items-center space-x-2 font-bold text-sm h-11 px-6"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
