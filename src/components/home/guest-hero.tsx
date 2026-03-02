import Link from "next/link";
import { Button } from "@/components/ui/button";
import HomepageSvg from "@/components/layouts/homepage-svg";

export function GuestHero() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-7xl md:text-8xl lg:text-[110px] font-bold font-serif leading-[0.9] tracking-tight text-foreground">
          Deep <br /> thoughts & <br /> secure ideas.
        </h1>
        <p className="text-xl md:text-2xl text-foreground font-mono max-w-md opacity-80">
          A professional and secure space to read, write, and grow your ideas.
        </p>
        <Link href="/feed">
          <Button
            size="lg"
            className="px-8 py-4 rounded-full text-lg bg-primary text-primary-foreground hover:opacity-90 transition-all active:scale-95 shadow-xl"
          >
            Start reading
          </Button>
        </Link>
      </div>
      <div className="hidden md:flex justify-end items-center relative overflow-visible">
        <HomepageSvg />
      </div>
    </div>
  );
}
