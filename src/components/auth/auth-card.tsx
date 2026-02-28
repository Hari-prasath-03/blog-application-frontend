import React from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 delay-150">
      <div className="space-y-1.5">
        <h2 className="text-3xl font-sans font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-[15px] text-muted-foreground font-mono opacity-80">
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
}
