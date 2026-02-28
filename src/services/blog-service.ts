import { api } from "@/lib/api-client";
import { Blog, Comment, FeedResponse } from "@/types";

export const blogService = {
  async getFeed(page = 0, size = 10): Promise<FeedResponse> {
    try {
      const response = await api.get<FeedResponse>(
        `/public/feed?page=${page}&size=${size}`,
      );
      return response.data;
    } catch (error) {
      console.error("Fetch feed failed:", error);
      return { data: [], page: 0, size: 10, totalItems: 0, totalPages: 0 };
    }
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
      const response = await api.get<Blog>(`/public/blogs/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Fetch blog ${slug} failed:`, error);
      return null;
    }
  },

  async getMyBlogs(options?: {
    headers?: Record<string, string>;
  }): Promise<Blog[]> {
    try {
      const response = await api.get<Blog[]>("/blogs", options);
      return response.data;
    } catch (error) {
      console.error("Fetch my blogs failed:", error);
      return [];
    }
  },

  async getBlogById(
    id: string,
    options?: { headers?: Record<string, string> },
  ): Promise<Blog | null> {
    try {
      const response = await api.get<Blog>(`/blogs/${id}`, options);
      return response.data;
    } catch (error) {
      console.error(`Fetch blog ${id} failed:`, error);
      return null;
    }
  },

  async like(
    id: string,
    options?: { headers?: Record<string, string> },
  ): Promise<void> {
    await api.post(`/blogs/${id}/like`, {}, options);
  },

  async unlike(
    id: string,
    options?: { headers?: Record<string, string> },
  ): Promise<void> {
    await api.delete(`/blogs/${id}/like`, options);
  },

  async getComments(
    id: string,
    page = 0,
    size = 10,
  ): Promise<{ data: Comment[]; totalPages: number }> {
    try {
      const response = await api.get<{ data: Comment[]; totalPages: number }>(
        `/blogs/${id}/comments?page=${page}&size=${size}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Fetch comments for ${id} failed:`, error);
      return { data: [], totalPages: 0 };
    }
  },

  async createComment(
    id: string,
    content: string,
    options?: { headers?: Record<string, string> },
  ): Promise<Comment> {
    const response = await api.post<Comment>(
      `/blogs/${id}/comments`,
      { content },
      options,
    );
    return response.data;
  },
};
