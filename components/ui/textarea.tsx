import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[110px] w-full rounded-2xl border-2 border-snow-blue/70 bg-white/70 px-4 py-3 text-base text-snow-ink placeholder:text-snow-ink/40 backdrop-blur transition-colors focus-visible:border-snow-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snow-blush/50 disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
