import React from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create Profile"
      subtitle="Start your secure publishing journey."
    >
      <RegisterForm />

      <div className="pt-4 text-center font-mono border-t border-border/40">
        <p className="text-[14px] text-muted-foreground font-mono">
          Already a professional member? {"  "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline decoration-2 underline-offset-4 decoration-primary/30"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}
