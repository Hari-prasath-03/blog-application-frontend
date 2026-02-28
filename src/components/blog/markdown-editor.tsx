"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { Eye, PenLine, Info } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

export function MarkdownEditor({ value, onChange, name }: MarkdownEditorProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-foreground/5 mb-2">
        <div className="flex items-center space-x-6">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={cn(
              "flex items-center space-x-2 py-3 border-b-2 transition-all text-xs font-bold",
              mode === "write"
                ? "border-primary text-foreground"
                : "border-transparent text-foreground/30 hover:text-foreground",
            )}
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={cn(
              "flex items-center space-x-2 py-3 border-b-2 transition-all text-xs font-bold",
              mode === "preview"
                ? "border-primary text-foreground"
                : "border-transparent text-foreground/30 hover:text-foreground",
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono text-foreground/30 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          <span>Markdown Supported</span>
        </div>
      </div>

      <div className="relative min-h-100">
        {mode === "write" ? (
          <textarea
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Tell your story using Markdown..."
            className="w-full min-h-100 text-lg md:text-xl font-serif bg-transparent border-none focus:outline-none placeholder:text-foreground/10 text-foreground/80 leading-relaxed resize-none p-0"
            required
          />
        ) : (
          <div className="prose prose-lg dark:prose-invert max-w-none animate-in fade-in duration-300 pb-20">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {value || "*Nothing to preview yet...*"}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
