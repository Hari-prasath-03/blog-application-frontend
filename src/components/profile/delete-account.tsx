"use client";

import React, { useState, useTransition } from "react";
import { deleteAccount } from "@/actions/user/actions";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";

export function DeleteAccount() {
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteAccount();
      if (result.error) {
        setError(result.error);
        setShowConfirm(false);
      } else {
        // Redirect is handled in the server action or will happen via middleware/layout refresh
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="bg-destructive/5 border border-destructive/10 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center space-x-3 text-destructive mb-2">
        <AlertTriangle className="w-5 h-5" />
        <h2 className="text-xl font-sans font-bold">Danger Zone</h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-foreground/70 font-mono leading-relaxed max-w-2xl">
          Once you delete your account, there is no going back. Please be
          certain. All your blogs, comments, and data will be permanently
          removed.
        </p>

        {error && (
          <div className="p-4 text-[13px] font-bold text-destructive bg-destructive/10 border border-destructive/20 rounded-xl animate-in shake-in-1 font-mono">
            {error}
          </div>
        )}

        {!showConfirm ? (
          <Button
            variant="destructive"
            className="h-10 rounded-xl font-bold text-sm transition-all active:scale-[0.98] px-8"
            onClick={() => setShowConfirm(true)}
          >
            Delete Account
          </Button>
        ) : (
          <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-left-2">
            <Button
              variant="destructive"
              className="h-10 rounded-xl font-bold text-sm transition-all active:scale-[0.98] px-8"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Confirm Delete"
              )}
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-xl font-bold text-sm transition-all active:scale-[0.98] px-8 border-foreground/10"
              onClick={() => setShowConfirm(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
