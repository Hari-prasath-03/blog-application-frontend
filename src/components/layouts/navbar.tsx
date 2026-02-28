"use client";

import React from "react";
import { User as UserIcon, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth/actions";
import { User } from "@/types";
import Link from "next/link";

interface NavbarProps {
  user?: User;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="h-16 fixed top-0 right-0 left-72 bg-background/80 backdrop-blur-md border-b border-foreground/5 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest font-bold">
          Dashboard
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-foreground/80 leading-tight">
              {user?.name || "Guest"}
            </span>
            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-tighter">
              {user ? "Member" : "Visitor"}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <UserIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="h-4 w-px bg-foreground/10" />

        {user ? (
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="rounded-xl h-9 px-3 text-foreground/40 hover:text-destructive hover:bg-destructive/5 transition-all font-bold text-xs group"
            >
              <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
              Sign out
            </Button>
          </form>
        ) : (
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-xl h-9 px-3 text-primary hover:bg-primary/5 transition-all font-bold text-xs group"
            >
              <LogIn className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
              Log in
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
