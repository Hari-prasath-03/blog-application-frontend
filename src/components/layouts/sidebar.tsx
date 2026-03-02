"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss, User, BookOpen, SquarePen } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Feeds", href: "/feed", icon: Rss },
  { label: "My Stories", href: "/my-list", icon: BookOpen },
  { label: "Write", href: "/write", icon: SquarePen },
  { label: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const path = usePathname().split("/").splice(1);

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 border-r border-foreground/5 bg-background flex flex-col p-6 z-50 transition-all duration-300">
      <div className="mb-12 px-2">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = path.includes(href.substring(1));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary/5 text-primary"
                  : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground",
              )}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                    isActive
                      ? "text-primary"
                      : "text-foreground/60 group-hover:text-foreground",
                  )}
                />
                <span
                  className={cn(
                    "font-bold text-sm tracking-wide",
                    isActive ? "opacity-100" : "opacity-90",
                  )}
                >
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
