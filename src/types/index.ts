export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "SUPER_ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  authorId: string;
  author?: {
    id: string;
    name: string;
  };
  _count?: {
    comments: number;
    likes: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FeedResponse {
  data: Blog[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  blogId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  userId: string;
  blogId: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
