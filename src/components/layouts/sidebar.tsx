"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss, User, BookOpen, SquarePen, LogOut, LogIn } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth/actions";
import { cn } from "@/lib/utils";
import type { User as UserType } from "@/types";

interface SidebarProps {
  user?: UserType;
}

const navItems = [
  { label: "Feeds", href: "/feed", icon: Rss },
  { label: "My Stories", href: "/my-list", icon: BookOpen },
  { label: "Write", href: "/write", icon: SquarePen },
  { label: "Profile", href: "/profile", icon: User },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 border-r border-foreground/5 bg-background flex flex-col p-6 z-50 transition-all duration-300">
      <div className="mb-12 px-2">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
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
                  {item.label}
                </span>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-in zoom-in duration-300" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-foreground/5 mt-auto">
        {user ? (
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start rounded-xl px-4 py-6 text-foreground/40 hover:text-destructive hover:bg-destructive/5 transition-all group"
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-sm">Sign out</span>
            </Button>
          </form>
        ) : (
          <Link href="/login">
            <Button
              variant="ghost"
              className="w-full justify-start rounded-xl px-4 py-6 text-primary hover:bg-primary/5 transition-all group"
            >
              <LogIn className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
              <span className="font-bold text-sm">Sign in</span>
            </Button>
          </Link>
        )}
      </div>
    </aside>
  );
}
