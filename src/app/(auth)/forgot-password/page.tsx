import React from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata = {
  title: "Forgot Password | SecureLog",
  description: "Reset your secure publishing account password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset Password"
      subtitle="We'll send instructions to your email."
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
