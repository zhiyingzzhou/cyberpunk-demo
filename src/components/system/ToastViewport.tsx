import * as React from "react";

import { cn } from "../../lib/cn";
import { useToast, type ToastTone } from "../../state/toast";

function toneClass(tone: ToastTone | undefined) {
  switch (tone) {
    case "ok":
      return "border-accent/50 shadow-neon-sm";
    case "warn":
      return "border-accentSecondary/50 shadow-neon-secondary";
    case "err":
      return "border-destructive/50";
    default:
      return "border-border shadow-neon-sm";
  }
}

export function ToastViewport() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      className="fixed right-5 top-20 z-[70] flex w-[min(420px,calc(100vw-2.5rem))] flex-col gap-3"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "cyber-chamfer border bg-background/80 backdrop-blur",
            "px-4 py-3 transition-[transform,opacity] duration-150",
            toneClass(t.tone),
          )}
          role="status"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-tech text-xs text-foreground/90">{t.title}</div>
              {t.description ? (
                <div className="mt-1 text-sm leading-relaxed text-mutedForeground">
                  {t.description}
                </div>
              ) : null}
            </div>
            <button
              className="text-tech text-xs text-mutedForeground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={() => dismiss(t.id)}
              aria-label="关闭提示"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

