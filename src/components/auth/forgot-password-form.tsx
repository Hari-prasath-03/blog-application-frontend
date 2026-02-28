"use client";

import React, { useState, useTransition } from "react";
import { forgotPassword } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { FormInput } from "./form-input";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await forgotPassword(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.message || "Success");
      }
    });
  };

  if (success) {
    return (
      <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-sans font-bold">Check your inbox</h3>
          <p className="text-sm text-muted-foreground font-mono leading-relaxed">
            {success}
          </p>
        </div>
        <Link href="/login" className="block">
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl font-mono text-sm"
          >
            Back to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="name@example.com"
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
        className="w-full h-11 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-bold text-sm transition-all active:scale-[0.98] group font-mono shadow-sm"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <span className="flex items-center justify-center">
            Send Reset Link{" "}
            <Mail className="ml-2 w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        )}
      </Button>

      <div className="text-center">
        <Link
          href="/login"
          className="text-[13px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}
