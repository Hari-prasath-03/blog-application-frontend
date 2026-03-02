"use client";

import React, { useState, useTransition } from "react";
import { updateProfile } from "@/actions/user/actions";
import { Button } from "@/components/ui/button";
import { Loader2, User } from "lucide-react";
import { FormInput } from "@/components/auth/form-input";
import { User as UserType } from "@/types";

interface ProfileFormProps {
  user: UserType;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateProfile(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

  return (
    <div className="bg-card border border-foreground/5 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex items-center space-x-3 text-primary mb-2">
        <User className="w-5 h-5" />
        <h2 className="text-xl font-sans font-bold text-foreground">
          Personal Information
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Full Name"
            defaultValue={user.name}
            placeholder="John Doe"
            disabled={isPending}
          />
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            defaultValue={user.email}
            placeholder="john@example.com"
            disabled={isPending}
          />
        </div>

        {error && (
          <div className="p-4 text-[13px] font-bold text-destructive bg-destructive/5 border border-destructive/10 rounded-xl animate-in shake-in-1 font-mono">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 text-[13px] font-bold text-accent bg-accent/5 border border-accent/10 rounded-xl animate-in fade-in font-mono">
            Profile updated successfully.
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
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
}
