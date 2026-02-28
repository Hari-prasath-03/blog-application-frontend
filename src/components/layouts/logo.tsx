import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center space-x-2 group", className)}
    >
      <span className="text-2xl font-bold font-serif tracking-tight text-foreground group-hover:text-primary transition-colors">
        SecureLog
      </span>
    </Link>
  );
}
