import * as React from "react";

import { cn } from "../../lib/cn";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "glitch";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "border-2 border-accent text-accent hover:bg-accent hover:text-background hover:shadow-neon",
  secondary:
    "border-2 border-accentSecondary text-accentSecondary hover:bg-accentSecondary hover:text-background hover:shadow-neon-secondary",
  outline:
    "border border-border text-foreground/90 hover:border-accent hover:text-accent hover:shadow-neon-sm",
  ghost: "border border-transparent text-foreground/90 hover:bg-accent/10 hover:text-accent",
  glitch:
    "border-2 border-accent bg-accent text-background hover:brightness-110 hover:shadow-neon-lg"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", type = "button", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "cyber-chamfer-sm cyber-focus-pulse group relative inline-flex min-w-[10ch] items-center justify-center gap-2 whitespace-nowrap text-tech",
          "transition-[box-shadow,transform,filter,background-color,color,border-color] duration-150",
          "active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          variant === "glitch" ? "" : "cyber-border-pulse",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <span className="absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-accent/70" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-accent/70" />
          <span className="absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-accent/70" />
          <span className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-accent/70" />
        </span>
        <span className="relative">{children}</span>
      </button>
    );
  },
);
Button.displayName = "Button";
