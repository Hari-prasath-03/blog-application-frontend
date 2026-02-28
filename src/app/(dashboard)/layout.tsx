import React from "react";
import { Sidebar } from "@/components/layouts/sidebar";
import { Navbar } from "@/components/layouts/navbar";
import { userService } from "@/services/user-service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await userService.getMe();

  return (
    <div className="flex bg-background text-foreground min-h-screen">
      <Sidebar user={user || undefined} />
      <div className="flex-1 flex flex-col min-w-0 ml-72">
        <Navbar user={user || undefined} />
        <main className="flex-1 p-8 md:p-12 mt-16 pt-10 animate-in fade-in duration-700 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
