import * as React from "react";

import { cn } from "../../lib/cn";

type CardVariant = "default" | "terminal" | "holographic";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  hoverEffect?: boolean;
};

function TerminalHeader() {
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 flex h-10 items-center gap-2 border-b border-border bg-background/40 px-4">
      <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-[rgb(255,214,10)]/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
      <span className="ml-2 text-xs text-mutedForeground">terminal://session</span>
    </div>
  );
}

export function Card({
  className,
  variant = "default",
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  const base =
    "group relative overflow-hidden border border-border bg-card text-foreground cyber-chamfer";

  const interactive = hoverEffect
    ? "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-neon-sm"
    : "";

  const corners = (
    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
      <div className="absolute left-3 top-3 h-3 w-3 border-l border-t border-accent/60" />
      <div className="absolute right-3 top-3 h-3 w-3 border-r border-t border-accent/60" />
      <div className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-accent/60" />
      <div className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-accent/60" />
    </div>
  );

  if (variant === "terminal") {
    return (
      <div
        className={cn(
          base,
          "bg-background cyber-border-pulse",
          interactive,
          className,
        )}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 cyber-noise" />
        {corners}
        <TerminalHeader />
        <div className="relative px-6 pb-6 pt-14">{children}</div>
      </div>
    );
  }

  if (variant === "holographic") {
    return (
      <div
        className={cn(
          base,
          interactive,
          "bg-muted/30 backdrop-blur",
          "border-accent/30 shadow-neon",
          className,
        )}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 cyber-noise" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-3 top-3 h-3 w-3 border-l border-t border-accent/60" />
          <div className="absolute right-3 top-3 h-3 w-3 border-r border-t border-accent/60" />
          <div className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-accent/60" />
          <div className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-accent/60" />
        </div>
        <div className="relative p-6">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        base,
        "cyber-border-pulse",
        interactive,
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 cyber-noise" />
      {corners}
      <div className="relative p-6">{children}</div>
    </div>
  );
}
