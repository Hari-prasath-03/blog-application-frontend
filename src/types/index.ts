export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "SUPER_ADMIN";
  createdAt: string;
  updatedAt: string;
}

/**
 * Base identity and presentation fields common across all blog types.
 */
export interface BaseBlog {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  publishedAt: string | null;
  author: {
    id: string;
    name: string;
  };
}

/**
 * Social metrics and status fields.
 */
export interface SocialFields {
  _count: {
    comments: number;
    likes: number;
  };
  likedByMe: boolean;
}

export interface ManagementFields {
  authorId: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type MyBlog = Blog;
export type Blog = BaseBlog &
  ManagementFields &
  Partial<SocialFields> & { content: string };
export type FeedBlog = BaseBlog & SocialFields;
export type DetailedBlog = Blog & SocialFields;
export type DetailedFeedBlog = BaseBlog & SocialFields & { content: string };

export interface FeedResponse {
  data: FeedBlog[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
