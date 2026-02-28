"use server";

import { revalidatePath } from "next/cache";
import { api } from "@/lib/api-client";
import { cookies } from "next/headers";
import {
  createBlogSchema,
  updateBlogSchema,
  createCommentSchema,
} from "@/types/validation-schemas";
import { blogService } from "@/services/blog-service";

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const summary = formData.get("summary") as string;

  const validation = createBlogSchema.safeParse({
    title,
    slug,
    content,
    summary,
  });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    await api.post(
      "/blogs",
      { title, slug, content, summary },
      await authHeaders(),
    );
    revalidatePath("/");
    revalidatePath("/my-list");
    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to create blog") };
  }
}

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const summary = formData.get("summary") as string;
  const isPublished = formData.get("isPublished") === "true";

  const validation = updateBlogSchema.safeParse({
    title,
    slug,
    content,
    summary,
    isPublished,
  });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    await api.patch(
      `/blogs/${id}`,
      { title, slug, content, summary, isPublished },
      await authHeaders(),
    );
    revalidatePath("/");
    revalidatePath("/my-list");
    revalidatePath(`/blogs/${id}`);
    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to update blog") };
  }
}

export async function deleteBlog(id: string) {
  try {
    await api.delete(`/blogs/${id}`, await authHeaders());
    revalidatePath("/");
    revalidatePath("/my-list");
    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to delete blog") };
  }
}

export async function toggleLikeAction(id: string, isCurrentlyLiked: boolean) {
  try {
    const headers = await authHeaders();
    if (isCurrentlyLiked) {
      await blogService.unlike(id, headers);
    } else {
      await blogService.like(id, headers);
    }
    revalidatePath("/");
    revalidatePath("/feed");
    revalidatePath("/my-list");
    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to toggle like") };
  }
}

export async function createCommentAction(blogId: string, formData: FormData) {
  const content = formData.get("content") as string;

  const validation = createCommentSchema.safeParse({ content });
  if (!validation.success) {
    return { error: validation.error.issues[0].message };
  }

  try {
    const headers = await authHeaders();
    await blogService.createComment(blogId, content, headers);
    revalidatePath(`/stories/${blogId}`); // Since comments are purely on story pages
    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to create comment") };
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

async function authHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}
