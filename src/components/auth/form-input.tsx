import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  rightElement?: React.ReactNode;
}

export function FormInput({
  label,
  id,
  rightElement,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between ml-1 font-mono">
        <Label
          htmlFor={id}
          className="text-[13px] font-bold uppercase tracking-wider text-muted-foreground"
        >
          {label}
        </Label>
        {rightElement}
      </div>
      <Input
        id={id}
        {...props}
        className={`h-11 px-4 rounded-xl bg-background border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-mono text-sm ${className}`}
      />
    </div>
  );
}
