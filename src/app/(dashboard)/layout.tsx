import React from "react";
import { Sidebar } from "@/components/layouts/sidebar";
import { Navbar } from "@/components/layouts/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-background text-foreground min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-72">
        <Navbar />
        <main className="flex-1 p-8 md:p-12 mt-16 pt-10 animate-in fade-in duration-700 overflow-y-auto">
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
