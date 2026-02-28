"use client";

import React, { useState, useTransition } from "react";
import { register } from "@/actions/auth/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";
import { FormInput } from "./form-input";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await register(formData);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/");
        router.refresh();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <FormInput
          id="name"
          name="name"
          type="text"
          label="Full Name"
          placeholder="John Doe"
          required
          disabled={isPending}
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="name@example.com"
          required
          disabled={isPending}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Secret Password"
          placeholder="••••••••"
          required
          disabled={isPending}
        />
      </div>

      {error && (
        <div className="p-4 text-[13px] font-bold text-destructive bg-destructive/5 border border-destructive/10 rounded-xl animate-in shake-in-1 font-mono">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-11 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-bold text-sm transition-all active:scale-[0.98] font-mono shadow-sm"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <span className="flex items-center justify-center font-bold">
            Create Account <UserPlus className="ml-2 w-4 h-4" />
          </span>
        )}
      </Button>
    </form>
  );
}
