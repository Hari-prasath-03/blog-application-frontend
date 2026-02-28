import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GuestHero } from "@/components/home/guest-hero";
import { GuestHeader } from "@/components/layouts/guest-header";

export default async function RootPage() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("access_token");

  if (isLoggedIn) {
    redirect("/feed");
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <GuestHeader />
      <main className="pt-24 pb-20">
        <GuestHero />
      </main>
    </div>
  );
}
