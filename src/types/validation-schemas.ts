import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.name || data.email, {
    message: "At least one field must be provided for update",
  });

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .regex(/^[a-zA-Z0-9 ]+$/),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must not contain spaces. Use hyphens instead.",
    ),
  content: z.string().min(10, "Content must be at least 10 characters"),
  summary: z.string().optional(),
});

export const updateBlogSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters").optional(),
    slug: z
      .string()
      .regex(
        /^[a-z0-9-]+$/,
        "Slug must not contain spaces. Use hyphens instead.",
      )
      .optional(),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters")
      .optional(),
    summary: z.string().optional(),
    isPublished: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: "At least one field must be provided for update",
  });

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment cannot exceed 500 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
