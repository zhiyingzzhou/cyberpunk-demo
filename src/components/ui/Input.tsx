import * as React from "react";

import { cn } from "../../lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix = ">", ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-label text-sm text-accent">
          {prefix}
        </span>
        <input
          ref={ref}
          className={cn(
            "cyber-chamfer-sm h-12 w-full border border-border bg-input pl-9 pr-4 text-sm text-accent",
            "placeholder:text-mutedForeground placeholder:opacity-80",
            "transition-[box-shadow,border-color] duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "focus:border-accent focus:shadow-neon-sm",
          )}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

