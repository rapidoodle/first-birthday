import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-12 w-full rounded-2xl border-2 border-fairy-lavender/70 bg-white/70 px-4 py-2 text-base text-fairy-ink placeholder:text-fairy-ink/40 backdrop-blur transition-colors focus-visible:border-fairy-pink-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fairy-pink/50 disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
