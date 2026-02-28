import React from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Continue to your secure workspace."
    >
      <LoginForm />

      <div className="pt-4 text-center font-mono border-t border-border/40">
        <p className="text-[14px] text-muted-foreground font-mono">
          Don&apos;t have an account yet? {"  "}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline decoration-2 underline-offset-4 decoration-primary/30"
          >
            Create Profile
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
