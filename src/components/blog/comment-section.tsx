"use client";

import { useState, useTransition } from "react";
import { User, Comment } from "@/types";
import { createComment, deleteComment } from "@/actions/blog/actions";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";
import { MessageCircle } from "lucide-react";

interface CommentSectionProps {
  blogId: string;
  currentUser?: User;
  initialComments: Comment[];
}

export function CommentSection({
  blogId,
  currentUser,
  initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isPending, startTransition] = useTransition();

  const handleAddComment = async (content: string) => {
    if (!currentUser) return;

    const tempId = `temp-${Date.now()}`;
    const newComment: Comment = {
      id: tempId,
      content,
      createdAt: new Date().toISOString(),
      user: {
        id: currentUser.id,
        name: currentUser.name,
      },
    };

    setComments((prev) => [newComment, ...prev]);

    startTransition(async () => {
      const result = await createComment(blogId, content);
      if (result.success && result.data) {
        setComments((prev) =>
          prev.map((c) => (c.id === tempId ? result.data : c)),
        );
      } else {
        setComments((prev) => prev.filter((c) => c.id !== tempId));
      }
    });
  };

  const handleDeleteComment = async (commentId: string) => {
    const originalComments = [...comments];

    setComments((prev) => prev.filter((c) => c.id !== commentId));

    startTransition(async () => {
      const result = await deleteComment(blogId, commentId);
      if (!result.success) {
        setComments(originalComments);
      }
    });
  };

  return (
    <section className="max-w-3xl py-12 border-t border-foreground/5">
      <div className="flex items-center space-x-3 mb-8">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">
          Comments ({comments.length})
        </h2>
      </div>

      <CommentForm
        onSubmit={handleAddComment}
        isPending={isPending}
        isAuthenticated={!!currentUser}
      />

      <div className="mt-12">
        <CommentList
          comments={comments}
          onDelete={handleDeleteComment}
          currentUserId={currentUser?.id}
        />
      </div>
    </section>
  );
}
