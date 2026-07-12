import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snow-blue-deep focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-snow-red-deep via-snow-red to-snow-blue-deep text-white shadow-snow-lg hover:shadow-glow hover:-translate-y-0.5",
        secondary:
          "bg-white/80 backdrop-blur text-snow-royal border-2 border-snow-blue shadow-snow hover:bg-white hover:-translate-y-0.5",
        ghost: "text-snow-royal hover:bg-snow-blue/40",
      },
      size: {
        default: "h-12 px-8 text-base",
        lg: "h-14 px-10 text-lg",
        sm: "h-9 px-4 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
