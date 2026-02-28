import React from "react";
import { Logo } from "@/components/layouts/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-344.5 mx-auto min-h-screen flex flex-col bg-background text-foreground font-sans relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      <header className="relative z-10 px-8 py-10 flex justify-center md:justify-start">
        <Logo />
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20 w-full">
        <div className="w-full max-w-105 bg-muted/10 border border-border/40 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>

      <footer className="relative z-10 px-8 py-10 text-center text-[12px] text-muted-foreground font-mono tracking-wider uppercase opacity-50">
        Professional Environment &bull; Verified Security
      </footer>
    </div>
  );
}
