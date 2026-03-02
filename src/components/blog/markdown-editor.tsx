import { useRef, useEffect } from "react";
import { Info } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

export function MarkdownEditor({ value, onChange, name }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-foreground/5 mb-2">
        <div className="flex items-center space-x-2 py-3 text-xs font-bold text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="uppercase tracking-wider">Editor</span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono text-foreground/30 uppercase tracking-widest">
          <Info className="w-3 h-3" />
          <span>Markdown Supported</span>
        </div>
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            adjustHeight();
          }}
          placeholder="Tell your story using Markdown..."
          className="w-full text-lg md:text-xl font-sans bg-transparent border-none focus:outline-none placeholder:text-foreground/10 text-foreground/80 leading-relaxed resize-none p-0 overflow-hidden min-h-100"
          required
        />
      </div>
    </div>
  );
}
