"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api-client";
import { cookies } from "next/headers";
import {
  updateProfileSchema,
  updatePasswordSchema,
} from "@/types/validation-schemas";
import { getAuthHeaders } from "@/services/user-service";

export async function updateProfile(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const validation = updateProfileSchema.safeParse({ name, email });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    await api.patch("/users/me", { name, email }, await getAuthHeaders());

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to update profile") };
  }
}

export async function updatePassword(formData: FormData) {
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const validation = updatePasswordSchema.safeParse({
    oldPassword,
    newPassword,
    confirmPassword,
  });

  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    await api.patch(
      "/users/me/password",
      { oldPassword, newPassword },
      await getAuthHeaders(),
    );

    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to update password") };
  }
}

export async function deleteAccount() {
  try {
    await api.delete("/users/me", await getAuthHeaders());

    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to delete account") };
  }
}

function handleApiError(error: unknown, fallback: string) {
  const axiosError = error as {
    response?: { data?: { message?: string | string[] } };
  };
  const backendMessage = axiosError.response?.data?.message;

  return Array.isArray(backendMessage)
    ? backendMessage.join(". ")
    : backendMessage || (error instanceof Error ? error.message : fallback);
}
