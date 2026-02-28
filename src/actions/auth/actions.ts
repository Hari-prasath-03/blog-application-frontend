"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { api } from "@/lib/api-client";
import { AuthResponse } from "@/types";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
} from "@/types/validation-schemas";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    const { data } = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    await setAuthCookies(data.accessToken, data.refreshToken);
    return { success: true, user: data.user };
  } catch (error) {
    return { error: handleApiError(error, "Login failed") };
  }
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = registerSchema.safeParse({ name, email, password });
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    const { data } = await api.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
    });
    await setAuthCookies(data.accessToken, data.refreshToken);
    return { success: true, user: data.user };
  } catch (error) {
    return { error: handleApiError(error, "Registration failed") };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  try {
    if (refreshToken) {
      await api.post(
        "/auth/logout",
        {},
        {
          headers: { Cookie: `refresh_token=${refreshToken}` },
        },
      );
    }
  } catch (error) {
    console.error("Backend logout failed:", error);
  } finally {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    redirect("/login");
  }
}

export async function forgotPassword(formData: FormData) {
  const email = formData.get("email") as string;

  const result = forgotPasswordSchema.safeParse({ email });
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message:
        "If an account exists with this email, you will receive reset instructions shortly.",
    };
  } catch (error) {
    return { error: handleApiError(error, "Request failed") };
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

async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}
