import { api } from "@/lib/api-client";
import { Blog, Comment, DetailedFeedBlog, FeedResponse, MyBlog } from "@/types";
import { getAuthHeaders } from "./user-service";

export async function getFeed(page = 0, size = 10): Promise<FeedResponse> {
  try {
    const response = await api.get<FeedResponse>(
      `/public/feed?page=${page}&size=${size}`,
      await getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error("Fetch feed failed:", error);
    return { data: [], page: 0, size: 10, totalItems: 0, totalPages: 0 };
  }
}

export async function getBlogBySlug(
  slug: string,
): Promise<DetailedFeedBlog | null> {
  try {
    const response = await api.get<DetailedFeedBlog>(
      `/public/blogs/${slug}`,
      await getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error(`Fetch blog ${slug} failed:`, error);
    return null;
  }
}

export async function getMyBlogs(): Promise<MyBlog[]> {
  try {
    const response = await api.get<MyBlog[]>("/blogs", await getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Fetch my blogs failed:", error);
    return [];
  }
}

export async function getBlogById(id: string): Promise<MyBlog | null> {
  try {
    const response = await api.get<Blog>(
      `/blogs/${id}`,
      await getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error(`Fetch blog ${id} failed:`, error);
    return null;
  }
}

export async function getComments(blogId: string): Promise<Comment[]> {
  try {
    const response = await api.get<Comment[]>(
      `/blogs/${blogId}/comments`,
      await getAuthHeaders(),
    );
    return response.data;
  } catch (error) {
    console.error(`Fetch comments for ${blogId} failed:`, error);
    return [];
  }
}
