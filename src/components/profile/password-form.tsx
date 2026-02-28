"use client";

import React, { useState, useTransition } from "react";
import { updatePassword } from "@/actions/user/actions";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";
import { FormInput } from "@/components/auth/form-input";

export function PasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updatePassword(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

  return (
    <div className="bg-card border border-foreground/5 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex items-center space-x-3 text-primary mb-2">
        <Lock className="w-5 h-5" />
        <h2 className="text-xl font-sans font-bold text-foreground">
          Update Password
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <FormInput
            id="oldPassword"
            name="oldPassword"
            type="password"
            label="Current Password"
            placeholder="••••••••"
            required
            disabled={isPending}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              id="newPassword"
              name="newPassword"
              type="password"
              label="New Password"
              placeholder="••••••••"
              required
              disabled={isPending}
            />
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              placeholder="••••••••"
              required
              disabled={isPending}
            />
          </div>
        </div>

        {error && (
          <div className="p-4 text-[13px] font-bold text-destructive bg-destructive/5 border border-destructive/10 rounded-xl animate-in shake-in-1 font-mono">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 text-[13px] font-bold text-accent bg-accent/5 border border-accent/10 rounded-xl animate-in fade-in font-mono">
            Password updated successfully.
          </div>
        )}

        <Button
          type="submit"
          className="h-10 rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-bold text-sm transition-all active:scale-[0.98] px-8"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  );
}
