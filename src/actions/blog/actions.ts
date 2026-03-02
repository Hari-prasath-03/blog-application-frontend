"use server";

import { api } from "@/lib/api-client";
import { revalidatePath } from "next/cache";
import { createBlogSchema, updateBlogSchema } from "@/types/validation-schemas";
import { getAuthHeaders } from "@/services/user-service";

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
      await getAuthHeaders(),
    );
    revalidatePath("/my-list");
    revalidatePath("/feed");
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
      await getAuthHeaders(),
    );
    revalidatePath("/my-list");
    revalidatePath("/feed");
    revalidatePath(`/feed/${slug}`);
    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to update blog") };
  }
}

export async function deleteBlog(id: string) {
  try {
    await api.delete(`/blogs/${id}`, await getAuthHeaders());
    revalidatePath("/my-list");
    revalidatePath("/feed");
    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to delete blog") };
  }
}

export async function toggleLike(id: string, isCurrentlyLiked: boolean) {
  try {
    const headers = await getAuthHeaders();
    if (isCurrentlyLiked) await api.delete(`/blogs/${id}/like`, headers);
    else await api.post(`/blogs/${id}/like`, {}, headers);

    revalidatePath("/feed");
    return { success: true };
  } catch (error) {
    return {
      error: handleApiError(
        error,
        `Failed to ${isCurrentlyLiked ? "unlike" : "like"} story`,
      ),
    };
  }
}

export async function createComment(blogId: string, content: string) {
  try {
    const response = await api.post(
      `/blogs/${blogId}/comments`,
      { content },
      await getAuthHeaders(),
    );
    revalidatePath("/feed");
    return { success: true, data: response.data };
  } catch (error) {
    return { error: handleApiError(error, "Failed to post comment") };
  }
}

export async function deleteComment(blogId: string, commentId: string) {
  try {
    await api.delete(
      `/blogs/${blogId}/comments/${commentId}`,
      await getAuthHeaders(),
    );
    revalidatePath("/feed");
    return { success: true };
  } catch (error) {
    return { error: handleApiError(error, "Failed to delete comment") };
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
