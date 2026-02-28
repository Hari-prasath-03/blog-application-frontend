"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export function GuestHeader() {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-foreground/5 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Logo />

        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/login"
            className="hidden sm:block hover:text-foreground/70 transition-colors font-bold"
          >
            Sign in
          </Link>
          <Link href="/register">
            <Button className="rounded-xl px-5 h-10 bg-primary text-primary-foreground hover:opacity-90 font-bold transition-all active:scale-95 text-sm shadow-sm ring-1 ring-primary/20">
              Get started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
